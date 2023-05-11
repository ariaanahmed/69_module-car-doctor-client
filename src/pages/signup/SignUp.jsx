import { Link } from "react-router-dom";
import image from "../../assets/images/login/login.svg"
import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProviders";

const SignUp = () => {

    const [message, setMessage] = useState([])

    const {createUser} = useContext(AuthContext)

    const hanldeSignUp = (event) => {
        event.preventDefault();
        const form = event.target;

        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;

        console.log(name, email, password)

        createUser(email, password).then((result) => {
            const createdUser = result.user;
            console.log(createdUser);
            form.reset();
            setMessage('Signed up successfully!')
        }).catch((error) => {
            setMessage(error.message)
        })
    }

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row">
                <div className="w-1/2 mr-10">
                    <img src={image} alt="login-page-image" />
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div className="card-body">
                        <h1 className="text-4xl text-center font-bold">Sign Up</h1>
                        <form className="space-y-5" onSubmit={hanldeSignUp}>
                            <div className="form-control">
                                <input type="text" name="name" required placeholder="Name" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <input type="email" name="email" required placeholder="Email" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <input type="password" name="password" required placeholder="Password" className="input input-bordered" />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <input className="btn btn-primary" type="submit" value="Sign Up" />
                            </div>
                        </form>
                        <p className="my-4 text-center">Already Have an account <Link className="text-orange-600 font-semibold" to="/login">Login</Link></p>
                        <p><small>{message}</small></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;