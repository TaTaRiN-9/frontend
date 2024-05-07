import {useEffect} from "react";
import WithBookLoading from "./withBookLoading";
import Book from "./Book";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import {fetchBooks} from "../store/Reducers/ActionCreators";

const AllBook = () => {
    const dispatch = useAppDispatch();
    const {books, isLoading, error} = useAppSelector(state => state.bookReducer)

    const BookLoading = WithBookLoading(Book);

    useEffect(() => {
       dispatch(fetchBooks())
    }, []);

    console.log(error);

    if (error === null) {
        return (
            <div className="books">
                <div>
                    <h1 className="h1-class">Мои книги</h1>
                </div>
                <div className="card-book">
                    <BookLoading isLoading={isLoading} books={books} />
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