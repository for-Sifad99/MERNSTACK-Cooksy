import React from 'react';
import { useNavigate } from 'react-router';
import { FiAlertCircle } from 'react-icons/fi';
import { Typewriter } from 'react-simple-typewriter';
import { GoArrowRight } from 'react-icons/go';
import { Helmet } from 'react-helmet-async';

const ErrorPage = () => {
    const navigate = useNavigate();

    return (
        <>
            {/* Helmet */}
            <Helmet>
                <title>Page Not Found - Cooksy</title>
                <meta name="description" content="Oops! The page you're looking for doesn't exist. Head back to Cooksy's homepage." />
            </Helmet>

            <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-[#ff5d5d] via-[#ff4f4f] to-[#ff342d] text-white p-4 sm:p-6 md:p-12">
                {/* Icon */}
                <FiAlertCircle className="text-6xl sm:text-8xl md:text-9xl mb-4 sm:mb-6 animate-pulse" />

                {/* Heading with typewriter */}
                <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold mb-3 sm:mb-4 text-center">
                    <Typewriter
                        words={['Oops!', '404 Error', 'Page Not Found']}
                        loop={0}
                        cursor
                        cursorStyle="_"
                        typeSpeed={120}
                        deleteSpeed={50}
                        delaySpeed={1000}
                    />
                </h1>

                {/* Description */}
                <p className="text-sm sm:text-base md:text-xl max-w-md text-center mb-6 sm:mb-8 px-2">
                    Sorry, the page you are looking for doesn’t exist or has been moved.
                </p>

                {/* Button */}
                <button
                    onClick={() => navigate('/')}
                    className="flex gap-2 items-center hover:bg-red-100 transition text-sm sm:text-lg md:text-xl px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 bg-white text-red-500 font-semibold rounded-full group animate-bounce"
                >
                    <span>Go Back Home</span>
                    <GoArrowRight
                        className="transition-transform duration-300 ease-in-out group-hover:translate-x-2"
                    />
                </button>
            </div>
        </>
    );
};

export default ErrorPage;
