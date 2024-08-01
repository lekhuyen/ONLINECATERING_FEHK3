import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAdminOrderData, deleteAdminOrder } from '../../redux/Restaurant/adminorderSlice';
import { FaRegTrashAlt } from 'react-icons/fa';

export default function AdminOrder() {
    const dispatch = useDispatch();
    const adminOrders = useSelector((state) => state.adminorder.adminOrders);
    const adminOrderStatus = useSelector((state) => state.adminorder.status);
    const error = useSelector((state) => state.adminorder.error);

    useEffect(() => {
        dispatch(fetchAdminOrderData());
    }, [dispatch]);

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this order?')) {
            dispatch(deleteAdminOrder(id));
        }
    };

    if (adminOrderStatus === 'loading') {
        return <div>Loading...</div>;
    }

    if (adminOrderStatus === 'failed') {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="container mt-5">
            <h2>Admin Order Table</h2>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Promotion Name</th>
                        <th>Total Price</th>
                        <th>Quantity Table</th>
                        <th>Status Payment</th>
                        <th>Organization</th>
                        <th>Deposit</th>
                        <th>Payment</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {adminOrders.map(order => (
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{order.promotion ? order.promotion.promotionName : 'N/A'}</td>
                            <td>{order.totalPrice}</td>
                            <td>{order.quantityTable}</td>
                            <td>{order.statusPayment ? 'Paid' : 'Pending'}</td>
                            <td>{order.organization}</td>
                            <td>{order.deposit}</td>
                            <td>{order.payment ? 'Paid' : 'Pending'}</td>
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
