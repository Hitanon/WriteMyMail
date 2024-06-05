import { BrowserRouter } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";

import { getUserInfo } from "./clients/UserClient";

import { Context } from ".";

import AppRouter from "./components/general/AppRouter";
import TechnicalWorks from "./components/general/TechnicalWorks";

const App = observer(() => {
  const [isAlive, setIsALive] = useState(false);
  const { user } = useContext(Context);

  const checkIsAlive = async () => {
    // change it
    setIsALive(true);
  }

  const loadUserInfo = async () => {
    // change it
    const userInfo = await getUserInfo();
    if (userInfo === null) {
      return;
    }
    user.setLogin(userInfo.login);
    user.setName(userInfo.name);
    user.setInfo(userInfo.info);
    user.setEmails(userInfo.emails);
    user.setIsAuth(userInfo.isAuth);
  }

  useEffect(() => {
    checkIsAlive();
    loadUserInfo();
  })

  if (!isAlive) {
    return (
      <TechnicalWorks />
    );
  }

  return (
    <>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </>
  )

})

export default App;
