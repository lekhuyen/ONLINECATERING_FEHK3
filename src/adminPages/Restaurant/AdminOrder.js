import React from 'react'

export default function AdminOrder() {
    return (
        <div className="container mt-5">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>UserName</th>
                                <th>ComboName</th>
                                <th>DishOrder</th>
                                <th>Promotion</th>
                                <th>TotalPrice</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* {filteredOrderData.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.userid}</td>
                                    <td>{user.username}</td>
                                    <td>{user.comboname}</td>
                                    <td>{user.dishorder}</td>
                                    <td>{user.promotion}</td>                                    
                                    <td>{user.totalprice}</td>                                    
                                
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
                            ))} */}
                        </tbody>
                    </table>
                </div>
    )
}
