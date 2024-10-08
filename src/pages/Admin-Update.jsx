import  { useState } from 'react';
import "./EditForm.css";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

export const EditForm = () => {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Updated values:', username, email, phone, password);
    toast('Update successful');
    navigate("/admin/contacts");
  };

  return (
    <>
    <h1>Edit Form:</h1>
    <form onSubmit={handleSubmit} className="edit-form">
      <label htmlFor="username">
        Username:
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <br />
      <label htmlFor="email">
        Email:
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <br />
      <label htmlFor="phone">
        Phone:
        <input
          type="text"
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </label>
      <br />
      <label htmlFor="password">
        Password:
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <br />
      <button type="submit">Update</button>
      
    </form>
    </>
  );
};


