import { Helmet } from "react-helmet-async";
import { FaPlus, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { Typewriter } from 'react-simple-typewriter';
import { useContext, useState } from "react";
import { AuthContext } from "../../Contexts/AuthContext";
import bannerImage from "../../assets/component-imgs/addRecipe-banner.png";

const AddRecipe = () => {
    const { user } = useContext(AuthContext);
    const categories = ["Breakfast", "Lunch", "Dinner", "Dessert", "Vegan", "Snacks"];

    const [ingredients, setIngredients] = useState([]);
    const [instructions, setInstructions] = useState([]);
    const [ingredientInput, setIngredientInput] = useState("");
    const [instructionInput, setInstructionInput] = useState("");

    const addIngredient = () => {
        if (ingredientInput.trim()) {
            setIngredients([...ingredients, ingredientInput.trim()]);
            setIngredientInput("");
        }
    };

    const removeIngredient = (index) => {
        const newList = [...ingredients];
        newList.splice(index, 1);
        setIngredients(newList);
    };

    const addInstruction = () => {
        if (instructionInput.trim()) {
            setInstructions([...instructions, instructionInput.trim()]);
            setInstructionInput("");
        }
    };

    const removeInstruction = (index) => {
        const newList = [...instructions];
        newList.splice(index, 1);
        setInstructions(newList);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;

        const image = form.image.value.trim();
        const title = form.title.value.trim();
        const cuisineType = form.cuisine.value;
        const prepTime = form.preparationTime.value.trim();
        const category = form.categories.value;

        if (!image || !title || !cuisineType || ingredients.length === 0 || instructions.length === 0 || !prepTime || !category) {
            toast.warning("Please fill out all fields properly!");
            return;
        }

        const newRecipe = {
            image,
            title,
            cuisineType,
            ingredients,
            instructions,
            prepTime,
            categories: category,
            likes: 0,
            userName: user?.displayName || "Anonymous",
            userEmail: user?.email || "unknown"
        };

        fetch("https://recipe-book-server-kappa.vercel.app/addRecipes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newRecipe),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.insertedId) {
                    Swal.fire({
                        title: "Recipe Added Successfully!",
                        icon: "success",
                        confirmButtonColor: "#d33",
                    });
                    form.reset();
                    setIngredients([]);
                    setInstructions([]);
                } else {
                    toast.error("Failed to add recipe.");
                }
            })
            .catch((err) => {
                toast.error("Something went wrong!");
                console.error(err);
            });
    };

    return (
        <>
            <Helmet>
                <title>Add Recipe - Cooksy</title>
                <meta name="description" content="Add your favorite recipe and share it with the Cooksy community." />
            </Helmet>

            <div
                className="relative h-60 sm:h-80 md:h-[300px] bg-cover bg-center flex items-center justify-center text-white text-center"
                style={{
                    backgroundImage: `url(${bannerImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-4 sm:p-10">
                    <h1 className="text-xl sm:text-3xl md:text-5xl font-extrabold mb-1 sm:mb-2 md:mb-4">
                        <Typewriter
                            words={["Share Your Special Recipe", "Turn Ingredients into Magic", "Create Culinary Masterpieces"]}
                            loop
                            cursor
                            cursorStyle="|"
                            typeSpeed={80}
                            deleteSpeed={60}
                            delaySpeed={1500}
                        />
                    </h1>
                    <p className="text-xs sm:text-sm md:text-base text-[#fce53a] font-semibold max-w-3xl">
                        Whether it’s your grandma’s secret curry or a midnight snack invention, add your recipe and let the world enjoy your cooking magic. Every flavor has a story — tell yours!
                    </p>
                </div>
            </div>

            <section className="w-full py-8 sm:py-20 px-4 sm:px-8 min-h-screen">
                <h1 className="py-5 text-2xl sm:text-3xl md:text-4xl text-[var(--color-primary)] font-bold">Let's Add a Recipe! Here🧑‍🍳</h1>

                <div className="bg-[var(--color-section-bg)] w-full md:w-1/2">
                    <form onSubmit={handleSubmit} className="space-y-6 text-[var(--color-accent)] text-base sm:text-lg">

                        {/* Title */}
                        <div>
                            <label className="block mb-2 font-medium">Recipe Title</label>
                            <input type="text" name="title" placeholder="Enter recipe title" className="w-full px-2 py-2.5 bg-[var(--color-bg)] focus:outline-none focus:ring-2 ring-[var(--color-secondary)]/50 rounded" />
                        </div>

                        {/* Image */}
                        <div>
                            <label className="block mb-2 font-medium">Image URL</label>
                            <input type="text" name="image" placeholder="Paste your image URL" className="w-full px-2 py-2.5 bg-[var(--color-bg)] focus:outline-none focus:ring-2 ring-[var(--color-secondary)]/50 rounded" />
                        </div>

                        {/* Cuisine type and Preparation time */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-4">
                            <div>
                                <label className="block mb-2 font-medium">Cuisine Type</label>
                                <select name="cuisine" className="w-full text-[#777D86] px-2 py-2.5 bg-[var(--color-bg)] focus:outline-none focus:ring-2 ring-[var(--color-secondary)]/50 rounded">
                                    <option value="">Select one</option>
                                    <option value="Italian">Italian</option>
                                    <option value="Mexican">Mexican</option>
                                    <option value="Indian">Indian</option>
                                    <option value="Chinese">Chinese</option>
                                    <option value="Others">Others</option>
                                </select>
                            </div>

                            <div>
                                <label className="block mb-2 font-medium">Cook Time (min)</label>
                                <input type="number" name="preparationTime"
                                    placeholder="Enter cook time"
                                    className="w-full px-2 py-2.5 bg-[var(--color-bg)] focus:outline-none focus:ring-2 ring-[var(--color-secondary)]/50 rounded" />
                            </div>
                        </div>


                        {/* Ingredients */}
                        <div>
                            <label className="block mb-2 font-medium">Ingredients</label>
                            <div className="flex gap-2 mb-2">
                                <input
                                    type="text"
                                    value={ingredientInput}
                                    onChange={(e) => setIngredientInput(e.target.value)}
                                    placeholder="Type ingredient and click add"
                                    className="flex-grow w-full px-2 py-2.5 bg-[var(--color-bg)] focus:outline-none focus:ring-2 ring-[var(--color-secondary)]/50 rounded"
                                />
                                <button type="button" onClick={addIngredient} className="bg-[var(--color-secondary)] text-white px-3 py-2 rounded-md hover:bg-red-400 cursor-pointer">
                                    <FaPlus />
                                </button>
                            </div>
                            <ul className="list-disc">
                                {ingredients.map((item, index) => (
                                    <li key={index} className="flex justify-between items-center mt-2">
                                        <div className="flex items-center gap-2">
                                            <strong>{index}.</strong>
                                            {item}
                                        </div>
                                        <button type="button" onClick={() => removeIngredient(index)} className="bg-[var(--color-secondary)] text-white px-3 py-2 rounded-md hover:bg-red-400 cursor-pointer">
                                            <FaTrash />
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>


                        {/* Instructions */}
                        <div>
                            <label className="block mb-2 font-medium">Instructions</label>
                            <div className="flex gap-2 mb-2">
                                <input
                                    type="text"
                                    value={instructionInput}
                                    onChange={(e) => setInstructionInput(e.target.value)}
                                    placeholder="Type instruction and click add"
                                    className="flex-grow w-full px-2 py-2.5 bg-[var(--color-bg)] focus:outline-none focus:ring-2 ring-[var(--color-secondary)]/50 rounded"
                                />
                                <button type="button" onClick={addInstruction} className="bg-[var(--color-secondary)] text-white px-3 py-2 rounded-md hover:bg-red-400 cursor-pointer">
                                    <FaPlus />
                                </button>
                            </div>
                            <ul className="list-decimal">
                                {instructions.map((item, index) => (
                                    <li key={index} className="flex justify-between items-center mt-2">
                                        <div className="flex items-center gap-2">
                                            <strong>{index}.</strong>
                                            {item}
                                        </div>
                                        <button type="button" onClick={() => removeInstruction(index)} className="bg-[var(--color-secondary)] text-white px-3 py-2 rounded-md hover:bg-red-400 cursor-pointer">
                                            <FaTrash />
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Categories */}
                        <div>
                            <label className="block mb-2 font-medium">Categories</label>
                            <div className="flex flex-wrap space-x-4">
                                {categories.map((category) => (
                                    <label key={category} className="flex items-center gap-1 text-sm sm:text-base cursor-pointer">
                                        <input type="radio" name="categories" value={category} className="accent-[var(--color-secondary)]" />
                                        {category}
                                    </label>
                                ))}
                            </div>
                        </div>

                        <button type="submit" className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[var(--color-secondary)] text-white font-bold rounded-md hover:bg-red-400 transition group">
                            <FaPlus className="transition-transform duration-500 ease-in-out group-hover:-translate-x-3" />  Add Recipe
                        </button>
                    </form>
                </div>
            </section>
        </>
    );
};

export default AddRecipe;