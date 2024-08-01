import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaRegTrashAlt } from 'react-icons/fa';
import { BsInfoCircle } from 'react-icons/bs';
import { deleteCustomCombo, fetchCustomComboData } from '../../redux/Restaurant/customComboSlice';

export default function CustomCombo() {
    const dispatch = useDispatch();
    const customComboData = useSelector((state) => state.customCombo.customCombos);
    const comboStatus = useSelector((state) => state.customCombo.status);
    const error = useSelector((state) => state.customCombo.error);

    useEffect(() => {
        dispatch(fetchCustomComboData());
    }, [dispatch]);

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this custom combo?')) {
            dispatch(deleteCustomCombo(id));
        }
    };

    if (comboStatus === 'loading') {
        return <div>Loading...</div>;
    }

    if (comboStatus === 'failed') {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="container mt-5">
            <h2>Custom Combo Table</h2>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>User Name</th>
                        <th>Dish Name</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {customComboData.map((customcombo) => (
                        <tr key={customcombo.id}>
                            <td>{customcombo.id}</td>
                            <td>{customcombo.userName}</td>
                            <td>{customcombo.dishName}</td>
                            <td>{new Date(customcombo.date).toLocaleDateString()}</td>
                            <td>
                                <button
                                    className="btn btn-outline-primary"
                                    onClick={() => handleDelete(customcombo.id)}
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
