import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {removeAddress} from "../../RTK/slices/addressSlice";
import Notify from "../useNotification";

const RemoveAddressHook = (item) => {
  const dispatch = useDispatch();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const handleCloseDeleteModal = () => setShowDeleteModal(false);
  const handleShowDeleteModal = () => setShowDeleteModal(true);

  const handleDelete = () => {
    dispatch(removeAddress(item._id));
    handleCloseDeleteModal();
  };

  const {removedAddress, loading, error} = useSelector(
    (state) => state.address.removeAddress
  );

  useEffect(() => {
    if (loading === false) {
      if (removedAddress !== []) {
        if (removedAddress.status === "success") {
          setTimeout(() => {
            window.location.reload();
          }, 500);
        }
      } else {
        Notify("Something went wrong while Deleting", "error");
      }
    }
  }, [loading]);

  return [
    showDeleteModal,
    handleCloseDeleteModal,
    handleShowDeleteModal,
    handleDelete,
  ];
};

export default RemoveAddressHook;
