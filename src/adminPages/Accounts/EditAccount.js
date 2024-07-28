// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchAccountsData, updateAccount } from '../../redux/Accounts/accountsSlice';

// export default function EditAccount() {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const dispatch = useDispatch();

//     const [userName, setUsername] = useState('');
//     const [userEmail, setUserEmail] = useState('');
//     const [phone, setPhone] = useState('');
//     const [status, setStatus] = useState(true); // Default to true (Active)
//     const [password, setPassword] = useState('');
//     const [showPassword, setShowPassword] = useState(false); // Initially hide password
//     const [countdown, setCountdown] = useState(0);
//     const [showWarning, setShowWarning] = useState(false);

//     const accountStatus = useSelector((state) => state.accounts.status);
//     const accountError = useSelector((state) => state.accounts.error);
//     const account = useSelector((state) => state.accounts.items.find(acc => acc.id === Number(id)));

//     useEffect(() => {
//         if (accountStatus === 'idle') {
//             dispatch(fetchAccountsData());
//         }
//     }, [accountStatus, dispatch]);

//     useEffect(() => {
//         if (account) {
//             setUsername(account.userName || '');
//             setUserEmail(account.userEmail || '');
//             setPhone(account.phone || '');
//             setStatus(account.status || true); // Assuming 'true' is the default status for Active
//             setPassword(''); // Clear password field when account changes
//         }
//     }, [account]);

//     useEffect(() => {
//         if (countdown > 0) {
//             const timer = setTimeout(() => {
//                 setCountdown(countdown - 1);
//             }, 1000);
//             return () => clearTimeout(timer);
//         } else if (countdown === 0 && showWarning) {
//             handleUpdateStatus();
//         }
//     }, [countdown, showWarning]);

//     const handleUpdateStatus = async () => {
//         try {
//             await dispatch(updateAccount({
//                 id: Number(id),
//                 userName,
//                 userEmail,
//                 phone,
//                 status,
//                 password // Include password in the update payload
//             })).unwrap();
//             navigate('/account-admin');
//         } catch (error) {
//             console.error('Error updating account:', error);
//         }
//     };

//     const handleChangeStatus = (value) => {
//         setStatus(value === 'true'); // Convert to boolean
//         setShowWarning(true);
//         setCountdown(5); // Set countdown to 5 seconds or any desired value
//     };

//     if (accountStatus === 'loading') {
//         return <p>Loading...</p>;
//     }

//     if (accountStatus === 'failed') {
//         return <p>Error: {accountError}</p>;
//     }

//     return (
//         <div className='container'>
//             <h2>Edit Account</h2>
//             {showWarning && countdown > 0 && (
//                 <div className="alert alert-warning">
//                     {`Changing status to ${status ? 'Active' : 'Banned'}. Action will be applied in ${countdown} seconds.`}
//                 </div>
//             )}
//             <form>
//                 <div className="form-group">
//                     <label>Username</label>
//                     <input
//                         type="text"
//                         className="form-control"
//                         value={userName}
//                         onChange={(e) => setUsername(e.target.value)}
//                         disabled
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label>UserEmail</label>
//                     <input
//                         type="text"
//                         className="form-control"
//                         value={userEmail}
//                         onChange={(e) => setUserEmail(e.target.value)}
//                         disabled
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label>Phone</label>
//                     <input
//                         type="text"
//                         className="form-control"
//                         value={phone}
//                         onChange={(e) => setPhone(e.target.value)}
//                         disabled
//                     />
//                 </div>
//                 <div className="form-group">
//                     <div className="input-group">
//                         <input
//                             type={"text"}
//                             className="form-control"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             disabled={accountStatus === 'loading'}
//                             hidden
//                         />

//                     </div>
//                 </div>
//                 <div className="form-group">
//                     <label>Status</label>
//                     <select
//                         className="form-control"
//                         value={status.toString()}
//                         onChange={(e) => handleChangeStatus(e.target.value)}
//                     >
//                         <option value="true">Active</option>
//                         <option value="false">Banned</option>
//                     </select>
//                 </div>
//                 <button
//                     type="button"
//                     className="btn btn-primary"
//                     onClick={handleUpdateStatus}
//                     disabled={countdown > 0}
//                 >
//                     Save Changes
//                 </button>
//             </form>
//         </div>
//     );
// }
