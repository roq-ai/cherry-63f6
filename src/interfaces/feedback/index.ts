import { UserInterface } from 'interfaces/user';
import { OnboardingFlowInterface } from 'interfaces/onboarding-flow';
import { GetQueryInterface } from 'interfaces';

export interface FeedbackInterface {
  id?: string;
  content: string;
  user_id?: string;
  onboarding_flow_id?: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  onboarding_flow?: OnboardingFlowInterface;
  _count?: {};
}

export interface FeedbackGetQueryInterface extends GetQueryInterface {
  id?: string;
  content?: string;
  user_id?: string;
  onboarding_flow_id?: string;
}
