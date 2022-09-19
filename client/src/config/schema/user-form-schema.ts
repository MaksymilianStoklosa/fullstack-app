import * as yup from "yup";
const ERROR_MESSAGE = "This field is required";

yup.setLocale({
  mixed: {
    required: ERROR_MESSAGE,
    notType: ERROR_MESSAGE,
  },
  string: {
    email: ERROR_MESSAGE,
  },
});

export const createUserSchema = yup
  .object()
  .shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email().required(),
    dateOfBirth: yup.date().required(),
  })
  .required();
