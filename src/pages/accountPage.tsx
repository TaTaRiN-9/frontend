import { useEffect, useState } from 'react';
import {Button} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const AccountPage = () => {
    const [isLog, setIsLog] = useState(true);

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setIsLog(false);
    }

    useEffect(() => {
        if (localStorage.getItem('user') === null) {
            navigate('/login', {replace: true})
        }
    }, [isLog]);
    
    return (
        <div className="account">
            <h1>Приветствую, {localStorage.getItem('user')}</h1>
            <Button variant='secondary' onClick={() => handleLogout()}>Выйти из аккаунта</Button>
        </div>
    )
}

export default AccountPage;