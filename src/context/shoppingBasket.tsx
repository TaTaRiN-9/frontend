import { useLocalStorage } from "../hooks/useLocalStorage";
import { ReactNode, createContext, useContext, useState, useEffect } from "react";

type ShoppingBookProviderProps = {
    children: ReactNode;
};

type BookItem = {
    id: number;
    quantity: number;
};

type shoppingBasket = {
    getBookQuantity: (id: number) => number;
    increaseBookQuantity: (id: number) => void;
    decreaseBookQuantity: (id: number) => void;
    removeFromBasket: (id: number) => void;
    setCardBooks: (items: BookItem[]) => void;
    bookQuantity: number;
    cardBooks: BookItem[];
};

const ShoppingBasketContext = createContext({} as shoppingBasket);

export function ShoppingBasketProvider({ children }: ShoppingBookProviderProps) {
    // начальное значения количества
    const [cardBooks, setCardBooks] = useLocalStorage<BookItem[]>(
        "books",
        []
    );

    // количество одной книги в корзине
    const bookQuantity = cardBooks.reduce(
        (quantity, item) => item.quantity + quantity,
        0
    );

    useEffect(() => {
        const updateDatabase = async () => {
            try {
                const email = localStorage.getItem('user');
                if (!email) {
                    console.log("Пользователь не был найден")
                    setCardBooks([]);
                    return;
                } else {
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
                                books: cardBooks
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
                }
            } catch (error) {
                console.log("Что-то пошло не так.. " + error);
            }
        }

        updateDatabase()
    }, [cardBooks, setCardBooks])

    // получения количества одной книги 
    function getBookQuantity(id: number) {
        return cardBooks.find((book) => book.id === id)?.quantity || 0;
    };

    function increaseBookQuantity(id: number) {
        setCardBooks((currentBook: BookItem[]) => {
            console.log(currentBook.find((book) => book.id === id));
            if (currentBook.find((book) => book.id === id) === undefined) {
                console.log(currentBook);
                return [...currentBook, { id, quantity: 1 }]
            }
            return currentBook.map((book) => {
                console.log(book)
                if (book.id === id) {
                    return { ...book, quantity: book.quantity + 1 };
                }
                console.log(book);
                return book;
            });
        });
    };

    function decreaseBookQuantity(id: number) {
        setCardBooks((currentBook) => {
            if (currentBook.find((book) => book.id === id)?.quantity === 1) {
                return currentBook.filter((book) => book.id !== id);
            }
            return currentBook.map((book) => {
                if (book.id === id) {
                    return { ...book, quantity: book.quantity - 1 };
                }
                return book;
            });
        });
    };

    function removeFromBasket(id: number) {
        setCardBooks((currentBook) => {
            return currentBook.filter((book) => book.id !== id);
        });
    };

    return (
        <ShoppingBasketContext.Provider 
            value={{
                getBookQuantity,
                increaseBookQuantity,
                decreaseBookQuantity,
                removeFromBasket,
                setCardBooks,
                cardBooks,
                bookQuantity
            }}>
            {children}
        </ShoppingBasketContext.Provider>
    )

}

export function useShoppingBasket() {
    return useContext(ShoppingBasketContext);
}