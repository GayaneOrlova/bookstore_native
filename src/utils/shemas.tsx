import * as yup from 'yup';

export const bodySchema = yup.object().shape({
  body: yup.string().required('Comment is required'),
});

export const loginSchema = yup.object().shape({
  email: yup.string().email('Please enter a valid email').required('Email is required'),
  password: yup.string().required('Password is required'),
});

export const signupSchema = yup.object().shape({
  email: yup.string().email('Please enter a valid email').required('Email is required'),
  password: yup.string().required('Password is required'),
  confirm_password: yup.string().oneOf([yup.ref('password')], 'Passwords must match').required('Confirm password is required'),
});

export const changePasswordSchema = yup.object().shape({
  password: yup.string().required('Password is required'),
  new_password: yup.string().required('Password is required'),
  confirm_password: yup.string().oneOf([yup.ref('new_password')], 'Passwords must match').required('Confirm password is required'),
});

export const changeUserInfoSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  email: yup.string().required('Email is required'),
});