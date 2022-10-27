import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addAddress} from "../../RTK/slices/addressSlice";
import Notify from "../useNotification";

const AddReviewHook = () => {
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [city, setCity] = useState("");
  const [details, setDetails] = useState("");
  const [phone, setPhone] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const handleChangeCity = (e) => setCity(e.target.value);
  const handleChangeDetails = (e) => setDetails(e.target.value);
  const handleChangePhone = (e) => setPhone(e.target.value);
  const handleChangePostalCode = (e) => setPostalCode(e.target.value);

  const handleSubmit = () => {
    if (city === "" || details === "" || phone === "" || postalCode === "") {
      Notify("Please enter all information of Your address", "error");
      return;
    }
    dispatch(addAddress({city, details, phone, postalCode}));
    handleClose();
  };

  const {addressInfo, loading, error} = useSelector(
    (state) => state.address.addAddress
  );

  useEffect(() => {
    if (loading === false) {
      if (addressInfo !== []) {
        if (addressInfo.status === 200) {
          Notify("Address added successfully", "success");
          setTimeout(() => {
            window.location.reload();
          }, 500);
        }
      } else {
        Notify("Address added failed", "error");
      }
    }
  }, [loading]);

  return [
    show,
    handleClose,
    handleShow,
    city,
    details,
    phone,
    postalCode,
    handleChangeCity,
    handleChangeDetails,
    handleChangePhone,
    handleChangePostalCode,
    handleSubmit,
  ];
};

export default AddReviewHook;
