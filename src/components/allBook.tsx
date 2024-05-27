import { useEffect, useState } from "react";
import WithBookLoading from "./withBookLoading";
import Book from "./checkBooks";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { fetchBooks } from "../store/Reducers/ActionCreators";

const AllBook = () => {
    // сортировка нужна будет позже
    // const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    // const [names, setNames] = useState<string>("");
    // const [sortByPriceAsc, setSortByPriceAsc] = useState<boolean>(true);
    // const [sortstr, setsortstr] = useState<string>("");

    // const [isSearchVisible, setIsSearchVisible] = useState(false);
    // const [showSearch, setShowSearch] = useState<boolean>(false);


    const dispatch = useAppDispatch();
    const { books, isLoading, error } = useAppSelector(state => state.bookReducer)

    const BookLoading = WithBookLoading(Book);

    useEffect(() => {
        dispatch(fetchBooks())
    }, []);

    if (error === null) {
        return (
            <div className="books">
                <div>
                    <h1 className="h1-class">Каталог книг</h1>
                </div>
                <div>
                    <BookLoading isLoading={isLoading} books={books} />
                </div>
            </div>
        )
    }
    else {
        return (
            <>
                <h1>Каталог книг</h1>
                <p>Что-то пошло не так, попробуйте позже :(</p>
            </>
        )
    }
}

export default AllBook;