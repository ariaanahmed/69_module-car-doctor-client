import { useEffect, useState } from "react";
import ServiceCard from "./ServiceCard";

const Services = () => {

    const [services, setServices] = useState([])

    useEffect(() => {
        fetch('http://localhost:5000/services')
            .then((res) => res.json())
            .then((data) => setServices(data))
            .catch((error) => {
                console.log(error)
            })
    }, [])

    return (
        <div className="mt-5">
            <div className="text-center space-y-3">
                <h2 className="text-2xl text-orange-600 font-bold uppercase text-center">Our Service {services.length} </h2>
                <h2 className="text-5xl font-bold capitalize text-center">Our Service Area</h2>
                <h2 className="text-gray-600">the majority have suffered alteration in some form, by injected humour, or randomised
                    <br />
                    words which dont look even slightly believable</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {
                    services.map((service) => <ServiceCard
                        key={service._id}
                        service={service}
                    ></ServiceCard>)
                }
            </div>
        </div>
    );
};

export default Services;