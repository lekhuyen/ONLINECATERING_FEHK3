import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';


export default function Combo() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <div className="container mt-5">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Status</th>
                                <th>Image</th>
                                <th>Type</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredComboData.map((combo) => (
                                <tr key={combo.id}>
                                    <td>{combo.id}</td>
                                    <td>{combo.name}</td>
                                    <td>{combo.price}</td>
                                    <td>{combo.status}</td>
                                    <td>
                                        {combo.imagePaths && combo.imagePaths.length > 0 && (
                                            <img
                                                src={`http://localhost:5265${combo.imagePaths[0]}`}
                                                alt={`Combo ${combo.id}`}
                                                style={{
                                                    width: "100px",
                                                    height: "100px",
                                                    objectFit: "cover",
                                                }}
                                            />
                                        )}
                                    </td>
                                    <td>{combo.type}</td>
                                    <td>
                                        <button
                                            className="btn btn-outline-primary"
                                            onClick={() => handleInfoClick(combo)}
                                            data-toggle="modal"
                                            data-target="#myModal"
                                        >
                                            <BsInfoCircle />
                                        </button>
                                        <button
                                            className="btn btn-outline-warning"
                                            onClick={() => handleEdit(combo.id)}
                                        >
                                            <HiOutlinePencilSquare />
                                        </button>
                                        <button
                                            className="btn btn-outline-danger"
                                            onClick={() => handleDelete(combo.id)}
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
