import * as yup from 'yup';

export const bodySchema = yup.object().shape({
  body: yup.string().required('Comment is required'),
});