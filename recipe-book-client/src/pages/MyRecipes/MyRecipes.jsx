import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../Contexts/AuthContext'
import { Link } from "react-router";
import { FaHeart, FaUtensils, FaTags, FaClock, FaEdit, FaTrash } from 'react-icons/fa';
import { TbMoodEmpty } from "react-icons/tb";
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { Typewriter } from "react-simple-typewriter";
import { GoArrowRight } from 'react-icons/go';
import { Helmet } from 'react-helmet-async';


const Loader = () => (
    <span className="loading loading-dots loading-md mx-auto flex items-center justify-center"></span>
);

const MyRecipes = () => {
    const user = useContext(AuthContext)
    const userEmail = user.user.email;

    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentRecipe, setCurrentRecipe] = useState(null);

    const [formData, setFormData] = useState({
        title: '',
        image: '',
        ingredients: '',
        instructions: '',
        cuisineType: '',
        prepTime: '',
        categories: '',
        likes: 0,
    });

    useEffect(() => {
        setLoading(true);
        fetch(`https://recipe-book-server-kappa.vercel.app/recipes?email=${encodeURIComponent(userEmail)}`)
            .then(res => {
                if (!res.ok) throw new Error('Failed to fetch recipes');
                return res.json();
            })
            .then(data => {
                setRecipes(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, [userEmail]);

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        });

        if (!result.isConfirmed) return;

        try {
            const res = await fetch(`https://recipe-book-server-kappa.vercel.app/recipes/${id}`, { method: 'DELETE' });
            if (!res.ok) throw new Error('Failed to delete recipe');
            setRecipes(recipes.filter(recipe => recipe._id !== id));
            toast.success('Recipe deleted successfully!');
        } catch (err) {
            toast.error('Delete failed: ' + err.message);
        }
    };
    console.log(recipes)
    const openUpdateModal = (recipe) => {
        setCurrentRecipe(recipe);
        setFormData({
            title: recipe.title || '',
            image: recipe.image || '',
            ingredients: recipe.ingredients || '',
            instructions: recipe.instructions || '',
            cuisineType: recipe.cuisineType || '',
            prepTime: recipe.prepTime || '',
            categories: recipe.categories || '',
            likeCount: recipe.likes || 0,
        });
        setIsModalOpen(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`https://recipe-book-server-kappa.vercel.app/recipes/${currentRecipe._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            if (!res.ok) throw new Error('Failed to update recipe');
            setRecipes(recipes.map(r => (r._id === currentRecipe._id ? { ...r, ...formData } : r)));
            setIsModalOpen(false);
            setCurrentRecipe(null);
            toast.success('Recipe updated successfully!');
        } catch (err) {
            toast.error('Update failed: ' + err.message);
        }
    };

    return (
        <>
            {/* Helmet */}
            <Helmet>
                <title>My Recipes - Cooksy</title>
                <meta
                    content="View and manage your saved and added recipes in one place with Cooksy!"
                />
            </Helmet>

            <div className="max-w-6xl mx-auto px-4 py-10">
                <div className='mb-8'>
                    <h2 className="text-3xl md:text-4xl text-[var(--color-primary)] font-bold text-center mb-2 md:mb-4">
                        🍲 My Recipe Box
                    </h2>
                    <p className="text-xs sm:text-sm text-center text-[var(--color-accent)] max-w-2xl mx-auto">
                        Keep all your favorite recipes in one place! Add your own culinary creations or save dishes you love to try later. Let’s get cooking! 🍳✨
                    </p>
                </div>

                {error && <p className="text-red-500 mb-4">{error}</p>}

                {loading ? (
                    <Loader />
                ) : recipes.length === 0 ? (
                    <div className="flex flex-col items-center justify-center min-h-[30vh] space-y-4 py-4">
                        <TbMoodEmpty className="text-7xl text-[var(--color-secondary)]" />

                        <p className="text-xl sm:text-2xl text-[var(--color-primary)] text-center font-bold">
                            <Typewriter
                                words={['You have no recipes added yet.']}
                                loop={false}
                                cursor
                                cursorStyle="_"
                                typeSpeed={70}
                                deleteSpeed={50}
                                delaySpeed={1000}
                            />
                        </p>

                        <Link to="/add-recipe">
                            <button
                                className="flex gap-2 items-center hover:bg-red-100 transition text-lg sm:text-xl md:text-xl px-6 sm:px-8 md:px-8 py-3 md:py-4 bg-white text-red-500 font-semibold rounded-full group shadow-md"
                            >
                                <span>All recipes</span>
                                <GoArrowRight className="transition-transform duration-300 ease-in-out group-hover:translate-x-2" />
                            </button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {recipes.map(recipe => (
                            <div
                                key={recipe._id}
                                className="bg-[var(--color-bg)] rounded-2xl shadow hover:shadow-lg transition overflow-hidden group relative"
                            >
                                {/* ICONS TOP CORNER */}
                                <div className="flex justify-between px-4 pt-4 absolute z-10 w-full">
                                    <div className="flex items-center gap-1 bg-white/80 text-gray-800 px-2 py-1 rounded-full text-sm shadow">
                                        <FaUtensils className="text-orange-500" />
                                        <span>{recipe.cuisineType}</span>
                                    </div>
                                    <div className="flex items-center gap-1 bg-white/80 text-gray-800 px-2 py-1 rounded-full text-sm shadow cursor-default">
                                        <FaHeart className="text-red-500" />
                                        <span>{recipe.likes}</span>
                                    </div>
                                </div>

                                {/* IMAGE */}
                                <div className="h-52 overflow-hidden">
                                    <img
                                        src={recipe.image}
                                        alt={recipe.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                    />
                                </div>

                                {/* TEXT CONTENT */}
                                <div className="p-3 space-y-0.5">

                                    {/* CATEGORIES */}
                                    <div className="flex gap-4 text-sm text-[var(--color-accent)]">
                                        <div className="flex items-center gap-1">
                                            <FaTags className="text-blue-500" />
                                            <span>{recipe.categories}</span>
                                        </div>

                                        {/* PREPSRE TIME */}
                                        <div className="flex items-center gap-1">
                                            <FaClock className="text-green-500" />
                                            <span>{recipe.prepTime} min</span>
                                        </div>
                                    </div>

                                    {/* TITLE */}
                                    <h3 className="text-2xl font-bold text-[var(--color-primary)">{recipe.title}</h3>

                                    {/* INGREDIENTS */}
                                    <p className="text-sm text-[var(--color-accent)]">
                                        <strong>Ingredients: </strong>
                                        {(
                                            Array.isArray(recipe.ingredients)
                                                ? recipe.ingredients
                                                : typeof recipe.ingredients === 'string' && recipe.ingredients.length > 0
                                                    ? [recipe.ingredients]
                                                    : []
                                        ).map((ingredient, index, arr) => {
                                            const lastIndex = arr.length - 1;
                                            return (
                                                <span key={index}>
                                                    {ingredient}{index < lastIndex ? ', ' : '.'}
                                                </span>
                                            );
                                        })}
                                    </p>

                                    {/* INSTRUCTIONS */}
                                    <span className="text-sm text-[var(--color-accent)]"><strong>Instructions: </strong>
                                        {(
                                            Array.isArray(recipe.instructions)
                                                ? recipe.instructions
                                                : typeof recipe.instructions === 'string' && recipe.instructions.length > 0
                                                    ? [recipe.instructions]
                                                    : []
                                        ).map((instruction, index, arr) => {
                                            const lastIndex = arr.length - 1;
                                            return (
                                                <span key={index}>
                                                    {instruction}{index < lastIndex ? ', ' : '.'}
                                                </span>
                                            );
                                        })}
                                    </span>

                                    {/* BUTTONS */}
                                    <div className="flex justify-between gap-2 mt-2.5">
                                        <button
                                            onClick={() => openUpdateModal(recipe)}
                                            className="w-1/2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm flex items-center justify-center gap-2"
                                        >
                                            <FaEdit />
                                            Update
                                        </button>
                                        <button
                                            onClick={() => handleDelete(recipe._id)}
                                            className="w-1/2 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm flex items-center justify-center gap-2"
                                        >
                                            <FaTrash />
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* MODAL */}
                {isModalOpen && (
                    <div
                        className="fixed inset-0 flex justify-center items-center z-50 backdrop-blur-sm"
                        onClick={() => setIsModalOpen(false)}
                    >
                        <form
                            onClick={e => e.stopPropagation()}
                            onSubmit={handleUpdateSubmit}
                            className="bg-[var(--color-section-bg)]  p-6 rounded-lg max-w-xl shadow-lg space-y-6 max-h-[90vh] overflow-auto"
                        >
                            {/* Image URL */}
                            <div className="flex flex-col">
                                <label className="text-[]car(--color-accent)] text-sm font-bold mb-1">Image URL</label>
                                <input
                                    type="text"
                                    name="image"
                                    value={formData.image}
                                    onChange={handleChange}
                                    required
                                    className="text-[var(--color-accent)] border border-[var(--color-secondary)]  rounded p-2 w-full"
                                />
                            </div>

                            {/* TOP: Title and Categories side by side */}
                            <div className="flex gap-4">
                                <div className="flex flex-col flex-1">
                                    <label className="text-[]car(--color-accent)] text-sm font-bold mb-1">Title</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        required
                                        className="text-[var(--color-accent)] border border-[var(--color-secondary)] rounded p-2 w-full"
                                    />
                                </div>
                                <div className="flex flex-col flex-1">
                                    <label className="text-[]car(--color-accent)] text-sm font-bold mb-1">Categories</label>
                                    <input
                                        type="text"
                                        name="categories"
                                        value={formData.categories}
                                        onChange={handleChange}
                                        required
                                        className="text-[var(--color-accent)] border border-[var(--color-secondary)] rounded p-2 w-full"
                                    />
                                </div>
                            </div>

                            {/* Preparation Time and Cuisine Type side by side */}
                            <div className="flex gap-4">
                                <div className="flex flex-col flex-1">
                                    <label className="text-[]car(--color-accent)] text-sm font-bold mb-1">Preparation Time (hours)</label>
                                    <input
                                        type="number"
                                        name="prepTime"
                                        value={formData.prepTime}
                                        onChange={handleChange}
                                        required
                                        className="text-[var(--color-accent)] border border-[var(--color-secondary)] rounded p-2 w-full"
                                        min="0"
                                        step="0.1"
                                    />
                                </div>
                                <div className="flex flex-col flex-1">
                                    <label className="text-[]car(--color-accent)] text-sm font-bold mb-1">Cuisine Type</label>
                                    <select
                                        name="cuisineType"
                                        value={formData.cuisineType}
                                        onChange={handleChange}
                                        required
                                        className="text-[var(--color-accent)] border border-[var(--color-secondary)] rounded p-2 w-full"
                                    >
                                        <option value="" className='text-black'>Select cuisine</option>
                                        <option value="Italian" className='text-black'>Italian</option>
                                        <option value="Mexican" className='text-black'>Mexican</option>
                                        <option value="Indian" className='text-black'>Indian</option>
                                        <option value="Chinese" className='text-black'>Chinese</option>
                                        <option value="American" className='text-black'>American</option>
                                        <option value="French" className='text-black'>French</option>
                                        {/* Add more as you want */}
                                    </select>
                                </div>
                            </div>

                            {/* Ingredients */}
                            <div className="flex flex-col">
                                <label className="text-[]car(--color-accent)] text-sm font-bold mb-1">Ingredients</label>
                                <textarea
                                    name="ingredients"
                                    value={formData.ingredients}
                                    onChange={handleChange}
                                    required
                                    className="text-[var(--color-accent)] border border-[var(--color-secondary)]  rounded p-2 w-full"
                                    rows="3"
                                />
                            </div>

                            {/* Instructions */}
                            <div className="flex flex-col">
                                <label className="text-[]car(--color-accent)] text-sm font-bold mb-1">Instructions</label>
                                <textarea
                                    name="instructions"
                                    value={formData.instructions}
                                    onChange={handleChange}
                                    required
                                    className="text-[var(--color-accent)] border border-[var(--color-secondary)]  rounded p-2 w-full"
                                    rows="4"
                                />
                            </div>

                            {/* Buttons */}
                            <div className="flex justify-end gap-4 mt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 rounded text-white bg-red-500 hover:bg-red-600 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600 transition"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </>
    );
};

export default MyRecipes;