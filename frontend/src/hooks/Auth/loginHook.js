import React, {useState, useEffect} from "react";
import Notify from "../useNotification";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../../RTK/slices/authSlice";
import {useNavigate} from "react-router-dom";

export const LoginHook = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(values));
  };

  const {loading, loggedUser, error} = useSelector(
    (state) => state.authSlice.loginUser
  );

  useEffect(() => {
    if (loading === false) {
      if (loggedUser !== []) {
        if (loggedUser.token) {
          localStorage.setItem("token", loggedUser.token);
          localStorage.setItem("user", JSON.stringify(loggedUser.data.user));
          Notify("Successfully logged in", "success");
          setTimeout(() => {
            window.location.href = "/";
          }, 1500);
        }
      }
      if (error) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        Notify(error, "error");
      }
    }
  }, [loggedUser, loading, error]);

  return [values, handleChange, handleSubmit, loading];
};
