import React from 'react';
import { createBrowserRouter } from "react-router";
import PrivetRouter from '../routes/PrivetRouter';
import Root from '../layouts/Root';
import Home from '../pages/Home/Home';
import AllRecipes from '../pages/AllRecipes/AllRecipes';
import RecipeDetails from '../components/RecipeDetails/RecipeDetails';
import AddRecipe from '../pages/AddRecipe/AddRecipe';
import MyRecipes from '../pages/MyRecipes/MyRecipes';
import Blogs from '../pages/Blogs/Blogs';
import Register from '../pages/Register/Register';
import Login from '../pages/Login/Login';
import ErrorPage from '../pages/ErrorPage/ErrorPage';
import Loader from '../components/Loader/Loader';



const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: '/all-recipes',
                Component: AllRecipes
            },
            {
                path: '/recipe-details/:id',
                loader: ({ params }) => fetch(`https://recipe-book-server-kappa.vercel.app/recipes/${params.id}`),
                element: <PrivetRouter>
                    <RecipeDetails />
                </PrivetRouter>,
                hydrateFallbackElement: <Loader />,
            },
            {
                path: '/add-recipe',
                element: <PrivetRouter>
                    <AddRecipe />
                </PrivetRouter>
            },
            {
                path: '/my-recipes',
                element: <PrivetRouter>
                    <MyRecipes />
                </PrivetRouter>
            },
            {
                path: '/blogs',
                element: <Blogs />
            },
            {
                path: '/register',
                Component: Register
            },
            {
                path: '/login',
                Component: Login
            },
        ]
    },
    {
        path: "/*",
        element: <ErrorPage />,
    },
]);

export default router;