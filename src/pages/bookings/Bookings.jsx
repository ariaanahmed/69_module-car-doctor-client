import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProviders";
import BookingRow from "./BookingRow";

const Bookings = () => {

    const { user } = useContext(AuthContext);
    const [booking, setBookings] = useState([]);

    const url = `http://localhost:5000/bookings?email=${user?.email}`;
    useEffect(() => {
        fetch(url)
            .then((res) => res.json())
            .then((data) => setBookings(data))
    }, [url])

    const handleDelete = (id) => {
        const proceed = confirm('Are you sure?');
        if (proceed) {
            fetch(`http://localhost:5000/bookings/${id}`, {
                method: 'delete',
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data)
                    if (data.deletedCount > 0) {
                        alert('deleted successfully');
                        const remaining = booking.filter(booking => booking._id !== id);
                        setBookings(remaining)
                    }
                })
        }
    }

    const handleBookingConfirm = (id) => {
        fetch(`http://localhost:5000/bookings/${id}`, {
            method: 'PATCH',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ status: 'confirm' })
        }).then((res) => res.json())
            .then((data) => {
                console.log(data)
                if (data.modifiedCount > 0) {
                    // update state
                    const remaining = booking.filter((bk) => bk._id !== id);
                    const updated = booking.find((bk) => bk._id === id);
                    updated.status = 'confirm';
                    const newBookings = [updated, ...remaining];
                    setBookings(newBookings);
                }
            })
    }

    return (
        <div>
            <h3>bookings {booking.length}</h3>

            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>
                            <th>Profile Picture</th>
                            <th>Service</th>
                            <th>Date</th>
                            <th>Price</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            booking.map((bookin) => <BookingRow
                                key={bookin._id}
                                bookin={bookin}
                                handleDelete={handleDelete}
                                handleBookingConfirm={handleBookingConfirm}
                            ></BookingRow>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Bookings;