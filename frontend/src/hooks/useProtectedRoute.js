import React, {useEffect, useState} from "react";

const useProtectedRoute = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [isUser, setIsUser] = useState();
  const [isAdmin, setIsAdmin] = useState();

  useEffect(() => {
    if (user !== null) {
      if (user.role === "user") {
        setIsUser(true);
        setIsAdmin(false);
      } else {
        setIsUser(false);
        setIsAdmin(true);
      }
    } else {
      setIsUser(false);
      setIsAdmin(false);
    }
  }, []);

  return [isUser, isAdmin, user];
};

export default useProtectedRoute;
