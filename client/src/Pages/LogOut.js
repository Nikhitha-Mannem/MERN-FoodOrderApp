import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LogOut = () => {
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem('username');
        localStorage.removeItem('accessToken');
        navigate('/');
    }, [navigate]);

    return null; 
};

export default LogOut;
