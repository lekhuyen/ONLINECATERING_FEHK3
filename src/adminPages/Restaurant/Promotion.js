import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Promotion() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <div className="container mt-5">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Status</th>
                                <th>QuantityTable</th>
                                <th>Price</th>
                                <th>Image</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredPromotionData.map((promotion) => (
                                <tr key={promotion.id}>
                                    <td>{promotion.id}</td>
                                    <td>{promotion.name}</td>
                                    <td>{promotion.description}</td>
                                    <td>{promotion.status}</td>
                                    <td>{promotion.quantitytable}</td>                                    
                                    <td>{promotion.price}</td>                                    
                                    <td>
                                        {promotion.imagePaths && promotion.imagePaths.length > 0 && (
                                            <img
                                                src={`http://localhost:5265${promotion.imagePaths[0]}`}
                                                alt={`Promotion ${promotion.id}`}
                                                style={{
                                                    width: "100px",
                                                    height: "100px",
                                                    objectFit: "cover",
                                                }}
                                            />
                                        )}
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-outline-primary"
                                            onClick={() => handleInfoClick(promotion)}
                                            data-toggle="modal"
                                            data-target="#myModal"
                                        >
                                            <BsInfoCircle />
                                        </button>
                                        <button
                                            className="btn btn-outline-warning"
                                            onClick={() => handleEdit(promotion.id)}
                                        >
                                            <HiOutlinePencilSquare />
                                        </button>
                                        <button
                                            className="btn btn-outline-danger"
                                            onClick={() => handleDelete(promotion.id)}
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
