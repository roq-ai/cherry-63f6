import * as yup from 'yup';

export const feedbackValidationSchema = yup.object().shape({
  content: yup.string().required(),
  user_id: yup.string().nullable(),
  onboarding_flow_id: yup.string().nullable(),
});
