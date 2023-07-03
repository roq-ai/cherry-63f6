import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { templateValidationSchema } from 'validationSchema/templates';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getTemplates();
    case 'POST':
      return createTemplate();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getTemplates() {
    const data = await prisma.template
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'template'));
    return res.status(200).json(data);
  }

  async function createTemplate() {
    await templateValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.onboarding_flow?.length > 0) {
      const create_onboarding_flow = body.onboarding_flow;
      body.onboarding_flow = {
        create: create_onboarding_flow,
      };
    } else {
      delete body.onboarding_flow;
    }
    const data = await prisma.template.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
