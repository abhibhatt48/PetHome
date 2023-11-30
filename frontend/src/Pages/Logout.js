import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { useHistory } from "react-router";
import { removeUserAction } from "../store/Auth/actions";

function Logout() {
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(removeUserAction());
  }, [dispatch]);
  history.push("/signin");
  return null;
}

export default Logout;
