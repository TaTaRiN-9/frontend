import React, {useState, useEffect} from "react";
import WithBookLoading from "./withBookLoading";
import Book from "./Book";

const AllBook = () => {
    const BookLoading = WithBookLoading(Book);
    const [appState, setAppState] = useState({
        loading: false,
        books: null,
    });
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        setAppState({loading: true, books: null});
        
        const apiUrl = 'https://localhost:7250/books';

        fetch(apiUrl)
        .then(res => {
            return res.json();
        })
        .then((res) => {
            return setAppState({loading: false, books: res})
        })
        .catch((error) => {
            setHasError(true);
        })

    }, [setAppState]);


    if (hasError === false) {
        return (
            <div className="books">
                <div>
                    <h1 className="h1-class">Мои книги</h1>
                </div>
                <div className="card-book">
                    <BookLoading isLoading={appState.loading} books={appState.books} />
                </div>
            </div>
        )}
    else {
        return (
            <>
                <h1>Книги не найдены</h1>
            </>
        )
    }
}

export default AllBook;