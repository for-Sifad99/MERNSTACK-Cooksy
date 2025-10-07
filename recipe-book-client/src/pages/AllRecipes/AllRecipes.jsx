import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { FaHeart, FaUtensils, FaClock } from 'react-icons/fa';
import 'animate.css';
import { AuthContext } from '../../Contexts/AuthContext';
import { Link } from 'react-router';


const AllRecipes = () => {
    const { data } = useContext(AuthContext);
    const [recipes, setRecipes] = useState([]);
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [cuisineFilter, setCuisineFilter] = useState('');

    // Set recipes data
    useEffect(() => {
        if (data?.length) {
            setRecipes(data);
            setFilteredRecipes(data);
        };
    }, [data]);

    // Filter recipes when searchTerm or cuisineFilter changes
    useEffect(() => {
        let filtered = [...recipes];

        if (cuisineFilter) {
            filtered = filtered.filter(recipe =>
                recipe.cuisineType.toLowerCase() === cuisineFilter.toLowerCase()
            );
        }

        if (searchTerm.trim() !== '') {
            filtered = filtered.filter(recipe =>
                recipe.cuisineType.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredRecipes(filtered);
    }, [searchTerm, cuisineFilter, recipes]);

    return (
        <>
            <Helmet>
                <title>All Recipes - Cooksy</title>
                <meta
                    name="description"
                    content="Explore all available recipes from chefs and food lovers around the world!"
                />
            </Helmet>

            <div className="px-4 sm:px-6 md:px-8 lg:px-16 py-8 sm:py-20">
                {/* Section Header */}
                <div className="text-center mb-4 sm:mb-8 space-y-1 sm:space-y-4">
                    <h2 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-[var(--color-primary)]">
                        🍽️ Savor & Serve
                    </h2>
                    <p className="text-xs sm:text-sm md:text-base text-[var(--color-accent)] max-w-md sm:max-w-xl md:max-w-2xl mx-auto">
                        A delicious collection of{' '}
                        <span className="text-[var(--color-secondary)] font-semibold">
                            {filteredRecipes.length}
                        </span>{' '}
                        hand-picked recipes for every food lover. Explore and enjoy a variety
                        of tastes from around the world! 🌍✨
                    </p>
                </div>

                {/* Search Form */}
                <form onSubmit={e => e.preventDefault()}>
                    <div className="flex flex-col md:flex-row gap-3 items-stretch max-w-3xl mx-auto">
                        {/* Dropdown */}
                        <label className="flex items-center bg-[#e9e4e4] border-2 border-[#e9e4e4] rounded px-3 py-2 text-sm sm:text-base cursor-pointer select-none min-w-[148px] w-full md:w-auto">
                            <FaUtensils size={20} className="text-red-600 mr-2 min-w-[20px]" />
                            <select
                                className="bg-[#e9e4e4] text-black outline-none cursor-pointer w-full"
                                value={cuisineFilter}
                                onChange={e => setCuisineFilter(e.target.value)}
                            >
                                <option value="">All</option>
                                <option value="Italian">Italian</option>
                                <option value="Chinese">Chinese</option>
                                <option value="Indian">Indian</option>
                                <option value="Mexican">Mexican</option>
                                {/* Add more options as needed */}
                            </select>
                        </label>

                        {/* Search Input */}
                        <label className="flex items-center bg-[#e9e4e4] border-2 border-[#e9e4e4] rounded px-2 py-2 w-full">
                            <input
                                type="text"
                                placeholder="Find recipes by Cuisine"
                                className="w-full text-sm sm:text-base p-2 focus:outline-none text-black bg-[#e9e4e4] placeholder:text-xs sm:placeholder:text-sm"
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                            />
                        </label>

                        {/* Search Button */}
                        <div className="w-full md:w-auto">
                            <button
                                type="button"
                                className="w-full md:w-[110px] lg:w-[140px] bg-red-500 text-white hover:bg-red-600 text-xs sm:text-sm px-4 py-3 md:py-5 rounded-lg transition duration-500 cursor-pointer"
                                onClick={() => { }}
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </form>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
                        {filteredRecipes.map(({ _id, image, title, likes = 0, cuisineType, prepTime }, i) => (
                            <div
                                key={_id}
                                className="sm:w-auto max-w-[280px] w-full sm:mx-0 mx-auto bg-[var(--color-bg)]e rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 h-[360px] flex flex-col group animate__animated animate__fadeInUp"
                                style={{ animationDelay: `${i * 0.2}s`, animationFillMode: 'both' }}
                            >
                                {/* Image Section */}
                                <div className="relative h-[67%]">
                                    <img
                                        src={image}
                                        alt={title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <button className="absolute top-2 left-2 bg-white text-[var(--color-secondary)] text-xs px-3 py-1 rounded-full shadow hover:scale-105 transition-transform">
                                        <FaHeart className="inline-block mr-1" /> {likes}
                                    </button>
                                </div>

                                {/* Info Section */}
                                <div className="h-[43%] p-3 flex flex-col justify-between">
                                    <div className="flex gap-5 text-sm font-medium text-[var(--color-accent)]">
                                        <div className="flex items-center gap-1">
                                            <FaUtensils />
                                            <span>{cuisineType}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <FaClock />
                                            <span>{prepTime} min</span>
                                        </div>
                                    </div>

                                    <div>
                                        <h3
                                            className="text-2xl text-[var(--color-primary)] font-bold hover:underline cursor-pointer line-clamp-1"
                                        >
                                            {title}
                                        </h3>
                                    </div>

                                    <Link to={`/recipe-details/${_id}`}>
                                        <button className="bg-red-500 hover:bg-[var(--color-secondary)] text-white text-sm font-medium py-1.5 px-3 rounded-full w-full transition-colors cursor-pointer">
                                            View Details
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
            </div>
        </>
    );
};

export default AllRecipes;
