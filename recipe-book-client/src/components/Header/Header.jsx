import { Link, NavLink, useLocation } from "react-router";
import { FaUtensils, FaUserPlus, FaBars, FaTimes } from "react-icons/fa";
import { IoMdLogIn } from "react-icons/io";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../Contexts/AuthContext";
import UserProfile from "../UserProfile/UserProfile";

const Header = () => {
    const { user } = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const [isDark, setIsDark] = useState(() => {
        return localStorage.getItem('theme') === 'dark';
    });

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDark]);

    const toggleTheme = () => {
        setIsDark(prev => !prev);
    };

    // for anywhere click nav menu will be close
    useEffect(() => {
        setIsOpen(false);
    }, [location.pathname]);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsOpen(false);
            }
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Navbar links active style here
    const navLinkStyle = ({ isActive }) =>
        `font-semibold px-4 lg:py-2 py-1 rounded-full transition-all duration-200
        ${isActive ? "bg-[var(--color-secondary-light)] text-[var(--color-secondary)]" : "text-[var(--color-accent)] hover:bg-[var(--color-secondary-light)] hover:text-[var(--color-secondary)]"}`;

    // Navbar register icon active style here
    const activeRegisterStyle = ({ isActive }) =>
        `lg:text-2xl text-4xl hover:text-[var(--color-secondary)] transition ${isActive ? "text-[var(--color-secondary)]" : "text-[var(--color-primary)]"}`;

    // Navbar login icon active style here
    const activeLoginStyle = ({ isActive }) =>
        `group font-semibold text-black bg-[var(--color-btn-bg)] md:px-6 px-7 py-2 text-lg md:text-base rounded-full hover:bg-[var(--color-secondary)] hover:text-black transition ${isActive ? "bg-[var(--color-secondary)]" : ""}`;

    const navLinks = (
        <>
            <NavLink to="/" className={navLinkStyle}>
                Home
            </NavLink>
            <NavLink to="/all-recipes" className={navLinkStyle}>
                All Recipes
            </NavLink>
            {user && <NavLink to="/add-recipe" className={navLinkStyle}>
                Add Recipe
            </NavLink>}
            {user && <NavLink to="/my-recipes" className={navLinkStyle}>
                My Recipes
            </NavLink>}
            <NavLink to="/blogs" className={navLinkStyle}>
                Blogs
            </NavLink>
        </>
    );

    return (
        <nav className="px-4 py-3 md:px-10 xl:px-24 lg:py-5">
            <div className="flex items-center">
                {/* Logo */}
                <Link to="/" className="sm:text-4xl text-3xl font-bold text-[var(--color-primary)] flex items-center sm:gap-2">
                    <FaUtensils className="text-[var(--color-secondary)]" />
                    <strong><span className='-rotate-16 inline-block sm:text-5xl text-4xl'>ｃ</span><span className="text-[var(--color-secondary)]">oo</span>ksy</strong>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden lg:flex items-start text-xl sm:text-2xl md:text-xs xl:text-sm lg:gap-2 xl:ml-10 md:ml-8 mr-auto">
                    {navLinks}
                </div>

                {/* Desktop Right Side */}
                <div className="hidden lg:flex items-center gap-4">
                    {/* Theme Toggle */}
                    <label className="toggle text-base-content bg-white">
                        <input
                            type="checkbox"
                            onChange={toggleTheme}
                            checked={isDark}
                            className="theme-controller"
                        />
                        <svg
                            aria-label="sun"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                        >
                            <g
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                strokeWidth="2"
                                fill="none"
                                stroke="currentColor"
                            >
                                <circle cx="12" cy="12" r="4"></circle>
                                <path d="M12 2v2"></path>
                                <path d="M12 20v2"></path>
                                <path d="m4.93 4.93 1.41 1.41"></path>
                                <path d="m17.66 17.66 1.41 1.41"></path>
                                <path d="M2 12h2"></path>
                                <path d="M20 12h2"></path>
                                <path d="m6.34 17.66-1.41 1.41"></path>
                                <path d="m19.07 4.93-1.41 1.41"></path>
                            </g>
                        </svg>
                        <svg
                            aria-label="moon"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                        >
                            <g
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                strokeWidth="2"
                                fill="none"
                                stroke="currentColor"
                            >
                                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
                            </g>
                        </svg>
                    </label>

                    {user?.email ? (
                        // User logged in => Show profile picture
                        <UserProfile />
                    ) : (
                        // User not logged in => Show Login and Register buttons
                        <>
                            <NavLink to="/register" className={activeRegisterStyle}>
                                <FaUserPlus />
                            </NavLink>

                            <NavLink
                                to="/login"
                                className={activeLoginStyle}
                            >
                                <span className="flex items-center gap-1">
                                    Login
                                    <strong className="transition-transform duration-300 group-hover:translate-x-1">
                                        <IoMdLogIn />
                                    </strong>
                                </span>
                            </NavLink>
                        </>
                    )}
                </div>

                {/* Mobile Hamburger + Theme Toggle */}
                <div className="lg:hidden flex items-center gap-2 ml-auto">
                    {user?.email && <UserProfile />}

                    <button
                        className="text-2xl text-[var(--color-primary)] cursor-pointer"
                        onClick={() => setIsOpen(true)}
                    >
                        <FaBars />
                    </button>
                </div>
            </div>

            {/* Backdrop */}
            {isOpen && (
                <div
                    onClick={() => setIsOpen(false)}
                    className="fixed inset-0 bg-opacity-20 z-50"
                ></div>
            )}

            {/* Mobile Menu */}
            <div
                className={`fixed top-0 right-0 h-screen max-w-[300px] w-full max-full bg-[var(--color-bg)] z-50 transform transition-transform duration-300
                ${isOpen ? "translate-x-0" : "translate-x-full"}`}
            >
                <div className="px-6 py-4 h-full flex flex-col justify-between">
                    <div>
                        <div className="flex justify-between items-center mb-6">
                            <Link to='/' className="text-2xl font-bold text-[var(--color-primary)] flex items-center gap-2">
                                <FaUtensils className="text-[var(--color-secondary)]" />
                                <strong><span className='-rotate-16 inline-block text-4xl'>ｃ</span><span className="text-[var(--color-secondary)]">oo</span>ksy</strong>
                            </Link>

                            <div className="flex items-center gap-2">
                                {/* Theme Toggle */}
                                <label className="toggle text-base-content bg-white">
                                    <input onClick={toggleTheme} type="checkbox" value="synthwave" className="theme-controller" />
                                    <svg aria-label="sun" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                        <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor">
                                            <circle cx="12" cy="12" r="4"></circle>
                                            <path d="M12 2v2"></path>
                                            <path d="M12 20v2"></path>
                                            <path d="m4.93 4.93 1.41 1.41"></path>
                                            <path d="m17.66 17.66 1.41 1.41"></path>
                                            <path d="M2 12h2"></path>
                                            <path d="M20 12h2"></path>
                                            <path d="m6.34 17.66-1.41 1.41"></path>
                                            <path d="m19.07 4.93-1.41 1.41"></path>
                                        </g>
                                    </svg>
                                    <svg aria-label="moon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                        <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor">
                                            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
                                        </g>
                                    </svg>
                                </label>
                                <button
                                    className="text-2xl text-[var(--color-primary)] cursor-pointer"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <FaTimes />
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-col mt-8 gap-2">
                            {navLinks}
                        </div>
                    </div>

                    {user?.email ?
                        '' : <div className="w-fit flex flex-col gap-4 mb-auto mt-3 ml-2">
                            <NavLink to="/register" className={activeRegisterStyle}>
                                <FaUserPlus size={30}/>
                            </NavLink>
                            <NavLink
                                to="/login"
                                className={activeLoginStyle}
                            >
                                <span className="text-base flex items-center gap-1">
                                    Login
                                    <strong className="transition-transform duration-300 group-hover:translate-x-1">
                                        <IoMdLogIn />
                                    </strong>
                                </span>
                            </NavLink>
                        </div>
                    }
                </div>
            </div>
        </nav>
    );
};

export default Header;
