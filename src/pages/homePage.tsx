import { useEffect, useState } from 'react';
import AllBook from '../components/allBook';
import { useShoppingBasket } from '../context/shoppingBasket';
import axios from 'axios';

const HomePage = () => {
    const [email, setEmail] = useState(localStorage.getItem("user") || "");

    const [token, setToken] = useState(localStorage.getItem('token') || "");
    
    const { setCardBooks } = useShoppingBasket();

    useEffect(() => {
        fetchBookFromBasketUser();
    }, [email])

    const fetchBookFromBasketUser = async () => {
        try {
            const response = await axios.get(`https://localhost:7250/api/basket/${email}`);
            setCardBooks(response.data);
        } catch (error) {
            console.error("Проблемы с получением данных из корзины", error);
        }
    };

    

    return (
        <div>
            <AllBook/>
        </div>
    )
}

export default HomePage;