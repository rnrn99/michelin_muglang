import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../redux/userSlice";
import { useLocation, useNavigate } from "react-router-dom";
import * as Api from "../../api";

const KakaoRedirectHandler = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchUser = async () => {
    const res = await Api.get("users/current");

    dispatch(login(res.data));
    navigate("/", { replace: true });
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    sessionStorage.setItem("userToken", token);

    fetchUser();
  }, []);

  return <div>redirect page</div>;
};

export default KakaoRedirectHandler;
