import React from 'react';
import { Helmet } from 'react-helmet-async';
import Banner from '../../components/Banner/Banner';
import TopRecipes from '../../components/TopRecipes/TopRecipes';
import FeaturedRecipes from '../../components/FeaturedRecipes/FeaturedRecipes';
import Inspiration from '../../components/Inspiration/Inspiration';
import OurChefs from '../../components/OurChefs/OursChefs';
import Review from '../../components/Review/Review';


const Home = () => {
    return (
        <>
            {/* Helmet */}
            <Helmet>
                <title>Home - Cooksy</title>
                <meta name="description" content="Welcome to Cooksy - Discover delicious recipes and share your culinary creations with the world!" />
            </Helmet>

            {/* Banner Section */}
            <section>
                <Banner />
            </section>

            {/* Top Recipes Section */}
            <section>
                <TopRecipes />
            </section>

            {/* Featured Recipes Section */}
            <section>
                <FeaturedRecipes />
            </section>

            {/* Inspiration Section */}
            <section>
                <Inspiration />
            </section>

            {/* Inspiration Section */}
            <section>
                <OurChefs />
            </section>

            {/* Review Section */}
            <section>
                <Review />
            </section>
        </>
    );
};

export default Home;