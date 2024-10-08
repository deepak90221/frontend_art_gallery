import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import "./JobForm.css"; // Assuming the CSS file name is changed

export const JobApplicationForm = () => {
  const [applicant, setApplicant] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    programmingLanguage: "",
    experience: "",
  });

  const navigate = useNavigate();

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setApplicant(prevApplicant => ({
      ...prevApplicant,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/api/auth/job', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(applicant),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || 'Failed to submit application');
      }

      // Send email after successful job application submission
      const emailResponse = await fetch('http://localhost:8000/api/auth/sendEmail', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: applicant.email, message: 'Thank you for your job application!' }),
      });

      const emailResponseData = await emailResponse.json();

      if (!emailResponse.ok) {
        throw new Error(emailResponseData.message || 'Failed to send email');
      }

      toast('Job application submitted and email sent successfully');
      navigate("/");

    } catch (error) {
      toast('Error during job application: ' + error.message);
    }
  };

  return (
    <section className="job-application">
      <div className="container grid grid-two-columns">
        <div className="application-image">
          <img src="/images/jobs.png" alt="Job Application" />
        </div>
        <div className="application-form">
          <h1 className="heading">Job Application Form</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="firstname">First Name</label>
              <input
                type="text"
                name="firstname"
                id="firstname"
                placeholder="Enter your first name"
                required
                value={applicant.firstname}
                onChange={handleInput}
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastname">Last Name</label>
              <input
                type="text"
                name="lastname"
                id="lastname"
                placeholder="Enter your last name"
                required
                value={applicant.lastname}
                onChange={handleInput}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                required
                value={applicant.email}
                onChange={handleInput}
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                type="tel"
                name="phone"
                id="phone"
                placeholder="Enter your phone number"
                required
                value={applicant.phone}
                onChange={handleInput}
              />
            </div>
            <div className="form-group">
              <label htmlFor="programmingLanguage">Programming Language</label>
              <select
                name="programmingLanguage"
                id="programmingLanguage"
                value={applicant.programmingLanguage}
                onChange={handleInput}
                required
              >
                <option value="">Select a programming language</option>
                <option value="C">C</option>
                <option value="C++">C++</option>
                <option value="Python">Python</option>
                <option value="Java">Java</option>
                <option value="Python-advanced">Python-advanced</option>
                <option value="Java-advanced">Java-advanced</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="experience">Experience</label>
              <select
                name="experience"
                id="experience"
                value={applicant.experience}
                onChange={handleInput}
                required
              >
                <option value="">Select years of experience</option>
                <option value="0">0 years</option>
                <option value="1">1 year</option>
                <option value="2">2 years</option>
                <option value="4">4 years</option>
              </select>
            </div>
            <button type="submit" className="btn submit-btn">
              Submit Application
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
