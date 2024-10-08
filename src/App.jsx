import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Navbar } from "./components/Navbar";
import { Services } from "./pages/Services";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { Footer } from "./components/Footer";
import { Error } from "./pages/Error";
import { Logout } from "./pages/Logout";
import { Adminlayout } from "./components/layouts/Admin-layout";
import { AdminContacts } from "./pages/Admin-Contacts";
import { AdminUsers } from "./pages/Admin-User";
import { EditForm } from "./pages/Admin-Update";
import { PostServicex } from "./pages/PostServices";
import { JobStatus } from "./pages/JobStatuses";
import { Wishlist } from "./pages/Wishlist_Cart";
import { AdminLoginRegister } from "./pages/AdminRegLog";

import { JobApplicationForm } from "./pages/JobForm";

//import { CodingExam } from "./pages/WriteExam";

import { Instructions } from "./pages/Examinstruct";

import { ProfilePage } from "./pages/Profile";
import {OrderTracking} from "./pages/Track";


//import { Exam } from "./pages/WriteExam";



import OtpMail from "./pages/OtpMail";

import VerifyOtp from './pages/VerifyOtp';


import { AdminJob} from "./pages/Admin-Job";
import CodingExam from "./pages/WriteExam";
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="/register" element={<Register />} />
          <Route path="/edit" element={<EditForm />} />
          <Route path="/post" element={<PostServicex />} />
          <Route path="/track" element={<OrderTracking/>} />

          

          <Route path="/cart" element={<Wishlist />} />


          <Route path="/login" element={<Login />} />

          <Route path="/logout" element={<Logout />} />

          <Route path="/adminlogreg" element={<AdminLoginRegister />} />

          <Route path="/otpmail" element={<OtpMail />} />


          <Route path="/verifyotp" element={<VerifyOtp />} />


          <Route path="/ins" element={< Instructions />} />

          <Route path="/xam" element={< CodingExam />} />
          <Route path="/jobs" element={< AdminJob />} />
          <Route path="/status" element={< JobStatus />} />
          


          <Route path="/profile" element={<ProfilePage />} />

    
          <Route path="*" element={<Error />} />
          <Route path="/jobform" element={<JobApplicationForm />} />


          
          <Route path="/admin" element={<Adminlayout />}>
            <Route path="users" element={<AdminUsers />} />
            <Route path="contacts" element={<AdminContacts />} />

            


          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
