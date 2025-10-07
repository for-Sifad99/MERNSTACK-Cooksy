import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../../Contexts/AuthContext";
import { toast } from 'react-toastify';
import Lottie from "lottie-react";
import successAnimation from "../../assets/animations/successLottie.json";
import { Helmet } from "react-helmet-async";
import { FaGoogle } from "react-icons/fa";


const Register = () => {
    const { createUser, googleSignIn, setUser } = useContext(AuthContext);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        const form = e.target;
        const formdata = new FormData(form);
        const name = formdata.get('name');
        const photo = formdata.get('photoURL');
        const email = formdata.get('email');
        const password = formdata.get('password');

        if (!name || !photo || !email || !password) {
            toast.warning("Please fill in all fields! 🛑");
            return;
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            toast.error("Please enter a valid email!");
            return;
        }

        const validatePassword = (password) => {
            if (password.length < 6) return "Password must be at least 6 characters!";
            if (!/[A-Z]/.test(password)) return "Include at least one uppercase letter!";
            if (!/[a-z]/.test(password)) return "Include at least one lowercase letter!";
            if (!/[0-9]/.test(password)) return "Include at least one number!";
            if (!/[!@#$%^&*]/.test(password)) return "Include at least one special character!";
            return null;
        };
        const passwordError = validatePassword(password);
        if (passwordError) {
            toast.error(passwordError);
            return;
        }

        createUser(email, password)
            .then((result) => {
                const user = result.user;
                setUser(user);
                setSuccess(true);

                setTimeout(() => {
                    navigate(location.state?.from || '/');
                }, 2000);
            })
            .catch((err) => {
                toast.error(`Registration failed: ${err.message}`);
            });
    };


    // Google authentication sign up
    const handleGoogleSignIn = () => {
        googleSignIn()
            .then((result) => {
                const user = result.user;
                setUser(user);
                setSuccess(true);
                setTimeout(() => {
                    setSuccess(false);  // hide animation before redirect
                    navigate('/');
                }, 2000);
            })
            .catch((err) => toast.error(err.message));
    };


    return (
        <>
            {/* Helmet */}
            <Helmet>
                <title>Register - Cooksy</title>
                <meta name="description" content="Join Cooksy today and start your cooking journey with ease!" />
            </Helmet>

            <section className="py-8 md:py-14">
                <div className="relative max-w-xl sm:mx-auto mx-6 p-8 rounded-lg drop-shadow-xl shadow-[var(--color-accent)] border border-[var(--color-base-200)]">

                    {success && (
                        <div
                            className="absolute inset-0 bg-transparent bg-opacity-20 backdrop-blur-sm z-40"
                            aria-modal="true"
                            role="dialog"
                        >
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg p-6 flex flex-col items-center max-w-sm bg-opacity-0">

                                <Lottie
                                    animationData={successAnimation}
                                    loop={false}
                                    style={{ height: 250, width: 250 }}
                                />
                                <p className="text-green-600 font-bold mt-4 text-center">
                                    Successfully Registered!
                                </p>
                            </div>
                        </div>
                    )}

                    <h2 className="sm:text-6xl text-3xl font-bold mb-6 text-center text-[var(--color-secondary)]">
                        Register Now!
                    </h2>

                    <div className="sm:mt-10 sm:mb-5 mb-2 text-center mx-auto flex items-center justify-center">
                        <button
                            onClick={handleGoogleSignIn}
                            type="button"
                            className="w-full max-w-xs sm:max-w-md md:max-w-[70%] inline-flex items-center justify-center gap-2 px-6 py-2 border border-gray-300 rounded-full hover:bg-[var(--color-secondary-light)] hover:text-[var(--color-secondary)] transition font-semibold text-sm sm:text-base"
                        >
                            {/* Google Icon */}
                            <FaGoogle className="text-[var(--color-secondary)] text-xl" />
                            Continue with Google
                        </button>
                    </div>

                    <p className="border-b-2 text-center text-[var(--color-accent)] font-bold text-xl mb-10">OR</p>
                    <form onSubmit={handleRegister} className="space-y-5 text-xl text-[var(--color-accent)]">
                        <div>
                            <label className="block mb-2 font-medium">
                                Name <span className="text-[var(--color-secondary)]">*</span>
                            </label>
                            <input
                                name="name"
                                type="text"
                                placeholder="Enter Your Name"
                                className="w-full px-4 py-3 border border-[var(--color-secondary)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary-hover)] text-base"
                            />
                        </div>

                        <div>
                            <label className="block mb-2 font-medium">
                                Email <span className="text-red-500">*</span>
                            </label>
                            <input
                                name="email"
                                type="email"
                                placeholder="Enter Your Email"
                                className="w-full px-4 py-3 border border-[var(--color-secondary)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary-hover)] text-base"
                            />
                        </div>

                        <div>
                            <label className="block mb-2 font-medium" >
                                Photo URL
                            </label>
                            <input
                                name="photoURL"
                                type="text"
                                placeholder="Give Your Photo URL"
                                className="w-full px-4 py-3 border border-[var(--color-secondary)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary-hover)] text-base"
                            />
                        </div>

                        <div>
                            <label className="block mb-2 font-medium" >
                                Password <span className="text-red-500">*</span>
                            </label>
                            <input
                                name="password"
                                type="password"
                                placeholder="Enter A Password"
                                className="w-full px-4 py-3 border border-[var(--color-secondary)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary-hover)] text-base"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 bg-red-400 text-white font-bold rounded-md hover:bg-red-600 transition"
                        >
                            Register
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p>
                            Already have an account?{" "}
                            <a href="/login" className="text-indigo-400 hover:underline font-semibold">
                                Login here
                            </a>
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Register;
