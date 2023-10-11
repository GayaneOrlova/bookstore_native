import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";

import { useForm } from "react-hook-form";

export const yupValidation = () => {
const schema = yup.object().shape({
  body: yup.string().required('Comment is required'),
});

const { control, handleSubmit, formState: { errors } } = useForm({
  resolver: yupResolver(schema),
});}



export const createYupSchema = (schema: any, config: any) => {
	const {id, validationType, validations = []} = config;

	if (!(yup as any)[validationType]) {
		return schema;
	}

	let validator = (yup as any)[validationType]();

	validations.forEach((validation: any) => {
		const {params, type} = validation;
		if (!validator[type]) {
			return;
		}
		validator = validator[type](...params);
	});

	schema[id] = validator;
	return schema;
}

type FieldsType = {
  [key: string]: yup.AnySchema;
};

const createValidationSchema = (fields: FieldsType) => {
  return yup.object().shape(fields);
};


const validationSchema = createValidationSchema({
      name: yup.string().trim().required('Requiered field'),
      email: yup.string().email('Must be email')
    })