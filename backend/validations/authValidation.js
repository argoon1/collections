const userSchema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().required(),
});

export { userSchema };
