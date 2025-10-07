import {
    FaUtensils, FaIceCream, FaGlassMartiniAlt, FaLeaf,
    FaDrumstickBite, FaFish, FaCarrot, FaSeedling
} from 'react-icons/fa';
import { Typewriter } from 'react-simple-typewriter';
import inspiration1 from '../../assets/component-imgs/ins-1.png';
import inspiration2 from '../../assets/component-imgs/ins-2.png';
import 'animate.css';
import { Link } from 'react-router';


const Inspiration = () => {
    return (
        <section className="sm:mb-20 mb-14">
            <div className="max-w-6xl mx-auto px-4">
                {/* Title and Description */}
                <div className="text-center">
                    <h2 className="text-[var(--color-primary)] text-2xl sm:text-4xl font-bold text-center md:mb-4 mb-2">
                        🍽️ Get Inspired
                    </h2>
                    <p className="text-center text-[var(--color-accent)] max-w-2xl mx-auto text-xs sm:text-base md:mb-10 sm:mb-6 mb-4">
                        Discover new ideas, try exciting recipes, and bring flavor to your life! 🌍✨
                    </p>
                </div>

                {/* Image Cards */}
                <div className="grid md:grid-cols-2 gap-6 mb-10 animate__animated animate__fadeInUp">
                    {/* Card 1 */}
                    <div
                        className="relative h-96 rounded-xl overflow-hidden bg-cover bg-center text-white group"
                        style={{ backgroundImage: `url(${inspiration1})` }}
                    >
                        <div className="absolute inset-0 transition duration-300 group-hover:bg-opacity-50"></div>
                        <div className="absolute bottom-0 z-10 p-6">
                            <span className="text-sm px-3 py-1 rounded-full uppercase inline-block bg-red-500">Chef’s Tips</span>
                            <h2 className="text-2xl font-bold mt-3">
                                <Typewriter
                                    words={['Learn from the best and create culinary magic at home.']}
                                    loop={false}
                                    cursor
                                    cursorStyle="_"
                                    typeSpeed={60}
                                />
                            </h2>
                            <Link to='/all-recipes'>
                                <button className="mt-4 bg-white text-red-500 hover:bg-red-200 hover:text-red-600 transition duration-700 px-6 py-2 hover:px-6 rounded-full font-semibold">See Recipes</button>
                            </Link>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div
                        className="relative h-96 rounded-xl overflow-hidden bg-cover bg-center text-black group"
                        style={{ backgroundImage: `url(${inspiration2})` }}
                    >
                        <div className="absolute inset-0 transition duration-300 group-hover:bg-opacity-30"></div>
                        <div className="absolute bottom-0 z-10 p-6 text-white">
                            <span className="text-sm px-3 py-1 rounded-full uppercase inline-block bg-red-500 text-white">Exclusive</span>
                            <h2 className="text-2xl font-bold mt-3 text-red-500">
                                <Typewriter
                                    words={['Add flavor, flair, and creativity to your meals.']}
                                    loop={false}
                                    cursor
                                    cursorStyle="_"
                                    typeSpeed={60}
                                />
                            </h2>
                            <Link to='/all-recipes'>
                                <button className="mt-4 bg-white text-red-500 hover:bg-red-200 hover:text-red-600 transition duration-700 px-6 py-2 rounded-full font-semibold">See Recipes</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Inspiration;
