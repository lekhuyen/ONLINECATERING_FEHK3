import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAdminOrderData, deleteAdminOrder } from '../../redux/Restaurant/adminorderSlice';
import { fetchUserData } from '../../redux/Restaurant/adminuserSlice';
import { FaRegTrashAlt } from 'react-icons/fa';

export default function AdminOrder() {
    const dispatch = useDispatch();
    const adminOrders = useSelector((state) => state.adminorder.adminOrders);
    const adminOrderStatus = useSelector((state) => state.adminorder.status);
    const adminOrderError = useSelector((state) => state.adminorder.error);
    const users = useSelector((state) => state.adminuser.users);
    const userStatus = useSelector((state) => state.adminuser.status);
    const userError = useSelector((state) => state.adminuser.error);

    useEffect(() => {
        dispatch(fetchAdminOrderData());
        dispatch(fetchUserData());
    }, [dispatch]);

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this order?')) {
            dispatch(deleteAdminOrder(id));
        }
    };

    if (adminOrderStatus === 'loading' || userStatus === 'loading') {
        return <div>Loading...</div>;
    }

    if (adminOrderStatus === 'failed' || userStatus === 'failed') {
        return <div>Error: {adminOrderError || userError}</div>;
    }

    // Create a map of users for easy lookup
    const userMap = users.reduce((acc, user) => {
        acc[user.id] = user.userName; // Map user id to userName
        return acc;
    }, {});

    return (
        <div className="container mt-5">
            <h2>Admin Order Table</h2>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>User Name</th>
                        <th>Total Price</th>
                        <th>Quantity Table</th>
                        <th>Status Payment</th>
                        <th>Deposit</th>
                        <th>Promotion Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {adminOrders.map(order => (
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{userMap[order.userId] || 'Unknown'}</td> {/* Display the user name */}
                            <td>{order.totalPrice}</td>
                            <td>{order.quantityTable}</td>
                            <td>{order.statusPayment ? 'Paid' : 'Pending'}</td>
                            <td>{order.deposit}</td>
                            <td>{order.promotion ? order.promotion.promotionName : 'N/A'}</td>
                            <td>
                                <button
                                    className="btn btn-outline-danger"
                                    onClick={() => handleDelete(order.id)}
                                >
                                    <FaRegTrashAlt />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
