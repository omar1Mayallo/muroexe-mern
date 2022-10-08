const registerInputs = (values) => {
  const inputs = [
    {
      name: "name",
      type: "text",
      placeholder: "Name",
      errorMessage:
        "Name should be 3-30 characters and shouldn't include any special character!",
      pattern: "^[A-Za-z0-9]{3,30}$",
      required: true,
    },
    {
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email address!",
      required: true,
    },
    {
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage: "Too Short Password, it should be minimum 6 characters",
      pattern: `^.{6,}$`,
      required: true,
    },
    {
      name: "passwordConfirmation",
      type: "password",
      placeholder: "Confirm Password",
      errorMessage: "Passwords don't match!",
      pattern: values.password,
      required: true,
    },
  ];
  return inputs;
};

export default registerInputs;
