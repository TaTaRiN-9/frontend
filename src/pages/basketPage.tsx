import React, { useEffect } from 'react';
import Basket from '../components/basket';
import { useNavigate } from 'react-router-dom';

const BasketPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('user') === null) {
            navigate('/login', {replace: true})
        }
    }, []);

    return (
        <div className='basket'>
            <Basket />
        </div>
    );
};

export default BasketPage;