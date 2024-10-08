import { useState } from 'react';
import "./AdminRegLog.css";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { useAuth } from "../store/auth"; 

export const AdminLoginRegister = () => {
  const [isRegister, setIsRegister] = useState(true);
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const { storeTokenInLs } = useAuth(); // Get the storeTokenInLs function
  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleFormToggle = () => {
    setIsRegister(!isRegister);
    setUser({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isRegister) {
      if (user.password !== user.confirmPassword) {
        return toast("Passwords do not match");
      }

      try {
        const response = await fetch('http://localhost:8000/api/auth/adminreg', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: user.username,
            email: user.email,
            phone: user.phone,
            password: user.password,
          }),
        });
        const data = await response.json();
        if (response.ok) {
          console.log('Registration successful:', data);
          toast('Admin Registration successful');
        } else {
          console.log('Registration error:', data);
          toast('Registration failed: ' + data.msg);
        }
      } catch (error) {
        console.error('Error:', error);
        toast('An error occurred. Please try again later.');
      }
    } else {
      try {
        const response = await fetch('http://localhost:8000/api/auth/adminlog', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: user.email,
            password: user.password,
          }),
        });
        const data = await response.json();
        if (response.ok) {
          console.log('Login successful:', data);
          toast(' Admin Login successful');

          storeTokenInLs(data.token, data.username); // Store the token and username
          navigate("/admin");
        } else {
          console.log('Login error:', data);
          toast('Login failed: ' + data.msg);
        }
      } catch (error) {
        console.error('Error:', error);
        toast('An error occurred. Please try again later.');
      }
    }
  };

  return (
    <section className="admin-login-register-section">
      <main className="admin-login-register-main">
        <div className="admin-registration grid grid-two-cols">
          <div className="admin-registration-image">
            <img
              src={isRegister ? "/images/adminreg.png" : "/images/adminlogin.png"}
              alt={isRegister ? "Register" : "Login"}
              className="registration-img"
            />
          </div>
          <div className="admin-registration-form">
            <h1 className="main-heading mb-3">
              {isRegister ? 'Admin Registration Form' : 'Admin Login Form'}
            </h1>
            <br />
            <form onSubmit={handleSubmit}>
              {isRegister && (
                <div className="form-group">
                  <label htmlFor="username" className="form-label">Username</label>
                  <input
                    type="text"
                    name="username"
                    placeholder="Enter your username"
                    id="username"
                    required
                    autoComplete="off"
                    value={user.username}
                    onChange={handleInput}
                    className="form-input"
                  />
                </div>
              )}
              <div className="form-group">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  id="email"
                  required
                  autoComplete="off"
                  value={user.email}
                  onChange={handleInput}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  id="password"
                  required
                  autoComplete="new-password"
                  value={user.password}
                  onChange={handleInput}
                  className="form-input"
                />
              </div>
              {isRegister && (
                <div className="form-group">
                  <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Re-enter your password"
                    id="confirmPassword"
                    required
                    autoComplete="new-password"
                    value={user.confirmPassword}
                    onChange={handleInput}
                    className="form-input"
                  />
                </div>
              )}
              <br />
              <button type="submit" className="btn btn-submit">
                {isRegister ? 'Register Now' : 'Login'}
              </button>
            </form>
            <button onClick={handleFormToggle} className="toggle-button">
              {isRegister ? 'Switch to Login' : 'Switch to Register'}
            </button>
          </div>
        </div>
      </main>
    </section>
  );
};
