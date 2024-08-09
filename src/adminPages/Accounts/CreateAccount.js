import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { useNavigate } from 'react-router-dom';
import { FiSend } from 'react-icons/fi';
import { RiArrowGoBackLine } from 'react-icons/ri';
import { createAccount } from '../../redux/Accounts/accountsSlice';

export default function CreateAccount() {
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [role, setRole] = useState('User');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createAccount({ userName, userEmail, password, phone, role }));
        setUserName('');
        setUserEmail('');
        setPassword('');
        setPhone('');
        setRole('User');
        navigate('/admin-accounts'); // Navigate to the accounts list or any desired route
    };

    return (
        <div className="container">
            <h2>Create Account</h2>
            <div className="mt-3">
                <button className="btn btn-secondary" onClick={() => navigate('/admin-accounts')}><RiArrowGoBackLine /> Go Back</button>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="userName">User Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="userName"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="userEmail">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="userEmail"
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input
                        type="text"
                        className="form-control"
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="role">Role</label>
                    <select
                        className="form-control"
                        id="role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        required
                    >
                        <option value="User">User</option>
                        <option value="Admin">Admin</option>
                    </select>
                </div>

                <button type="submit" className="btn btn-primary"><FiSend /></button>
            </form>
        </div>
    );
}
