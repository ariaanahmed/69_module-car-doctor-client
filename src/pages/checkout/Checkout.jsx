import { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProviders";
import Swal from 'sweetalert2'


const Checkout = () => {

    const {user} = useContext(AuthContext)
    const checkOutService = useLoaderData()
    const {title, _id, price, img} = checkOutService;

    const handleBookingService = (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const date = form.date.value;
        const email = user?.email;

        const booking = {
            customerName: name,
            email,
            date,
            service_id: _id,
            service: title,
            price: price,
        }

        fetch('https://car-doctor-server-ariaanahmed.vercel.app/bookings', {
            method: 'post',
            headers: {
                'content-type' : 'application/json'
            },
            body: JSON.stringify(booking)
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                if(data.insertedId){
                    Swal.fire({
                        title: 'order placed!',
                        text: 'Do you want to continue',
                        icon: 'success',
                        confirmButtonText: 'Okay'
                      })
                }
            }).catch((error) => {
                console.log(error)
            })
    }

    return (
        <div>
            <h2 className="text-center font-semibold py-5 text-3xl">Book services {title}</h2>
            <form onSubmit={handleBookingService}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="form-control">
                        <input type="text" placeholder="Name" name="name" defaultValue={user?.displayName} className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <input type="date" name="date" className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <input type="email" placeholder="Email" defaultValue={user?.email} className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <input type="text" placeholder="Due amount" name="price" defaultValue={price} className="input input-bordered" />
                    </div>
                </div>
                <div className="form-control mt-6">
                    <input className="btn btn-primary btn-block" type="submit" value="corfirm order" />
                </div>
            </form>
        </div>
    );
};

export default Checkout;