import React, { useState, useEffect, useCallback } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import * as Api from "./api";
import { login } from "./redux/userSlice";

import Header from "./components/header/Header";
import LoginForm from "./components/user/LoginForm";
import RegisterForm from "./components/user/RegisterForm";
import MainPage from "./components/main/MainPage";
import MapMainPage from "./components/map/MapMainPage";
import MapDetailPage from "./components/map/MapDetailPage";
import TeamPage from "./components/team/TeamPage";
import MyPage from "./components/user/mypage/MyPage";
import RestaurantDetailPage from "./components/restaurant/RestaurantDetailPage";
import UnregisterConfirmationPage from "./components/user/UnregisterConfirmationPage";
import InfoPage from "./components/info/InfoPage";
import KakaoRedirectHandler from "./components/user/KakaoRedirectHandler";
import PasswordResetPage from "./components/user/PasswordResetPage";

function App() {
  const dispatch = useDispatch();

  // 아래의 fetchCurrentUser 함수가 실행된 다음에 컴포넌트가 구현되도록 함.
  // 아래 코드를 보면 isFetchCompleted 가 true여야 컴포넌트가 구현됨.
  const [isFetchCompleted, setIsFetchCompleted] = useState(false);

  const fetchCurrentUser = useCallback(async () => {
    try {
      // 이전에 발급받은 토큰이 있다면, 이를 가지고 유저 정보를 받아옴.
      const res = await Api.get("users/current");
      const currentUser = res.data;

      // dispatch 함수를 통해 로그인 성공.
      dispatch(login(currentUser));

      console.log("%c sessionStorage에 토큰 있음.", "color: #d93d1a;");
    } catch {
      console.log("%c SessionStorage에 토큰 없음.", "color: #d93d1a;");
    }
    // fetchCurrentUser 과정이 끝났으므로, isFetchCompleted 상태를 true로 바꿔줌
    setIsFetchCompleted(true);
  }, []);

  // useEffect함수를 통해 fetchCurrentUser 함수를 실행함.
  useEffect(() => {
    fetchCurrentUser();
  }, []);

  if (!isFetchCompleted) {
    return "loading...";
  }

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" exact element={<MainPage />} />
        <Route path="/map" exact element={<MapMainPage />} />
        <Route path="/detail" exact element={<MapDetailPage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/login/kakao" element={<KakaoRedirectHandler />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/team-craft" element={<TeamPage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/unregister" element={<UnregisterConfirmationPage />} />
        <Route path="/restaurants/:id" element={<RestaurantDetailPage />} />
        <Route path="/service-info" element={<InfoPage />} />
        <Route path="/reset" element={<PasswordResetPage />} />
      </Routes>
    </Router>
  );
}

export default App;
