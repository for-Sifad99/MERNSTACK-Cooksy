import { Link } from 'react-router';
import featuredRecipesData from './featuredData';
import { FaHeart, FaUtensils } from "react-icons/fa";
import Marquee from "react-fast-marquee";

const FeaturedRecipes = () => {
    const featuredRecipes = featuredRecipesData;

    return (
        <section className="max-w-7xl mx-auto sm:mb-20 mb-14 px-4 md:px-10 xl:px-20">
                <h2 className="text-[var(--color-primary)] text-2xl sm:text-4xl font-bold text-center md:mb-4 mb-2">
                    🍽️ Featured Recipes
                </h2>
                <p className="text-center text-[var(--color-accent)] max-w-2xl mx-auto text-xs sm:text-base md:mb-10 sm:mb-6 mb-4">
                Handpicked favorites loved by foodies—delicious, easy, and worth a try! 🍝✨
                </p>
                <Marquee
                    direction="left"
                    speed={40}
                    gradient={false}
                    pauseOnHover={true}
                    autoFill={false}
                >
                    <div className="flex gap-4 sm:pl-4 animate-[slide_10s_linear_infinite]">
                        {featuredRecipes.map((recipe) => (
                            <div
                                key={recipe._id}
                                className="w-[220px] sm:mx-0 mx-auto rounded-2xl overflow-hidden hover:shadow-xl transition-shadow duration-300 relative"
                            >
                                <div className="relative">
                                    <img
                                        src={recipe.image}
                                        alt={recipe.title}
                                        className="w-full h-44 object-cover hover:scale-105 transition-transform duration-300 rounded-2xl "
                                    />
                                    <button className="absolute top-2 left-2 text-white bg-[var(--color-secondary)] text-xs px-2 py-1 rounded-full shadow">
                                        featured
                                    </button>
                                    <button className="absolute top-9 left-2 bg-white text-[var(--color-secondary)] text-xs px-2 py-1 rounded-full shadow">
                                        <FaHeart className="inline-block mr-1" /> {recipe.likes}
                                    </button>
                                </div>
                                <div className="p-3 flex flex-col">
                                    <div className="flex items-center gap-3 text-base font-medium">
                                        <span className="text-base-200 flex items-center">
                                            <FaUtensils className="mr-1" /> {recipe.cuisineType}
                                        </span>
                                    </div>
                                    <h3 className="text-2xl text-[var(--color-primary)] font-semibold hover:underline cursor-pointer">
                                        {recipe.title}
                                    </h3>
                                    <Link to={`/recipe-details/${recipe._id}`}>
                                        <button className="mt-2 bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-xl w-full transition-colors cursor-pointer">
                                            View Details
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </Marquee>
        </section>
    );
};

export default FeaturedRecipes;