import { Link, useLocation, useNavigate } from "react-router-dom";
import image from "../../assets/images/login/login.svg"
import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProviders";

const Login = () => {
    const [message, setMessage] = useState('')
    const { signIn } = useContext(AuthContext);
    const location = useLocation();

    const from = location.state?.from?.pathname || '/';

    const navigate = useNavigate()

    const handleLogin = (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;

        signIn(email, password).then((result) => {
            const user = result.user;
            const loggedUser = {
                email: user.email
            }
            console.log(loggedUser)

            form.reset()
            setMessage('logged in successfully')
            fetch('http://localhost:5000/jwt', {
                method: 'POST',
                headers: {
                    'content-type' : 'application/json'
                },
                body: JSON.stringify(loggedUser)
            }).then((res) => res.json()).then((data) => {
                console.log('jwt response', data)
                // warning: local storage not best place
                localStorage.setItem('car-access-token', data.token)
                navigate(from, {replace: true})
            })
            .catch((error) => {
                console.log(error)
            })
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
                        <h1 className="text-4xl text-center font-bold">Login</h1>
                        <form className="space-y-5" onSubmit={handleLogin}>
                            <div className="form-control">
                                <input type="email" name="email" placeholder="Email" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <input type="password" name="password" placeholder="Password" className="input input-bordered" />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <input className="btn btn-primary" type="submit" value="Login" />
                            </div>
                        </form>
                        <p className="my-4 text-center">New to cardoctor? <Link className="text-orange-600 font-semibold" to="/signup">Sign Up</Link></p>
                        <p><small>{message}</small></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;