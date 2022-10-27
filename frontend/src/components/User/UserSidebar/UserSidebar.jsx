import React from "react";
import {LinkContainer} from "react-router-bootstrap";
import {Link} from "react-router-dom";

const UserSidebar = () => {
  return (
    <div className="sidebar bg-light mb-3">
      <div className="d-flex flex-column text-center">
        <LinkContainer to="/user/profile">
          <Link className="my-1 border-bottom p-2">Profile</Link>
        </LinkContainer>
        <LinkContainer to="/user/wishlist">
          <Link className="my-1 border-bottom p-2">Wishlist</Link>
        </LinkContainer>
        <LinkContainer to="/user/addresses">
          <Link className="my-1 border-bottom p-2">Addresses</Link>
        </LinkContainer>
        <LinkContainer to="/user/orders">
          <Link className="my-1 p-2">Orders</Link>
        </LinkContainer>
      </div>
    </div>
  );
};

export default UserSidebar;
