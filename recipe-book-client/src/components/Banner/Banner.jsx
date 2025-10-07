import React, { useContext, useEffect, useState } from 'react';
import { FaUtensils } from 'react-icons/fa';
import bannerImg from '../../assets/component-imgs/banner.png';
import { AuthContext } from '../../Contexts/AuthContext';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

const Banner = () => {
    const { data, user } = useContext(AuthContext);
    const [recipes, setRecipes] = useState('')
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    // Set recipes data
    useEffect(() => {
        if (data?.length) {
            setRecipes(data);
        };
    }, [data]);

    // Search handle function
    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim() !== '') {
            const found = recipes.find(recipe => recipe.title.trim().toLowerCase() === searchTerm.trim().toLowerCase());

            if (user?.email) {
                if (!found) return;
                navigate(`/recipe-details/${found._id}`);
            }else{
                toast.info("Please login to view recipes details.", {
                    position: "top-right",
                    autoClose: 1500,
                });
            };
        };
    };

    return (
        <section
            className="relative w-full h-[54vh] sm:h-[60vh] md:h-[89vh] lg:h-[86vh]  bg-no-repeat bg-center bg-cover sm:mb-20 mb-14"
            style={{ backgroundImage: `url(${bannerImg})` }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center px-4 max-w-4xl w-full text-gray-900">
                    {/* Title */}
                    <h1 className="text-4xl sm:text-5xl md:text-8xl font-bold mb-3 sm:mb-4">
                        <strong>
                            <span className='text-5xl sm:text-6xl md:text-9xl font-extrabold -rotate-16 inline-block'>ｃ</span>
                            <span className="text-red-600">oo</span>ksy
                        </strong>
                    </h1>

                    {/* Description */}
                    <p className="text-sm sm:text-lg md:text-xl mb-4 sm:mb-6 px-2 font-semibold md:leading-7 sm:leading-5  leading-4">
                        Cooksy — your go-to destination to discover mouth-watering recipes from around the world and share your own culinary masterpieces!
                    </p>

                    {/* Search Form */}
                    <form onSubmit={handleSearch} className="mt-3 sm:mt-5">
                        <div className="max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-xl bg-[#f3f1f1] flex items-center gap-2 p-2 sm:p-3 rounded mx-auto">
                            <label className="flex items-center w-full pr-2 bg-[#f3f1f1] border-2 border-[#f3f1f1] rounded">
                                <FaUtensils
                                    size={20}
                                    className="text-red-600 mr-2 min-w-[20px]"
                                />
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={e => { setSearchTerm(e.target.value) }}
                                    placeholder="find recipes"
                                    className="w-full text-sm sm:text-base p-2 focus:outline-none text-black bg-[#f3f1f1] placeholder:text-xs sm:placeholder:text-sm"
                                />
                            </label>
                            <div className="w-auto">
                                <button
                                    type="submit"
                                    className="w-[80px] sm:w-[100px] md:w-[110px] lg:w-[140px] bg-red-500 text-white hover:bg-red-600 text-xs sm:text-sm px-2 py-2 sm:px-4 sm:py-3 rounded-lg transition duration-500 cursor-pointer"
                                >
                                    Search
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Banner;
