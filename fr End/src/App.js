// App.js
import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Authentication/Home';
import Login from './Authentication/Login';
import Signup from './Authentication/Signup';
import Reset from './Authentication/Reset';
import UserHome from "./Authentication/components/WelcomeHome";
import FileUpload from "./Authentication/components/FileUpload";
import Showpdf from "./Authentication/Show/Showpdf";
import Upload from "./Authentication/Upload/Upload";
import Ex from "./Authentication/Excelltopdf/Ex";


function App() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="/Reset" element={<Reset />} />
            <Route path="/UserHome/:id" element={<UserHome />} />
            <Route path="/FileUpload/:id" element={<FileUpload />} />
            <Route path="/Showpdf/:id" element={<Showpdf />} />
            <Route path="/Uploadpdf/:id" element={<Upload />} />
            <Route path="/Ex/:id" element={<Ex/>} />
          </Routes>
        </Router>
      </Suspense>
    </>
  );
}

export default App;
