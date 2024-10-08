import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

function VerifyOtp() {
    const location = useLocation();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const emailFromOtpMail = queryParams.get('email');
        setEmail(emailFromOtpMail);
    }, [location.search]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            otp,
            email,
        };

        try {
            const response = await axios.post("http://localhost:8000/api/auth/verifyotp", data);

            if (response.data.success) {
                setMessage('OTP verification successful');
                toast('OTP verification successful');
                navigate("/"); // Navigate to the main application
            } else {
                setMessage('Incorrect OTP');
                toast('Incorrect OTP');
            }
        } catch (err) {
            console.log(err);
            setMessage('An error occurred during OTP verification');
            toast('An error occurred during OTP verification');
        }
    };

    return (
        <div className='sendotp'>
            <div className='container mt-4'>
                <div className='form-control'>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className='form-label'>Enter Email:</label>
                            <input
                                type='email'
                                value={email}
                                className='form-control'
                                placeholder='Enter Email'
                                disabled
                            />
                        </div>
                        <div className='mb-3'>
                            <label className='form-label'>Enter OTP:</label>
                            <input
                                className='form-control'
                                value={otp}
                                type='text'
                                placeholder='Enter OTP'
                                onChange={(e) => setOtp(e.target.value)}
                                required
                            />
                        </div>
                        <br />
                        <div>
                            <button className='btn btn-primary' type='submit'>
                                Submit OTP
                            </button>
                        </div>
                    </form>
                    <div className="mt-3">
                        {message && (
                            <p className={message.includes('successful') ? 'text-success' : 'text-danger'}>
                                {message}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VerifyOtp;
