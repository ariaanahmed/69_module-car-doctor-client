import { useLoaderData } from "react-router-dom";

const Checkout = () => {

    const services = useLoaderData();

    const {_id, title} = services;

    return (
        <div>
            This is checkout: {title}
            <form>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="form-control">
                        <input type="text" placeholder="email" className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <input type="text" placeholder="password" className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <input type="text" placeholder="email" className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <input type="text" placeholder="password" className="input input-bordered" />
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