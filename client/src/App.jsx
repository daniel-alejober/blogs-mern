import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./views/Home";
import SignIn from "./views/SignIn";
import SignUp from "./views/SignUp";
import HomeAccount from "./views/HomeAccount";
import ProtectedRoutes from "./views/ProtectedRoutes";
import Profile from "./views/Profile";
import NewArtitle from "./views/NewArtitle";
import ReadArticle from "./views/ReadArticle";
import { UserProvider } from "./context/UserProvider";
import { ArticleProvider } from "./context/ArticlesProvider";

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <ArticleProvider>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/readarticle/:id" element={<ReadArticle />} />
            <Route element={<ProtectedRoutes />}>
              <Route path="/home" element={<HomeAccount />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/newartitle" element={<NewArtitle />} />
            </Route>
          </Routes>
        </ArticleProvider>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
