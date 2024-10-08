import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Quiz.css';
import { toast, ToastContainer } from 'react-toastify'; // Import the toast and ToastContainer components
import 'react-toastify/dist/ReactToastify.css';

const CodingExam = () => {
  const [code, setCode] = useState(localStorage.getItem('code') || '');
  const [submitted, setSubmitted] = useState(false);
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'c');
  const [timeLeft, setTimeLeft] = useState(parseInt(localStorage.getItem('timeLeft'), 10) || 900); 
  const [warningCount, setWarningCount] = useState(parseInt(localStorage.getItem('warningCount'), 10) || 0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState(parseInt(localStorage.getItem('answeredQuestions'), 10) || 0);
  const [showSubmissionModal, setShowSubmissionModal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && !submitted) {
        if (warningCount < 2) {
          toast('Warning: You are switching tabs. Make sure to submit your exam before leaving this page.');
          setWarningCount(prevCount => {
            const newCount = prevCount + 1;
            localStorage.setItem('warningCount', newCount);
            return newCount;
          });
        } else {
          toast('You have switched tabs too many times. Your exam will be submitted automatically.');
          submitExam();
        }
      }
    };

    const handleBeforeUnload = (event) => {
      if (!submitted) {
        const confirmationMessage = 'You have an ongoing exam. Are you sure you want to leave?';
        event.returnValue = confirmationMessage;
        return confirmationMessage;
      }
    };

    const handlePopState = (event) => {
      if (!submitted) {
        const confirmationMessage = 'You have an ongoing exam. Are you sure you want to navigate away?';
        if (!window.confirm(confirmationMessage)) {
          event.preventDefault();
          return;
        }
      }
    };
    

    const timer = setInterval(() => {
      if (timeLeft > 0 && !submitted) {
        setTimeLeft(prevTime => {
          localStorage.setItem('timeLeft', prevTime - 1);
          return prevTime - 1;
        });
      } else if (timeLeft === 0 && !submitted) {
        submitExam();
      }
    }, 1000);

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('popstate', handlePopState);

    return () => {
      clearInterval(timer);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [timeLeft, submitted, warningCount, navigate]);

  useEffect(() => {
    localStorage.setItem('code', code);
  }, [code]);

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('answeredQuestions', answeredQuestions);
  }, [answeredQuestions]);

  const handleChange = (event) => {
    setCode(event.target.value);
  };

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  const handleQuestionAnswered = () => {
    setAnsweredQuestions(answeredQuestions + 1);
  };

  const submitExam = () => {
    setShowSubmissionModal(true);
  };

  const confirmSubmission = () => {
    console.log('Submitted code:', code);
    setSubmitted(true);
    setShowSubmissionModal(false);
    localStorage.clear();
    toast("Exam submitted successfully!!"); 

    navigate('/');
  };

  const toggleQuizDisplay = () => {
    setShowQuiz(prevState => !prevState);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const quizQuestions = [
    {
      question: 'What does the acronym "ASCII" stand for in C programming?',
      answer: 'American Standard Code for Information Interchange',
    },
    {
      question: 'What is the output of the following code?\n\n#include <stdio.h>\nint main() {\n  printf("%d\\n", sizeof("Hello"));\n  return 0;\n}',
      answer: '6',
    },
    {
      question: 'What is the correct syntax for declaring a pointer in C?',
      answer: 'int *ptr;',
    },
    {
      question: 'What is the output of the following code?\n\n#include <stdio.h>\nint main() {\n  int x = 5;\n  int y = 2;\n  printf("%d", x % y);\n  return 0;\n}',
      answer: '1',
    },
    {
      question: 'What does the "scanf" function do in C?',
      answer: 'Reads formatted input from the standard input stream',
    },
  ];
  const codingQuestion = {
    question: 'Write a function in C that takes an integer array and its size as arguments and returns the sum of its elements. Provide your solution in the code editor below.',
  };

  const numQuestions = quizQuestions.length + 1; 
  const numUnansweredQuestions = numQuestions - answeredQuestions;

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="coding-exam-container">
        <div className="timer-card">
          <p>{submitted ? 'Successfully Submitted!' : `Time Left: ${formatTime(timeLeft)}`}</p>
        </div>
        <h2>Coding Exam</h2>
        <div className="quiz-button-container">
          <button onClick={toggleQuizDisplay}>{showQuiz ? 'Hide Quizzes' : 'Show Quizzes'}</button>
        </div>
        {showQuiz && (
          <div className="quiz-questions">
            {quizQuestions.map((quiz, index) => (
              <div key={index} className="question">
                <h3>Quiz Question {index + 1}:</h3>
                <p>{quiz.question}</p>
                <input type="text" name={`quiz${index + 1}`} required={!submitted} disabled={submitted} onChange={handleQuestionAnswered} />
              </div>
            ))}
          </div>
        )}
        <div className="coding-question">
          <h3>Coding Question:</h3>
          <p>{codingQuestion.question}</p>
          <div className="editor-container">
            <textarea 
              value={code} 
              onChange={handleChange} 
              placeholder="Write your code here..." 
              className="code-editor"
              readOnly={submitted} 
              onKeyDown={(e) => {if (e.shiftKey && e.keyCode === 9) { e.preventDefault(); submitExam(); } }} // Prevent Shift+Tab and submit exam
            />
          </div>
          <div className="language-dropdown">
            <label htmlFor="language">Select Language:</label>
            <select id="language" value={language} onChange={handleLanguageChange}>
              <option value="c">C</option>
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
              <option value="cpp">C++</option>
            </select>
          </div>
        </div>
        <div className="attempted-questions">
          <p>Attempted Questions: {answeredQuestions}</p>
          <p>Unanswered Questions: {numUnansweredQuestions}</p>
        </div>
        <button onClick={submitExam} disabled={submitted} className="submit-btn">
          {submitted ? 'Submitted' : 'Submit'}
        </button>

        {showSubmissionModal && (
          <div className="submission-modal">
            <div className="modal-content">
              <h3>Confirm Submission</h3>
              <table>
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>Count</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Attempted Questions</td>
                    <td>{answeredQuestions}</td>
                  </tr>
                  <tr>
                    <td>Unattempted Questions</td>
                    <td>{numUnansweredQuestions}</td>
                  </tr>
                </tbody>
              </table>
              <div className="modal-buttons">
                <button disabled={warningCount >= 2} onClick={() => setShowSubmissionModal(false)}>No, Continue Attempt</button>
                <button onClick={confirmSubmission}>Yes, Submit the Exam</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CodingExam;

