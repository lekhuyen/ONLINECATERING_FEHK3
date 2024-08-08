import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAdminOrderData } from '../../redux/Restaurant/adminorderSlice';
import { fetchUserData } from '../../redux/Restaurant/adminuserSlice';
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
    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 5; // Number of orders per page

    useEffect(() => {
        dispatch(fetchAdminOrderData());
        dispatch(fetchUserData());
    }, [dispatch]);

    const handleShowDetails = (order) => {
        setSelectedOrder(order);
        setShowDetailModal(true);
    };

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    if (adminOrderStatus === 'loading' || userStatus === 'loading') {
        return <div>Loading...</div>;
    }

    if (adminOrderStatus === 'failed' || userStatus === 'failed') {
        return <div>Error: {adminOrderError || userError}</div>;
    }

    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = adminOrders.slice(indexOfFirstOrder, indexOfLastOrder);
    const pageNumbers = Math.ceil(adminOrders.length / ordersPerPage);

    // Calculate total deposit received
    const totalDepositReceived = adminOrders.reduce((total, order) => total + order.deposit, 0);

    return (
        <div className={`container mt-5 ${styles.container}`}>
            <h2>User Order Management</h2>
            <table className={`table table-hover ${styles.table}`}>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>User Name</th>
                        <th>Total Price</th>
                        <th>Quantity Table</th>
                        <th>Status Payment</th>
                        <th>Deposit</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {currentOrders.map(order => (
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{order.user.userName || 'Unknown'}</td>
                            <td>{order.totalPrice}</td>
                            <td>{order.quantityTable}</td>
                            <td>{order.statusPayment ? 'Paid' : 'Pending'}</td>
                            <td>{order.deposit}</td>
                            <td>
                                <button
                                    className="btn btn-outline-primary"
                                    onClick={() => handleShowDetails(order)}
                                >
                                    <BsInfoCircle />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal for Order Confirmation */}
            {showDetailModal && selectedOrder && (
                <div className={`${styles.modal} ${showDetailModal ? styles.show : ''}`} id="orderModal" tabIndex="-1" role="dialog" aria-labelledby="orderModalLabel" aria-hidden={!showDetailModal}>
                    <div className={`${styles.modalDialog}`} role="document">
                        <div className={`${styles.modalContent}`}>
                            <div className={`${styles.modalHeader}`}>
                                <h5 className={`${styles.modalTitle}`} id="orderModalLabel">Order Details (ID: {selectedOrder.id})</h5>
                                <button type="button" className={`${styles.close}`} onClick={() => setShowDetailModal(false)} aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className={`${styles.modalBody}`}>
                                <h5>User Information</h5>
                                <p><strong>Name:</strong> {selectedOrder.user.userName}</p>
                                <p><strong>Email:</strong> {selectedOrder.user.userEmail || 'N/A'}</p>
                                <p><strong>Phone:</strong> {selectedOrder.user.phone || 'N/A'}</p>

                                <h5>Order Summary</h5>
                                <p><strong>Total Price:</strong> {selectedOrder.totalPrice}</p>
                                <p><strong>Deposit:</strong> {selectedOrder.deposit}</p>
                                <p><strong>Status Payment:</strong> {selectedOrder.statusPayment ? 'Paid' : 'Pending'}</p>
                                
                                {selectedOrder.combo && (
                                    <div>
                                        <h5>Combo Details</h5>
                                        <p><strong>Name:</strong> {selectedOrder.combo.name || 'N/A'}</p>
                                        <p><strong>Price:</strong> {selectedOrder.combo.price || 'N/A'}</p>
                                        {selectedOrder.combo.image && (
                                            <img src={selectedOrder.combo.image} alt={selectedOrder.combo.name} className={styles.itemImage} />
                                        )}
                                    </div>
                                )}
                                
                                <h5>Items Ordered</h5>
                                {selectedOrder.getOrderAppetizers?.$values.length > 0 && (
                                    <>
                                        <h6>Appetizers:</h6>
                                        {selectedOrder.getOrderAppetizers.$values.map(appetizer => (
                                            <div key={appetizer.appetizer.id}>
                                                <p><strong>Name:</strong> {appetizer.appetizer.name}</p>
                                                <p><strong>Price:</strong> {appetizer.appetizer.price}</p>
                                                <img src={appetizer.appetizer.image} alt={appetizer.appetizer.name} className={styles.itemImage} />
                                            </div>
                                        ))}
                                    </>
                                )}

                                {selectedOrder.getOrderDesserts?.$values.length > 0 && (
                                    <>
                                        <h6>Desserts:</h6>
                                        {selectedOrder.getOrderDesserts.$values.map(dessert => (
                                            <div key={dessert.dessert.id}>
                                                <p><strong>Name:</strong> {dessert.dessert.name}</p>
                                                <p><strong>Price:</strong> {dessert.dessert.price}</p>
                                                <img src={dessert.dessert.image} alt={dessert.dessert.name} className={styles.itemImage} />
                                            </div>
                                        ))}
                                    </>
                                )}

                                {selectedOrder.getOrderDishes?.$values.length > 0 && (
                                    <>
                                        <h6>Dishes:</h6>
                                        {selectedOrder.getOrderDishes.$values.map(dish => (
                                            <div key={dish.dishDTO.id}>
                                                <p><strong>Name:</strong> {dish.dishDTO.name}</p>
                                                <p><strong>Price:</strong> {dish.dishDTO.price}</p>
                                                <img src={dish.dishDTO.image} alt={dish.dishDTO.name} className={styles.itemImage} />
                                            </div>
                                        ))}
                                    </>
                                )}
                            </div>
                            <div className={`${styles.modalFooter}`}>
                                <button type="button" className="btn btn-danger" onClick={() => setShowDetailModal(false)}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Pagination */}
            <nav>
                <ul className="pagination">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={() => paginate(currentPage - 1)}>Previous</button>
                    </li>
                    {Array.from({ length: pageNumbers }, (_, index) => (
                        <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                            <button className="page-link" onClick={() => paginate(index + 1)}>
                                {index + 1}
                            </button>
                        </li>
                    ))}
                    <li className={`page-item ${currentPage === pageNumbers ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={() => paginate(currentPage + 1)}>Next</button>
                    </li>
                </ul>
            </nav>

            {/* Total Deposit Received */}
            <div className="mt-3">
                <strong>Total Deposit Received:</strong> {totalDepositReceived}
            </div>

        </div>
    );
}
