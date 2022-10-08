import React, {useState, useEffect} from "react";
import Notify from "../useNotification";
import {useDispatch, useSelector} from "react-redux";
import {createNewUser} from "../../RTK/slices/authSlice";
import {useNavigate} from "react-router-dom";

export const RegisterHook = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    image: "",
  });

  const {loading, registeredUser, error} = useSelector(
    (state) => state.authSlice.registerUser
  );
  const handleChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value});
  };
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setValues({...values, [e.target.name]: e.target.files[0]});
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createNewUser(values));
  };

  useEffect(() => {
    if (loading === false) {
      console.log(registeredUser);
      if (registeredUser !== []) {
        if (registeredUser.token) {
          localStorage.setItem("token", registeredUser.token);
          Notify("Successfully Registered", "success");
          setTimeout(() => {
            window.location.href = "/login";
          }, 1500);
        }
      }
      if (error) {
        Notify(error.errors[0].msg, "error");
      }
    }
  }, [loading, registeredUser, error, navigate]);
  return [values, handleChange, handleSubmit, handleImageChange, loading];
};
