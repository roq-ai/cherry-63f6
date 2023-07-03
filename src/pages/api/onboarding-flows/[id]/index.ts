import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { onboardingFlowValidationSchema } from 'validationSchema/onboarding-flows';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.onboarding_flow
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getOnboardingFlowById();
    case 'PUT':
      return updateOnboardingFlowById();
    case 'DELETE':
      return deleteOnboardingFlowById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getOnboardingFlowById() {
    const data = await prisma.onboarding_flow.findFirst(convertQueryToPrismaUtil(req.query, 'onboarding_flow'));
    return res.status(200).json(data);
  }

  async function updateOnboardingFlowById() {
    await onboardingFlowValidationSchema.validate(req.body);
    const data = await prisma.onboarding_flow.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteOnboardingFlowById() {
    const data = await prisma.onboarding_flow.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
