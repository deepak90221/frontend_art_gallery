import  { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function OtpMail() {
    const [semail, setsemail] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(semail);
        const data = {
            semail
        };
        try {
            const result = await axios.post("http://localhost:8000/api/auth/sendotp", data);
            console.log("OTP Sent Successfully");
            console.log(result);
            navigate(`/verifyotp?email=${semail}`);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='sendotp'>
            <div className="container mt-4">
                <div className='form-control'>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className='form-label'>Enter Email:</label>
                            <input
                                type='email'
                                value={semail}
                                className='form-control'
                                placeholder='Enter Email'
                                onChange={(e) => setsemail(e.target.value)}
                            />
                        </div>
                        <div>
                            <button className="btn btn-secondary mt-3" type='submit'>Verify OTP</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default OtpMail;
