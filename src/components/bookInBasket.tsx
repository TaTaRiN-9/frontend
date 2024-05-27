import { useState, useEffect } from 'react';
import { IBook } from "../models/IBook";
import { useShoppingBasket } from '../context/shoppingBasket';
import { Button, Modal } from 'react-bootstrap';

type CardBookProps = {
    id: number,
    quantity: number
}

const BookInBasket = ({ id, quantity }: CardBookProps) => {
    const {
        increaseBookQuantity,
        decreaseBookQuantity,
        removeFromBasket
    } = useShoppingBasket();

    const [allBooks, setAllBooks] = useState<IBook[]>([]);
    const [checkResponse, setCheckResponse] = useState(true);

    useEffect(() => {
        fetch("https://localhost:7250/book/get")
            .then((response) => response.json())
            .then((response) => setAllBooks(response))
            .catch((error) => {
                console.error("Произошла ошибка с получениями данных", error);
                setCheckResponse(false);
            });
    })

    const book = allBooks.find(b => b.id === id);

    return (
        <div>
            {book !== undefined ? (
                <div className='cardInBasket'>
                    <button id='removeBasket' onClick={() => removeFromBasket(id)}>X</button>
                    <h1 className='cardBasketTitle'>{book.title}</h1>
                    <p className='cardBasketDesc'>{book.description}</p>

                    <div style={{ fontSize: '18px' }}><strong>{book.price} руб</strong></div>
                    <Button variant='secondary' className='basketPlus incrementButton' onClick={() => increaseBookQuantity(id)}>+</Button>
                    <span className='spanQuantity'>
                        {quantity}
                    </span>
                    <Button variant='secondary' className='decrementButton' onClick={() => decreaseBookQuantity(id)}>-</Button>
                    <div>
                        <p style={{ fontSize: '20px' }}>Общая цена: <strong>{book.price * quantity}</strong> руб.</p>
                    </div>

                </div>
            ) : (
                <div>
                    <p>Ничего нет</p>
                </div>
            )}
        </div>
    )
}

export default BookInBasket;