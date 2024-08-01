import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    deleteAdminBookingItem,
    fetchBookingData,
    } from '../../redux/Restaurant/adminbookingSlice';

    export default function AdminBooking() {
    const dispatch = useDispatch();
    const bookings = useSelector((state) => state.adminbooking.items);
    const adminBookingStatus = useSelector((state) => state.adminbooking.status);
    const error = useSelector((state) => state.adminbooking.error);

    useEffect(() => {
        dispatch(fetchBookingData());
    }, [dispatch]);

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this booking?')) {
        dispatch(deleteAdminBookingItem(id));
        }
    };

    if (adminBookingStatus === 'loading') {
        return <div>Loading...</div>;
    }

    if (adminBookingStatus === 'failed') {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="admin-booking-container">
        <h2>Admin Booking Management</h2>
        <table className="table table-hover">
            <thead>
            <tr>
                <th>ID</th>
                <th>User Name</th>
                <th>Restaurant Name</th>
                <th>Menu Names</th>
                <th>Member</th>
                <th>Day Arrive</th>
                <th>Hour</th>
                <th>Status</th>
                <th>Menu IDs</th>
                <th>Pont</th>
                <th>Total</th>
                <th>Description</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody>
            {bookings.map((booking) => (
                <tr key={booking.id}>
                <td>{booking.id}</td>
                <td>{booking.user.userName}</td>
                <td>{booking.restaurant.restaurantName}</td>
                <td>
                    {booking.restaurant.menus.map((menu) => (
                    <div key={menu.id}>{menu.menuName}</div>
                    ))}
                </td>
                <td>{booking.member}</td>
                <td>{new Date(booking.dayArrive).toLocaleDateString()}</td>
                <td>{new Date(booking.hour).toLocaleTimeString()}</td>
                <td>{booking.status ? 'Active' : 'Inactive'}</td>
                <td>{booking.menuId ? booking.menuId.join(', ') : '-'}</td>
                <td>{booking.pont}</td>
                <td>{booking.total}</td>
                <td>{booking.description || '-'}</td>
                <td>
                    <button
                    className="btn btn-danger mr-2"
                    onClick={() => handleDelete(booking.id)}
                    >
                    Delete
                    </button>
                </td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    );
    }
