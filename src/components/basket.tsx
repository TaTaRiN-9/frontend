import { useState, useEffect } from 'react';
import { IBook } from "../models/IBook";
import { useShoppingBasket } from '../context/shoppingBasket';
import BookInBasket from './bookInBasket';
import { Link } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';

const Basket = () => {
    const [allBooks, setAllBooks] = useState<IBook[]>();
    const { cardBooks, setCardBooks } = useShoppingBasket();
    const [checkData, setCheckData] = useState(true);
    const [showWindow, setShowWindow] = useState(false);

    useEffect(() => {
        // ТУТ НУЖЕН ЗАПРОС ДЛЯ ВСЕХ КНИГ
        fetch("https://localhost:7250/book/get")
            .then(books => books.json())
            .then(books => setAllBooks(books))
            .catch((error) => {
                console.error("Ошибка с данными: ", error);
                setCheckData(false);
            });
    }, []);

    const placeOrder = () => {
        const dataOrder = {
            emailUser: localStorage.getItem("user"),
            books: cardBooks
        };

        // тут надо бд и путь к бэку и ТУТ НУЖЕН ЗАПРОС для оформления заказа
        fetch("https://localhost:7250/api/orders/add", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(dataOrder)
        })
            .then(async (response) => {
                if (!response.ok) {
                    throw new Error("Не получилось оформить заказ!");
                } else {
                    localStorage.setItem("books", "[]");
                    const email = localStorage.getItem('user');
                    // тут надо прописать путь и в бэке тоже ТУТ ЗАПРОС
                    await fetch("https://localhost:7250/api/basket/edit-basket",
                        {
                            method: 'POST',
                            mode: "cors",
                            headers: {
                                "Content-type": "application/json"
                            },
                            body: JSON.stringify({
                                emailUser: email,
                                books: []
                            })
                        }).then((response) => {
                            if (!response.ok) {
                                console.error(response);
                            }
                            return response.json();
                        })
                        .then((response) => {
                            console.log(response)
                        })
                        .catch((error) => {
                            console.log(error.message);
                        });
                    // для появления окна, что заказ оформлен верно
                    setShowWindow(true);
                }
            })
            .catch((error) => {
                console.error("Произошла ошибка в оформлении заказа: ", error);
            })
    };

    const totalSum = cardBooks.reduce((total, cardbook) => {
        const book = allBooks?.find((book) => book.id === cardbook.id);
        return total + (book?.price || 0) * cardbook.quantity;
    }, 0)

    return (
        <>
            {cardBooks !== undefined && cardBooks.length > 0 ? (
                <div className='basket'>
                    <h1>Корзина товаров</h1>
                    {cardBooks.map((book) => {
                        return (
                            <BookInBasket key={book.id} {...book} />
                        )
                    })}
                    <div>
                        <p style={{ fontSize: '22px' }}>Итоговая цена: <strong>{totalSum}</strong> руб.</p>
                    </div>
                    <Button className='orderButton' onClick={() => placeOrder()}>Оформить заказ</Button>
                </div>
            ) : (
                <div className='basket'>
                    <h1>Корзина товаров</h1>
                    <p>К сожалению, корзина пуста :(</p>
                    <Link to={'/'}><button>Вернуться к покупкам</button></Link>
                </div>
            )}

            <Modal show={showWindow} onHide={() => setShowWindow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title style={{ fontWeight: "bold", color: "green" }}>
                        Заказ успешно оформлен!
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ fontSize: "23px" }}>
                    Ваш заказ успешно оформлен. Спасибо за покупку!
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        className=" ms-auto fw-bold fs-5 w-20 btn-light"
                        variant="success"
                        onClick={() => setShowWindow(false)}
                        href="/"
                    >
                        Закрыть
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Basket;