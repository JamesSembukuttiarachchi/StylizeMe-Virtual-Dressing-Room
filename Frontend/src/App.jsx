import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import FeedbackForm from './pages/Feedback';
import Feedbackview from './pages/Feedbackview';
import Feedbackupdate from './pages/Feedbackupdate';
import Feedbackdelete from './pages/Feedbackdelete';
import FeedbackHome from './pages/FeedbackHome';
import UserReport from './pages/UserReport';


//app.jsx
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<FeedbackHome />} />
          <Route path="/Feedback" element={<FeedbackForm/>}/>
          <Route path="/Feedbackview/:feedbackId" element={<Feedbackview/>}/>
          <Route path="/Feedbackupdate/:feedbackId" element={<Feedbackupdate />}/>
          <Route path="/Feedbackdelete/:feedbackId" element={<Feedbackdelete />} />
          <Route path="/feedbackview/:id" element={<UserReport />} />
          
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;

