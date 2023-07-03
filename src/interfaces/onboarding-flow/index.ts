import { FeedbackInterface } from 'interfaces/feedback';
import { TemplateInterface } from 'interfaces/template';
import { PlatformInterface } from 'interfaces/platform';
import { GetQueryInterface } from 'interfaces';

export interface OnboardingFlowInterface {
  id?: string;
  name: string;
  template_id?: string;
  platform_id?: string;
  created_at?: any;
  updated_at?: any;
  feedback?: FeedbackInterface[];
  template?: TemplateInterface;
  platform?: PlatformInterface;
  _count?: {
    feedback?: number;
  };
}

export interface OnboardingFlowGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  template_id?: string;
  platform_id?: string;
}
