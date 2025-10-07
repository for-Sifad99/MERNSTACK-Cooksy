import React from "react";
import { FaQuoteLeft } from "react-icons/fa";
const reviews = [
    {
        message:
            "Cooksy has truly changed the way I cook. The simple recipes help me impress my family every time. So easy and tasty!",
        name: "Amina Rahman",
        title: "Home Chef, Dhaka",
    },
    {
        message:
            "Just started cooking and Cooksy made it feel fun! The quick dinner ideas are lifesavers and super easy to follow.",
        name: "Tariq Hasan",
        title: "Student, Chittagong",
    },
    {
        message:
            "Love the variety of dishes on Cooksy. The Italian pasta recipe I tried was super delicious, better than many restaurants!",
        name: "Nadia Akter",
        title: "Food Blogger, Sylhet",
    },
];


const Review = () => {
    return (
        <section className="sm:mb-20 mb-14 px-4 md:px-10 xl:px-24">
            <div className="max-w-7xl mx-auto">
                <span
                    className="w-10 h-10 bg-[#0337d] rounded-full"
                ></span>
                    <h2 className="text-[var(--color-primary)] text-2xl sm:text-4xl font-bold text-center md:mb-4 mb-2">
                        🍽️ Featured Recipes
                    </h2>
                    <p className="text-center text-[var(--color-accent)] max-w-2xl mx-auto text-xs sm:text-base md:mb-10 sm:mb-6 mb-4">
                    Thousands of home cooks trust Cooksy to inspire their everyday meals with easy, delicious recipes! 🌍✨
                    </p>

                <div className="flex flex-wrap gap-6 justify-center mx-auto">
                    {reviews.map((review, index) => (
                        <div
                            key={index}
                            className="bg-[var(--color-bg)] max-w-[300px] w-full py-8 px-6 rounded-2xl shadow-md text-left transition-all duration-300"
                        >
                            <FaQuoteLeft className="text-teal-500 text-2xl mb-3" />
                            <p className="text-[var(--color-accent)] text-sm mb-4 leading-4">{review.message}</p>
                            <div className="flex items-center border-t border-dashed border-gray-400 pt-3">
                                <span className="w-10 h-10 bg-[#23373d] rounded-full"></span>
                                <div className="ml-3">
                                    <h4 className="font-bold text-base text-[var(--color-primary)]">{review.name}</h4>
                                    <p className="text-xs text-[var(--color-accent)] font-medium">{review.title}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Review;
