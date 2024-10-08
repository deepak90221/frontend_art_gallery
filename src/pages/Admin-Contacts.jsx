import { useState, useEffect } from 'react';
import { useAuth } from '../store/auth'; 


import './AdminContacts.css'; 

export const AdminContacts = () => {
    const { authorizationToken } = useAuth();
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);

    const getAllUsersData = async () => {
        try {
            const response = await fetch("http://localhost:8000/api/auth/user", {
                method: "GET",
                headers: {
                    Authorization: authorizationToken,
                },
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const data = await response.json();
            console.log('user data', data);
            setUsers(data);
        } catch (error) {
            console.error(error);
            setError(error.message);
        }
    };

    useEffect(() => {
        getAllUsersData();
    });
    
    if (error) {
        return <div>Error: {error}</div>;
    }

    const deleteUser = async (id) => {
        try {
            const response = await fetch(`http://localhost:8000/api/admin/user/delete/${id}`, {
                method: "DELETE", 
                headers: {
                    Authorization: authorizationToken,
                },
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
             
            
            const data = await response.json();
            console.log(`users after DELETE: ${data}`);
            getAllUsersData(); 
            
        } catch (error) {
            
            
            console.log(error);
        }
    };

    return (
        <div>
            <h1>Admin Users Panel</h1>
            {users.length > 0 ? (
                <table className="users-table">
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Password</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.phone}</td>
                                <td>{user.password}</td>
                                <td>
                                    <button onClick={() => deleteUser(user._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No users found.</p>
            )}
        </div>
    );
};
