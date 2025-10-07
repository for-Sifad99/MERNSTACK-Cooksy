import React, { useContext } from 'react';
import { AuthContext } from '../Contexts/AuthContext';
import { Navigate, useLocation } from 'react-router';
import Loader from '../components/Loader/Loader';

const PrivetRouter = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    // set loading when user Null
    if (loading) {
        return <Loader />
    }

    // navigate user where he/she want to go
    if (!user && !user?.email) {
        return <Navigate to='/login' state={{ from: location?.pathname }} replace />;
    }

    // return children after user login
    return children;
};

export default PrivetRouter;
