import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./views/Home";
import SignIn from "./views/SignIn";
import SignUp from "./views/SignUp";
import HomeAccount from "./views/HomeAccount";
import ProtectedRoutes from "./views/ProtectedRoutes";
import Profile from "./views/Profile";
import { UserProvider } from "./context/UserProvider";

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/home" element={<HomeAccount />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
