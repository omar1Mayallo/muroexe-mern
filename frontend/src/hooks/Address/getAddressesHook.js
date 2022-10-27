import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getUserAddress} from "../../RTK/slices/addressSlice";
import Notify from "../useNotification";

const GetUserAddressesHook = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserAddress());
  }, []);

  const {userAddresses, loading, error} = useSelector(
    (state) => state.address.getUserAddress
  );

  let addressItems;
  if (loading === false) {
    if (userAddresses !== []) {
      if (userAddresses.data) {
        addressItems = userAddresses.data;
      }
    } else {
      Notify("Something went wrong", "error");
    }
  }
  return [addressItems, loading, error];
};

export default GetUserAddressesHook;
