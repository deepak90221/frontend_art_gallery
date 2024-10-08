import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Instructions.css';

export function Instructions() {
  const [accepted, setAccepted] = useState(false);
  const navigate = useNavigate();

  const handleAcceptChange = (event) => {
    setAccepted(event.target.checked);
  };

  const handleAttemptNow = () => {
    if (accepted) {
      navigate('/xam'); // Navigate to the exam page
    } else {
      alert('You must accept the terms and conditions before attempting the exam.');
    }
  };

  return (
    <section>
      <main>
        <div className="registration-form">
          <h1>Online Exam</h1>
          <div className="exam-terms">
            <p className="terms-text">
              <strong>Terms and Conditions:</strong>
              <br /><br />
              1. You may only use a single device to take the exam.
              <br /><br />
              2. You are prohibited from using any unauthorized materials or resources during the exam, such as textbooks, notes, or calculators.
              <br /><br />
              3. Communication with others during the exam is strictly forbidden.
              <br /><br />
              4. You must complete the exam within the allotted time limit.
              <br /><br />
              5. Any cheating or suspicious activity will result in the disqualification of your exam.
            </p>
            <div className="exam-details">
              <strong>Exam Details:</strong>
              <table>
                <thead>
                  <tr>
                    <th>Section</th>
                    <th>Number of Questions</th>
                    <th>Marks</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Quiz</td>
                    <td>3</td>
                    <td>6 marks</td>
                  </tr>
                  <tr>
                    <td>Coding Problem</td>
                    <td>1</td>
                    <td>10 marks</td>
                  </tr>
                </tbody>
              </table>
              <p className="time-limit"><strong>Time limit:</strong> 15 minutes</p>
            </div>
          </div>
          <div className="accept-terms">
            <input
              type="checkbox"
              id="acceptTerms"
              checked={accepted}
              onChange={handleAcceptChange}
            />
            <label htmlFor="acceptTerms" className="terms-label">
              I accept and agree to all the terms and conditions
            </label>
          </div>
          <button className="attempt-button" onClick={handleAttemptNow} disabled={!accepted}>
            Attempt Now
          </button>
        </div>
        <div className="registration-image">
          <img src="./images/exam1.png" alt="Exam Illustration" />
        </div>
      </main>
    </section>
  );
}
