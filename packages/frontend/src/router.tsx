import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Auth from "./pages/Auth";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio";
import News from "./pages/News";
import PrivateRoute from "./auth/PrivateRoute";
import AngelOneAuth from "./pages/Auth/AngelOne";
import HdfcSkyAuth from "./pages/Auth/HdfcSky";
import UpstoxAuth from "./pages/Auth/Upstox";
import Margin from "./pages/Margin";
import Broker from "./pages/Broker";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/auth/angel-one" element={<AngelOneAuth />} />
        <Route path="/auth/hdfc-sky" element={<HdfcSkyAuth />} />
        <Route path="/auth/upstox" element={<UpstoxAuth />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<PrivateRoute Component={Home} />} />
        <Route
          path="/portfolio"
          element={<PrivateRoute Component={Portfolio} />}
        />
        <Route path="/news" element={<PrivateRoute Component={News} />} />
        <Route path="/margin" element={<PrivateRoute Component={Margin} />} />
        <Route path="/broker" element={<PrivateRoute Component={Broker} />} />
      </Routes>
    </Router>
  );
}

export default App;
