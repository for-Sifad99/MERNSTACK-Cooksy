import { Link, useLoaderData } from 'react-router';
import { AuthContext } from '../../Contexts/AuthContext';
import { FaClock, FaHeart, FaRegBookmark, FaUtensils } from 'react-icons/fa';
import { FaBowlFood } from 'react-icons/fa6';
import { GoArrowRight } from 'react-icons/go';
import { Helmet } from 'react-helmet-async';
import { useState, useContext } from 'react';
import { toast } from 'react-toastify';
import { Typewriter } from 'react-simple-typewriter';

const RecipeDetails = () => {
    const user = useContext(AuthContext);
    const AuthorEmail = user.user.email;
    const recipe = useLoaderData();

    const {
        image,
        title,
        cuisineType,
        ingredients,
        instructions,
        prepTime,
        categories,
        likes,
        userEmail,
    } = recipe;

    const [likeCount, setLikeCount] = useState(likes);

    const handleLike = async () => {
        const updatedCount = likeCount + 1;
        setLikeCount(updatedCount);

        try {
            const res = await fetch(`https://recipe-book-server-kappa.vercel.app/api/recipes/${recipe._id}/like`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ likes: updatedCount }),
            });

            const data = await res.json();
            if (!res.ok) {
                console.error('Failed to update like count:', data.message);
                setLikeCount(likeCount);
            }
        } catch (err) {
            console.error('Error:', err);
            setLikeCount(likeCount);
        }
    };

    const handleClickLike = () => {
        if (AuthorEmail !== userEmail) {
            handleLike();
        } else {
            toast.info("You can't like your own recipe!");
        }
    };

    return (
        <>
            <Helmet>
                <title>{title ? `${title} Recipe - Cooksy` : "Recipe Details - Cooksy"}</title>
                <meta name="description" content="View detailed instructions, ingredients, and more for this amazing recipe on Cooksy!" />
            </Helmet>

            <div className="flex flex-col items-center justify-center mx-auto text-center pt-8 sm:pt-20 px-4">
                <h1 className="text-[var(--color-primary)] text-xl sm:text-3xl font-bold mb-1 sm:mb-3">
                    🍽️ Hot Recipe
                </h1>
                <h2 className="max-w-5xl text-xs sm:text-base md:text-lg text-[var(--color-accent)]">
                    <Typewriter
                        words={[`${likeCount} people interested in this recipe. Users can like a recipe multiple times. But the user can’t like his own added recipes.`]}
                        loop
                        cursor
                        cursorStyle="|"
                        typeSpeed={80}
                        deleteSpeed={60}
                        delaySpeed={1500}
                    />
                </h2>
            </div>

            <div className="max-w-5xl mx-auto px-4 pt-4 sm:pt-8 md:pt-14 sm:px-8 pb-8 sm:pb-20 md:grid md:grid-cols-2 sm:gap-10 gap-6 flex flex-col items-center">
                {/* Image */}
                <img
                    src={image}
                    alt={recipe.title}
                    className="rounded-xl shadow-lg w-full object-cover"
                />

                {/* Details */}
                <div className="sm:space-y-4 w-full">
                    <p className="text-[var(--color-secondary)] font-bold uppercase text-2xl sm:text-4xl">{title}</p>

                    <div className="md:w-full flex flex-wrap items-center gap-4 justify-between py-2">
                        <div className="flex items-center gap-3">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="40" height="40">
                                <circle cx="32" cy="32" r="30" fill="#FFEDD5" stroke="#FDBA74" strokeWidth="2" />
                                <path d="M24 16c-1-6 6-9 10-6 4-3 11 0 10 6 3 1 4 5 3 7H21c-1-2 0-6 3-7z" fill="#F3F4F6" stroke="#D1D5DB" strokeWidth="1" />
                                <circle cx="32" cy="36" r="12" fill="#FCD34D" />
                                <circle cx="28" cy="34" r="2" fill="#1F2937" />
                                <circle cx="36" cy="34" r="2" fill="#1F2937" />
                                <path d="M28 40c2 2 6 2 8 0" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" />
                                <path d="M24 48c0 4 16 4 16 0v-4H24v4z" fill="#F87171" stroke="#B91C1C" strokeWidth="1" />
                            </svg>
                            <div>
                                <p className="font-semibold text-[var(--color-primary)] text-sm sm:text-base">Smart Chef</p>
                                <p className="text-xs text-[var(--color-accent)]">Recipe Author</p>
                            </div>
                        </div>

                            <button
                                onClick={handleClickLike}
                                className="p-2 rounded-full bg-pink-200 text-pink-600 hover:bg-pink-300 transition"
                            >
                                <FaHeart className="text-xl" />
                            </button>
                    </div>

                    <hr className="w-full border-t border-gray-200 mb-6" />

                    {/* Info Row */}
                    <div className="flex gap-3 sm:gap-6 text-xs sm:text-base text-[var(--color-accent)] flex-wrap">
                        <div className="flex items-center gap-2">
                            <FaClock /> <span>{prepTime} min</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <FaUtensils /> <span>{cuisineType}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <FaBowlFood /> <span>{categories}</span>
                        </div>
                    </div>

                    {/* Instructions */}
                    <div>
                        <h1 className="text-lg sm:text-xl font-semibold mb-2">Instructions</h1>
                        <ul className="text-[var(--color-base-200)] list-disc pl-4 space-y-1 text-sm sm:text-base">
                            {instructions}
                        </ul>
                    </div>

                    {/* Ingredients */}
                    <div>
                        <h2 className="text-lg sm:text-xl font-semibold mb-2">Ingredients <span className="text-sm text-gray-500">(1 Person)</span></h2>
                        <ul className="text-[var(--color-base-200)]0 text-sm sm:text-base list-disc pl-4 space-y-1">
                            {ingredients.map((i, index) => <li key={index}>{i}</li>)}
                        </ul>
                    </div>

                    {/* Buttons */}
                        <Link
                            to='/all-recipes'
                            className="flex items-center w-fit gap-2 hover:bg-red-100 text-sm sm:text-base px-6 py-2 sm:mt-4 mt-3 bg-white text-red-500 font-semibold rounded-full shadow-md transition group"
                        >
                            <span>See All Recipes</span>
                            <GoArrowRight className="group-hover:translate-x-2 transition-transform" />
                        </Link>
                </div>
            </div>
        </>
    );
};

export default RecipeDetails;
