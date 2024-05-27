import { Button, Form, InputGroup } from 'react-bootstrap';
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FaRegEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ChangeEvent, useEffect, useState, SyntheticEvent } from "react";
import axios from 'axios';

const LoginPage = () => {
    const [email, setUserState] = useState("");
    const [password, setPasswordState] = useState("");

    const [showPass, setShowPass] = useState(false);
    const [sendAuthorizate, setSendAuthorizate] = useState(false);
    const [showErrorEmail, setShowErrorEmail] = useState(false);
    const [errorRequest, setErrorRequest] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (event: SyntheticEvent) => {
        event.preventDefault();
        if (sendAuthorizate) {
            try {
                const response = await axios.post(
                    "https://localhost:7250/Auth/login",
                    { email: email, password: password }
                  );
                
                  localStorage.setItem("token", "Bearer " + response.data.access_token);
                  localStorage.setItem("user", email)
                  navigate("/", {replace: true})
            } catch (e: any) {
                console.log(e);
                setErrorRequest(true);
            }
        } else {
            setShowErrorEmail(true);
        };
    };

    useEffect(() => {
        if ((email.indexOf('@') >= 0) && (email.indexOf('.') >= 0)) {
            setSendAuthorizate(true);
            setShowErrorEmail(false);
        }
        else {
            setSendAuthorizate(false);
        }
    }, [email]);

    function handleEmailChange(event: ChangeEvent<HTMLInputElement>) {
        setUserState(event.target.value);
    }

    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPasswordState(event.target.value);
    }

    const handleShowPassword = () => {
        setShowPass(!showPass);
    }

    return (
        <div className="login">
            <h1>Вход</h1>
            <Form onSubmit={handleSubmit}>
                {errorRequest && <p style={{color: 'red', margin: '-2px 0 2px 0'}}>Неверно логин или пароль</p>}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    {showErrorEmail &&
                        <p style={{ color: 'red', margin: '-2px 0 2px 0' }}>
                            Email должен быть оформлен верно.
                        </p>}
                    <Form.Control type="email" placeholder="Введите email" onChange={handleEmailChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Пароль</Form.Label>
                    <InputGroup className='mt-3'>
                        <Form.Control
                            type={showPass ? "text" : "password"}
                            placeholder="Введите пароль"
                            onChange={handlePasswordChange}
                            value={password}
                            name="password" />
                        <InputGroup.Text>
                            <i onClick={handleShowPassword}>
                                {showPass ? <MdOutlineRemoveRedEye /> : <FaRegEyeSlash />}
                            </i>
                        </InputGroup.Text>
                    </InputGroup>
                </Form.Group>

                <Button className="authUserButton" variant="secondary"
                    type="submit">
                    Войти
                </Button>
            </Form>
            <div className='divNavigate'>
                <p><a href="/register">Ещё нет аккаунта?</a></p>
            </div>
        </div>
    )
}

export default LoginPage;