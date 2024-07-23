import React from 'react'

export default function CustomCombo() {
  return (
    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>UserName</th>
                                <th>DishName</th>
                                <th>Date</th>

                            </tr>
                        </thead>
                        <tbody>
                            {filteredCustomComboData.map((customcombo) => (
                                <tr key={customcombo.id}>
                                    <td>{customcombo.id}</td>
                                    <td>{customcombo.username}</td>
                                    <td>{customcombo.dishsername}</td>
                                    <td>{customcombo.date}</td>
  

                                    <td>
                                        <button
                                            className="btn btn-outline-primary"
                                            onClick={() => handleInfoClick(customcombo)}
                                            data-toggle="modal"
                                            data-target="#myModal"
                                        >
                                            <BsInfoCircle />
                                        </button>
                                        {/* <button
                                            className="btn btn-outline-warning"
                                            onClick={() => handleEdit(combo.id)}
                                        >
                                            <HiOutlinePencilSquare />
                                        </button> */}
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
  )
}
