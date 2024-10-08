import { useState, useEffect } from 'react';
import "./Profile.css";
import { useAuth } from '../store/auth';
import { toast } from 'react-toastify';

export const ProfilePage = () => {
    const { authorizationToken } = useAuth(); // Assuming useAuth provides the authorization token

    const [profile, setProfile] = useState(null); // State to hold profile data
    const [editing, setEditing] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    useEffect(() => {
        // Fetch profile data from the API on component mount
        const getProfileById = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/profile', {
                    headers: {
                        'Authorization': authorizationToken,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch profile data');
                }

                const profileData = await response.json();
                setProfile(profileData);
                setFormData({
                    email: profileData.email || '',
                    password: '', // Clear password field
                });
            } catch (error) {
                toast.error('Error fetching profile data: ' + error.message);
            }
        };

        getProfileById();
    }, [authorizationToken]);



    const handleEdit = () => {
        setFormData({
            email: profile.email || '',
            password: '', // Clear password field
        });
        setEditing(true);
    };

    const handleCancel = () => {
        setEditing(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        updateProfile();
    };

    const updateProfile = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/profile/update/${profile._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': authorizationToken,
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to update profile');
            }

            const updatedProfileData = await response.json();
            setProfile(updatedProfileData);
            setEditing(false);
            toast.success('Profile updated successfully');
        } catch (error) {
            toast.error('Error updating profile: ' + error.message);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    if (!profile) {
        return <p>Loading...</p>; // Optional: Add a loading state or spinner while data is fetched
    }

    return (
        <>
        <div className="profile-page">
            <h2>User Profile</h2>
            <div className="profile-info">
                <div>
                    <p><strong>Username:</strong> {profile.username}</p>
                    <p><strong>Email:</strong> {profile.email}</p>
                    {editing ? (
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                            <label htmlFor="password">New Password:</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                autoComplete="new-password" // Ensure browser does not autofill password
                                required
                            />
                            <div className="form-buttons">
                                <button type="submit">Save</button>
                                <button type="button" onClick={handleCancel}>Cancel</button>
                            </div>
                        </form>
                    ) : (
                        <>
                            <button onClick={handleEdit}>Edit Profile</button>
                        </>
                    )}
                </div>
            </div>
        </div>
        </>
    );
};

