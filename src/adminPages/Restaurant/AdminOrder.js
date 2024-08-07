import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteAdminOrder, fetchAdminOrderData } from '../../redux/Restaurant/adminorderSlice';
import { fetchUserData } from '../../redux/Restaurant/adminuserSlice';
import { FaRegTrashAlt } from 'react-icons/fa';
import { BsInfoCircle } from 'react-icons/bs';
import styles from './AdminOrder.module.scss';

export default function AdminOrder() {
    const dispatch = useDispatch();
    const adminOrders = useSelector((state) => state.adminorder.adminOrders);
    const adminOrderStatus = useSelector((state) => state.adminorder.status);
    const adminOrderError = useSelector((state) => state.adminorder.error);
    const users = useSelector((state) => state.adminuser.users);
    const userStatus = useSelector((state) => state.adminuser.status);
    const userError = useSelector((state) => state.adminuser.error);

    const [showDetailModal, setShowDetailModal] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        dispatch(fetchAdminOrderData());
        dispatch(fetchUserData());
    }, [dispatch]);

    const handleShowDetails = (order) => {
        setSelectedOrder(order);
        setShowDetailModal(true);
    };

    if (adminOrderStatus === 'loading' || userStatus === 'loading') {
        return <div>Loading...</div>;
    }

    if (adminOrderStatus === 'failed' || userStatus === 'failed') {
        return <div>Error: {adminOrderError || userError}</div>;
    }

    return (
        <div className={`container mt-5 ${styles.container}`}>
            <h2>Admin Order Table</h2>
            <table className={`table table-hover ${styles.table}`}>
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
                            <td>{order.Username || 'Unknown'}</td>
                            <td>{order.totalPrice}</td>
                            <td>{order.quantityTable}</td>
                            <td>{order.statusPayment ? 'Paid' : 'Pending'}</td>
                            <td>{order.deposit}</td>
                            <td>{order.promotion ? order.promotion.promotionName : 'N/A'}</td>
                            <td>
                                <button
                                    className="btn btn-outline-primary"
                                    onClick={() => handleShowDetails(order)}
                                >
                                    <BsInfoCircle />
                                </button>
                                <button
                                    className="btn btn-outline-danger"
                                    onClick={() => dispatch(deleteAdminOrder(order.id))}
                                >
                                    <FaRegTrashAlt />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal for Order Details */}
            {showDetailModal && selectedOrder && (
                <div className={`modal fade show ${styles.modal}`} tabIndex="-1" role="dialog" style={{ display: 'block' }}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Order Details</h5>
                                <button type="button" className="btn-close" onClick={() => setShowDetailModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <h5>Appetizers:</h5>
                                {selectedOrder.getOrderAppetizers?.$values.map(appetizer => (
                                    <div key={appetizer.appetizer.name}>
                                        <p>Appetizer Name: {appetizer.appetizer.name}</p>
                                        <p>Appetizer Price: {appetizer.appetizer.price}</p>
                                        <img src={appetizer.appetizer.image} alt={appetizer.appetizer.name} />
                                    </div>
                                ))}
                                <h5>Desserts:</h5>
                                {selectedOrder.getOrderDesserts?.$values.map(dessert => (
                                    <div key={dessert.dessert.name}>
                                        <p>Dessert Name: {dessert.dessert.name}</p>
                                        <p>Dessert Price: {dessert.dessert.price}</p>
                                        <img src={dessert.dessert.image} alt={dessert.dessert.name} />
                                    </div>
                                ))}
                                <h5>Dishes:</h5>
                                {selectedOrder.getOrderDishes?.$values.map(dish => (
                                    <div key={dish.dishDTO.name}>
                                        <p>Dish Name: {dish.dishDTO.name}</p>
                                        <p>Dish Price: {dish.dishDTO.price}</p>
                                        <img src={dish.dishDTO.image} alt={dish.dishDTO.name} />
                                    </div>
                                ))}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-danger" onClick={() => setShowDetailModal(false)}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
