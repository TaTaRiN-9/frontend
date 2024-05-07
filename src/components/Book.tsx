import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import '../style/card.css';
import { IBook } from '../models/IBook';

interface Props {
    books: Array<IBook>
}

const Book = (props: Props) => {
    const books = props.books;

    if (!books) return <p>Нет книг</p>;
    if (books.length > 0) {
        return (
            <div className='row'>
                {books.map((book) => {
                    return (
                        <Card className='book' key={book.id} style={{ width: '18rem' }}>
                            <Card.Body>
                                <Card.Title>
                                    {book.title}
                                </Card.Title>
                                <Card.Text>
                                    {book.description}
                                </Card.Text>
                                <Button variant="primary">Go somewhere</Button>
                            </Card.Body>
                        </Card>
                    );
                })}
            </div>
        )
    } else {
        return <p>Нет книг</p>
    }
}

export default Book;