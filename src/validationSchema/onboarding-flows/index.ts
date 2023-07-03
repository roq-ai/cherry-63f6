import * as yup from 'yup';

export const onboardingFlowValidationSchema = yup.object().shape({
  name: yup.string().required(),
  template_id: yup.string().nullable(),
  platform_id: yup.string().nullable(),
});
