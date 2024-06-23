import { BrowserRouter } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState, useCallback } from "react";
import { CircularProgress, Box } from "@mui/material";
import { getUserInfo } from "./clients/UserClient";
import { Context } from ".";
import AppRouter from "./components/general/AppRouter";
import ScrollToTop from './components/general/ScrollToTop';

const App = observer(() => {
  const { user } = useContext(Context);
  const [loading, setLoading] = useState(true);

  const loadUserInfo = useCallback(async () => {
    const token = localStorage.getItem("accessToken");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) {
      setLoading(false);
      return;
    }

    try {
      const userInfo = await getUserInfo(userId);
      if (userInfo) {
        user.setId(userId);
        user.setLogin(userInfo.username);
        user.setName(userInfo.name);
        user.setInfo(userInfo.info);
        user.setEmails(userInfo.emails);
        user.setIsAuth(true);       
      }
    } catch (error) {
      console.error("Failed to load user info:", error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    loadUserInfo();
  }, [loadUserInfo]);

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh'
        }}
      >
        <CircularProgress color="inherit" />
      </Box>
    );
  }

  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppRouter />
    </BrowserRouter>
  );
});

export default App;
