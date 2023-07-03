import * as yup from 'yup';

export const templateValidationSchema = yup.object().shape({
  name: yup.string().required(),
  content: yup.string().required(),
});
