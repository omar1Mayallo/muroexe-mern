import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {updateUserInfo, updateUserPassword} from "../../RTK/slices/userSlice";
import Notify from "../useNotification";
import {useNavigate} from "react-router-dom";
const UserInfoHook = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //Info Modal State
  const [showInfoModal, setShowInfoModal] = useState(false);
  const handleInfoClose = () => setShowInfoModal(false);
  const handleInfoShow = () => setShowInfoModal(true);
  //Password Modal State
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const handlePasswordClose = () => setShowPasswordModal(false);
  const handlePasswordShow = () => setShowPasswordModal(true);

  //Get current User
  let user;
  if (localStorage.getItem("user") != null) {
    user = JSON.parse(localStorage.getItem("user"));
  }
  // console.log(user);
  //////////////////////////////////////
  // Change User Info
  //////////////////////////////////////
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  // const [image, setImage] = useState(user.image);
  // const [file, setFile] = useState(null);
  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  // const handleImageChange = (e) => {
  //   if (e.target.files && e.target.files[0]) {
  //     setImage(URL.createObjectURL(e.target.files[0]));
  //     setFile(e.target.files[0]);
  //   }
  // };
  // console.log(image);

  const handleInfoChange = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    // formData.append("image", file);
    dispatch(updateUserInfo(formData));
    handleInfoClose();
  };

  const {updatedInfo, loading, error} = useSelector(
    (state) => state.user.updateUserInfo
  );
  useEffect(() => {
    if (loading === false) {
      if (updatedInfo !== []) {
        if (updatedInfo.status === 200) {
          Notify("Successfully Updating", "success");
          localStorage.setItem("user", JSON.stringify(updatedInfo.data.user));
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
      } else {
        Notify("Updating Failed", "warn");
      }
    }
  }, [loading]);

  //////////////////////////////////////
  // Change User Password
  //////////////////////////////////////
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const handleChangeOldPassword = (e) => setOldPassword(e.target.value);
  const handleChangeNewPassword = (e) => setNewPassword(e.target.value);
  const handleChangeConfirmNewPassword = (e) =>
    setConfirmNewPassword(e.target.value);

  const handlePasswordChange = () => {
    if (newPassword !== confirmNewPassword) {
      Notify("Passwords do not matches", "warn");
      return;
    }
    dispatch(
      updateUserPassword({
        currentPassword: oldPassword,
        newPassword: newPassword,
        newPasswordConfirmation: confirmNewPassword,
      })
    );
    handlePasswordClose();
  };

  const {updatedPassword, loadingPass, errorPass} = useSelector(
    (state) => state.user.updateUserPassword
  );

  useEffect(() => {
    if (loadingPass === false) {
      if (updatedPassword !== []) {
        if (updatedPassword.status === 200) {
          Notify("Successfully Password Updated", "success");
          setTimeout(() => {
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            window.location.href = "/login";
          }, 1000);
        }
      }

      if (errorPass) {
        if (
          errorPass &&
          errorPass.message === "Your current password is incorrect"
        ) {
          Notify("Your current password is incorrect", "warn");
        } else if (
          errorPass &&
          errorPass.message ===
            "User changed password recently , Please Login again"
        ) {
          Notify("User changed password recently , Please Login again", "warn");
        } else {
          Notify("Updating Failed", "error");
        }
      }
    }
  }, [loadingPass]);

  return [
    //Modals
    handleInfoClose,
    handleInfoShow,
    handlePasswordClose,
    handlePasswordShow,
    showInfoModal,
    showPasswordModal,
    //user
    user,
    //Info
    name,
    email,
    // image,
    handleNameChange,
    handleEmailChange,
    // handleImageChange,
    handleInfoChange,
    //Password
    oldPassword,
    newPassword,
    confirmNewPassword,
    handleChangeOldPassword,
    handleChangeNewPassword,
    handleChangeConfirmNewPassword,
    handlePasswordChange,
  ];
};

export default UserInfoHook;
