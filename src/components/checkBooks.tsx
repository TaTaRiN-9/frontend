import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import '../style/card.css';
import { IBook } from '../models/IBook';
import { useShoppingBasket } from '../context/shoppingBasket';
import Book from './book';

interface Props {
    books: Array<IBook> | undefined;
}

const checkBook = (props: Props) => {
    if (!props) return <p>Нет книг</p>

    const books = props.books;

    if (books === undefined) return <p>Нет книг</p>;
    if (books.length > 0) {
        return (
            <div className='row card-book'>
                {books.map((book: IBook) => {
                    return (
                        <Book key={book.id} book={book}/>
                    );
                })}
            </div>
        )
    } else {
        return <p>Нет книг</p>
    }
}

export default checkBook;