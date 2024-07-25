import React from 'react'

export default function Order() {
    return (
        <div className="container mt-5">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>UserId</th>
                                <th>CustomComboId</th>
                                <th>TotalPrice</th>
                                <th>QuantityTable</th>
                                <th>StatusPayment</th>
                                <th>Deposit</th>
                                <th>Oganization</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredOrderData.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.userid}</td>
                                    <td>{user.customcomboid}</td>
                                    <td>{user.totalprice}</td>
                                    <td>{user.quantitytable}</td>
                                    <td>{user.statuspayment}</td>                                    
                                    <td>{user.deposit}</td>                                    
                                    <td>{user.oganization}</td>                                    
                                    <td>
                                        <button
                                            className="btn btn-outline-primary"
                                            onClick={() => handleInfoClick(user)}
                                            data-toggle="modal"
                                            data-target="#myModal"
                                        >
                                            <BsInfoCircle />
                                        </button>
                                        <button
                                            className="btn btn-outline-warning"
                                            onClick={() => handleEdit(user.id)}
                                        >
                                            <HiOutlinePencilSquare />
                                        </button>
                                        <button
                                            className="btn btn-outline-danger"
                                            onClick={() => handleDelete(user.id)}
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
