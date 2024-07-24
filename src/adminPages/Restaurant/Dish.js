import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';


export default function Dish() {

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
                            {filteredDishData.map((dish) => (
                                <tr key={dish.id}>
                                    <td>{dish.id}</td>
                                    <td>{dish.name}</td>
                                    <td>{dish.price}</td>
                                    <td>{dish.status}</td>
                                    <td>
                                        {dish.imagePaths && dish.imagePaths.length > 0 && (
                                            <img
                                                src={`http://localhost:5265${dish.imagePaths[0]}`}
                                                alt={`Dish ${dish.id}`}
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
                                            onClick={() => handleInfoClick(dish)}
                                            data-toggle="modal"
                                            data-target="#myModal"
                                        >
                                            <BsInfoCircle />
                                        </button>
                                        <button
                                            className="btn btn-outline-warning"
                                            onClick={() => handleEdit(dish.id)}
                                        >
                                            <HiOutlinePencilSquare />
                                        </button>
                                        <button
                                            className="btn btn-outline-danger"
                                            onClick={() => handleDelete(dish.id)}
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
