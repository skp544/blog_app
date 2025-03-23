import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Projects from "./pages/Projects.jsx";
import Header from "./components/Header.jsx";
import FooterMain from "./components/FooterMain.jsx";
import Profile from "./pages/Profile.jsx";
import PrivateRoute from "./components/routes/PrivateRoute.jsx";
import PublicRoute from "./components/PublicRoute.jsx";
import AdminRoute from "./components/routes/AdminRoute.jsx";
import CreatePost from "./pages/CreatePost.jsx";
import UpdatePost from "./pages/UpdatePost.jsx";
import SinglePostPage from "./pages/SinglePostPage.jsx";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/about"} element={<About />} />
        <Route path={"/projects"} element={<Projects />} />
        <Route path={"/post/:slug"} element={<SinglePostPage />} />
        <Route element={<PublicRoute />}>
          <Route path={"/sign-in"} element={<SignIn />} />
          <Route path={"/sign-up"} element={<SignUp />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path={"/dashboard"} element={<Dashboard />} />
          <Route path={"/profile"} element={<Profile />} />
        </Route>
        <Route element={<AdminRoute />}>
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/update-post/:postId" element={<UpdatePost />} />
        </Route>
      </Routes>
      <FooterMain />
    </>
  );
}

export default App;
