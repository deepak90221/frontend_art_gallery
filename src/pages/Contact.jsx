import { useState } from 'react';
import "./Contact.css";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const Contact = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        message: "",
    });

    const navigate = useNavigate();
    const [errorMsg, setErrorMsg] = useState("");

    const handleInput = (e) => {
        const { name, value } = e.target;

        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!/^[A-Z]/.test(formData.username)) {
            toast("Username must start with a capital letter.");
            return;
        }

        try {
            const response = await fetch(`http://localhost:8000/api/auth/contact`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const responseData = await response.json();

            if (!response.ok) {
                throw new Error(responseData.msg || 'Failed to send message');
            }

            await fetch(`http://localhost:8000/api/auth/sendMail`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ empid: responseData.empid, email: formData.email }),
            });

            toast("Message received, and email sent successfully");

            navigate("/");
            setFormData({
                username: "",
                email: "",
                message: "",
            });
            setErrorMsg(""); 
        } catch (error) {
            console.error(error.message);
            setErrorMsg(error.message || "Failed to send message");
        }
    };

    return (
        <section>
            <main>
                <div className="section-contact">
                    <div className="container grid grid-two-cols">
                        <div className="contact-image">
                            <img src="./images/contact_art.png" alt="Contact Us" />
                        </div>
                    </div>
                </div>

                <div className="registration-form">
                    <h1 className="main-heading mb-3">Contact the Art Gallery</h1>
                    <br/>

                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="username">Username</label>
                            <input type="text" name="username" 
                                   placeholder="Enter your username" id="username"
                                   required autoComplete="off"
                                   value={formData.username}
                                   onChange={handleInput} />
                        </div>

                        <div>
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" 
                                   placeholder="Enter your email" id="email"
                                   required autoComplete="off"
                                   value={formData.email}
                                   onChange={handleInput} />
                        </div>

                        <div>
                            <label htmlFor="message">Message</label>
                            <textarea name="message" id="message" 
                                      placeholder="Share your thoughts or inquiries about our exhibitions" 
                                      required
                                      value={formData.message}
                                      onChange={handleInput}></textarea>
                        </div>

                        <br/>

                        {errorMsg && <div className="error-message">{errorMsg}</div>}
                        
                        <button type="submit" className="btn btn-submit">
                            Submit
                        </button>
                    </form>
                </div>
            </main>
        </section>
    );
};
