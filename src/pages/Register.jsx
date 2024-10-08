import { useState } from 'react';
import "./Register.css";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

export const Register = () => {
    const [user, setUser] = useState({
        username: "",
        email: "",
        phone: "",
        password: "",
    });

    const navigate = useNavigate();

    // Handling the input value
    const handleInput = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validations
        if (!/^[6-9]\d{9}$/.test(user.phone)) {
            toast.error("Mobile number must start with 6 and be 10 digits long.");
            return;
        }

        if (!/^[A-Z]/.test(user.username)) {
            toast.error("Username must start with a capital letter.");
            return;
        }

        if (!/^[a-zA-Z@]+$/.test(user.password)) {
            toast.error("Password must contain only characters and @ symbol.");
            return;
        }

        try {
            const response = await fetch(`http://localhost:8000/api/auth/register`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(user),
            });

            const responseData = await response.json();

            if (!response.ok) {
                throw new Error(responseData.message || 'Failed to register');
            }

            // Store the token in localStorage and set the username
            toast.success('Registration successful');

            // Send welcome email
            await fetch(`http://localhost:8000/api/auth/sendMail`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ empid: responseData.empid, email: user.email }),
            });

            toast.success("Registration form saved and email sent successfully");

            // Navigate to the login page
            navigate("/login");

            // Clear the form
            setUser({
                username: "",
                email: "",
                phone: "",
                password: "",
            });

        } catch (error) {
            console.log('Error during registration:', error.message);
            toast.error('Registration failed');
        }
    };

    return (
        <>
            <section>
                <main>
                    <div className="section-registration">
                        <div className="container grid grid-two-cols">
                            <div className="registration-image">
                                <img src="/images/register.png" alt="A boy trying to register"
                                     width="50%" height="50%" />
                            </div>
                        </div>
                    </div>

                    <div className="registration-form">
                        <h1 className="main-heading mb-3">Registration Form</h1>
                        <br/>

                        <form onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="username">Username</label>
                                <input type="text" name="username"
                                       placeholder="Enter your username" id="username"
                                       required autoComplete="off"
                                       value={user.username}
                                       onChange={handleInput} />
                            </div>
                            <div>
                                <label htmlFor="email">Email</label>
                                <input type="email" name="email"
                                       placeholder="Enter your email" id="email"
                                       required autoComplete="off"
                                       value={user.email}
                                       onChange={handleInput} />
                            </div>

                            <div>
                                <label htmlFor="phone">Phone</label>
                                <input type="tel" name="phone"
                                       placeholder="Enter your phone number" id="phone"
                                       required autoComplete="off"
                                       value={user.phone}
                                       onChange={handleInput} />
                            </div>

                            <div>
                                <label htmlFor="password">Password</label>
                                <input type="password" name="password"
                                       placeholder="Enter your password" id="password"
                                       required autoComplete="off"
                                       value={user.password}
                                       onChange={handleInput} />
                            </div>

                            <br/>

                            <button type="submit" className="btn btn-submit">
                                Register Now
                            </button>
                        </form>
                    </div>
                </main>
            </section>
        </>
    );
};

