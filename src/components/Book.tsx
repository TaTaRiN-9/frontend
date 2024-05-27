import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import '../style/card.css';
import { IBook } from '../models/IBook';
import { useShoppingBasket } from '../context/shoppingBasket';

interface Props {
    book: IBook;
}

const Book = (props: Props) => {
    const {
        getBookQuantity,
        increaseBookQuantity,
        decreaseBookQuantity,
        removeFromBasket,
    } = useShoppingBasket();

    const book = props.book;

    const quantity = getBookQuantity(book.id);

    return (
        <Card className='book' key={book.id} style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>
                    {book.title}
                </Card.Title>
                <Card.Text>
                    {book.description}
                </Card.Text>
                {quantity === 0 ? 
                    <div className='card_button'>
                        <div style={{
                            fontSize: '19px', 
                            marginBottom: '5px'}}><strong>{book.price} руб</strong></div>
                        <Button variant="primary" 
                            onClick={() => increaseBookQuantity(book.id)}>Добавить в корзину
                        </Button>
                    </div> : 
                    <div className='card_button'>
                        <div style={{fontSize: '19px'}}><strong>{book.price} руб</strong></div>
                        
                        <Button className='increaseQuantity' onClick={() => increaseBookQuantity(book.id)}>
                            +
                        </Button>
                        <span className="spanQuantity">
                            {quantity}
                        </span>
                        <Button className='increaseQuantity' onClick={() => decreaseBookQuantity(book.id)}>
                            -
                        </Button>
                        <Button variant='danger' className='removeQuantity' onClick={() => removeFromBasket(book.id)}>
                            Удалить
                        </Button>
                    </div>
                }
                

            </Card.Body>
        </Card>
    );
}

export default Book;