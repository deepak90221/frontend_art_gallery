import { useState } from 'react';
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../store/auth';
import { toast } from 'react-toastify';

export const Login = () => {
    const [user, setUser] = useState({
        email: "",
        password: "",
        sendOTP: false // Add state for sending OTP
    });

    const [otp, setOtp] = useState('');
    const [isOtpSent, setIsOtpSent] = useState(false); // State to track whether OTP is sent
    const navigate = useNavigate();
    const { storeTokenInLs } = useAuth();

    const handleInput = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const handleSendOTP = async () => {
        try {
            const otpResponse = await fetch(`http://localhost:8000/api/auth/sendotp`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ semail: user.email }),
            });

            const otpResponseData = await otpResponse.json();

            if (!otpResponse.ok) {
                throw new Error(otpResponseData.message || 'Failed to send OTP');
            }

            toast('OTP sent successfully');
            setIsOtpSent(true); // Update state to indicate OTP is sent

        } catch (error) {
            toast('Error sending OTP: ' + error.message);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Check if OTP is sent and verified
            if (isOtpSent) {
                const otpVerificationResponse = await fetch(`http://localhost:8000/api/auth/verifyotp`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ otp, email: user.email }), 
                });

                const otpVerificationData = await otpVerificationResponse.json();

                if (!otpVerificationResponse.ok) {
                    throw new Error(otpVerificationData.message || 'OTP verification failed');
                }

                toast('OTP verification successful');
            } else {
                // If OTP is not sent, show an error
                throw new Error('Please send and verify OTP first');
            }

            // Proceed with login
            const response = await fetch(`http://localhost:8000/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            });

            const responseData = await response.json();

            if (!response.ok) {
                throw new Error(responseData.message || 'Failed to login');
            }

            storeTokenInLs(responseData.token, responseData.username); // Store token and username
            toast('Login successful');
            navigate("/");

        } catch (error) {
            toast('Error during login: ' + error.message);
        }
    };

    return (
        <>
            <section>
                <main>
                    <div className="section-login">
                        <div className="container grid grid-two-cols">
                            <div className="login-image">
                                <img src="/images/login.png" alt="A person logging in"
                                    width="50%" height="50%" />
                            </div>
                        </div>
                    </div>

                    <div className="login-form">
                        <h1 className="main-heading mb-3">Login</h1>
                        <br />

                        <form onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="email">Email</label>
                                <input type="email" name="email"
                                    placeholder="Enter your email" id="email"
                                    required autoComplete="off"
                                    value={user.email}
                                    onChange={handleInput} />
                            </div>
                            <br />
                            <div>
                                <label htmlFor="password">Password</label>
                                <input type="password" name="password"
                                    placeholder="Enter your password" id="password"
                                    required autoComplete="off"
                                    value={user.password}
                                    onChange={handleInput} />
                            </div>

                            <br /><br />

                            {/* Add radio button for sending OTP */}
                            <div>
                                <input type="checkbox" name="sendOTP" checked={user.sendOTP} onChange={handleSendOTP} />
                                <label>Send OTP</label>
                            </div>
                            <br></br>

                            {/* Conditionally render OTP input if OTP is sent */}
                            {isOtpSent &&
                                <>
                                    <div>
                                        <label htmlFor="otp">Enter OTP</label>
                                        <input type="text" name="otp"
                                            placeholder="Enter the OTP" id="otp"
                                            required autoComplete="off"
                                            value={otp}
                                            onChange={(e) => setOtp(e.target.value)} />
                                    </div>
                                    <br />
                                </>
                            }

                            <br /><br />

                            <button type="submit" className="btn btn-submit">
                                Login
                            </button>
                        </form>
                    </div>
                </main>
            </section>
        </>
    );
};
