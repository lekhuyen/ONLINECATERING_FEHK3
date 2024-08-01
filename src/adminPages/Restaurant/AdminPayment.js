import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function AdminPayment() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <div className="container mt-5">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>TotalPrice</th>
                                <th>Method</th>
                                <th>Date</th>
                                <th>Type</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredPaymentData.map((payment) => (
                                <tr key={payment.id}>
                                    <td>{payment.id}</td>
                                    <td>{payment.name}</td>
                                    <td>{payment.totalPrice}</td>
                                    <td>{payment.method}</td>
                                    <td>{payment.date}</td>
                                    <td>{payment.type}</td>
                                    <td>
                                        <button
                                            className="btn btn-outline-primary"
                                            onClick={() => handleInfoClick(payment)}
                                            data-toggle="modal"
                                            data-target="#myModal"
                                        >
                                            <BsInfoCircle />
                                        </button>
                                        <button
                                            className="btn btn-outline-warning"
                                            onClick={() => handleEdit(payment.id)}
                                        >
                                            <HiOutlinePencilSquare />
                                        </button>
                                        <button
                                            className="btn btn-outline-danger"
                                            onClick={() => handleDelete(payment.id)}
                                        >
                                            <FaRegTrashAlt />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
    )
}
