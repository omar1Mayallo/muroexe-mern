const inputs = [
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
];
export default inputs;
