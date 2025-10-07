
import React, { useState, useEffect } from 'react';
import HashLoader from "react-spinners/HashLoader";

const Loader = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 3000); // Simulated loading time

        return () => clearTimeout(timer);
    }, []);

    if (!loading) return null; // no children, just stop rendering loader after 3s

    return (
        <div className="flex justify-center items-center min-h-screen">
            <HashLoader color="#e92d28" size={80} />
        </div>
    );
};

export default Loader;
