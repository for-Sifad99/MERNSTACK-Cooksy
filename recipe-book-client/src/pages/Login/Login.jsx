import React, { useContext, useRef, useState } from "react";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { AuthContext } from "../../Contexts/AuthContext";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router";
import Lottie from "lottie-react";
import successAnimation from "../../assets/animations/successLottie.json";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const Login = () => {
    const { signInUser, googleSignIn, forgotPassword, setUser } = useContext(AuthContext);
    const [success, setSuccess] = useState(false);
    const emailRef = useRef();
    const location = useLocation();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    // User Login Authentication
    const handleLogin = (e) => {
        e.preventDefault();
        const form = e.target;
        const formdata = new FormData(form);
        const email = formdata.get('email');
        const password = formdata.get('password')

        // Manual validation
        if (!email) {
            toast.error("Please enter your email!");
            return;
        }
        if (!password) {
            toast.error("Please enter your password!");
            return;
        }

        // Firebase login
        signInUser(email, password)
            .then((result) => {
                const user = result.user;
                setUser(user);
                setSuccess(true);

                setTimeout(() => {
                    navigate(location.state?.from || '/');
                }, 2500);
            })
            .catch((error) => {
                if (error.code === 'auth/invalid-credential') {
                    toast.error('Invalid email or password. Please try again.');
                } else if (error.code === 'auth/user-not-found') {
                    toast.error('User not found. Please register first.');
                } else {
                    toast.error(error.message);
                }
            });
    };

    // Google Authentication Login
    const handleGoogleSignIn = () => {
        googleSignIn()
            .then((result) => {
                const user = result.user;
                setUser(user);
                navigate(location.state?.from || '/');
            })
            .catch((error) => {
                toast.error(error.message);
            });
    };

    // User reset password
    const handleReset = async (e) => {
        e.preventDefault();
        const email = emailRef.current.value;

        if (!email) {
            toast.error("Please enter your email");
            return;
        }

        try {
            forgotPassword(email);
            // Show sweet success message
            Swal.fire({
                title: 'Success!',
                text: 'We’ve sent you a reset link. Let’s check your email!',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then((result) => {
                if (result.isConfirmed) {
                    // Optional: Redirect to email (user browser must allow popups)
                    window.open('https://mail.google.com', '_blank');
                }
            });

        } catch (error) {
            toast.error(error.message || "Something went wrong!");
        }
    };


    return (
        <>
            {/* Helmet */}
            <Helmet>
                <title>Login - Cooksy</title>
                <meta name="description" content="Login to your Cooksy account to explore, save, and manage recipes." />
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
                                    Successfully Logged in!
                                </p>
                            </div>
                        </div>
                    )}

                    <h2 className="sm:text-5xl text-3xl font-bold mb-6 text-center text-[var(--color-secondary)]">
                        Login Here!
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

                    <form onSubmit={handleLogin} className="space-y-5 text-xl text-[var(--color-accent)]">
                        <div>
                            <label className="block mb-2 font-medium">
                                Email <span className="text-[var(--color-secondary)]">*</span>
                            </label>
                            <input
                                name="email"
                                type="email"
                                ref={emailRef}
                                placeholder="Enter Your Email"
                                className="w-full px-4 py-3 border border-[var(--color-secondary)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary-hover)] text-base"
                            />
                        </div>

                        <div className="relative">
                            <label className="block mb-2 font-medium" htmlFor="password">
                                Password <span className="text-[var(--color-secondary)]">*</span>
                            </label>
                            <input
                                name="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter Your Password"
                                className="w-full px-4 py-3 pr-12 border border-[var(--color-secondary)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary-hover)] text-base"
                            />
                            <div
                                className="absolute right-4 bottom-[14px] text-[var(--color-secondary)] cursor-pointer text-xl"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </div>
                        </div>

                        <div className="text-right">
                            <a onClick={handleReset} className="text-sm text-[var(--color-secondary)] hover:underline cursor-pointer">
                                Forgot Password?
                            </a>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 bg-red-400 text-white font-bold rounded-md hover:bg-red-600 transition"
                        >
                            Login
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p>
                            Don’t have an account?{" "}
                            <a href="/register" className="text-indigo-400 hover:underline font-semibold">
                                Register here
                            </a>
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Login;
