import { OnboardingFlowInterface } from 'interfaces/onboarding-flow';
import { GetQueryInterface } from 'interfaces';

export interface TemplateInterface {
  id?: string;
  name: string;
  content: string;
  created_at?: any;
  updated_at?: any;
  onboarding_flow?: OnboardingFlowInterface[];

  _count?: {
    onboarding_flow?: number;
  };
}

export interface TemplateGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  content?: string;
}
