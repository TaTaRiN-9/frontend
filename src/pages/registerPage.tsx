import { ChangeEvent, useEffect, useState, SyntheticEvent } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from "react-bootstrap/InputGroup";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FaRegEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RegisterPage = () => {
    const atLeastOneUppercase = /[A-ZА-Я]/g; // Заглавные буквы from A to Z
    const atLeastOneLowercase = /[a-zа-я]/g; // Маленькие буквы from a to z
    const atLeastOneNumeric = /[0-9]/g; // числа от 0 до 9
    const atLeastOneSpecialChar = /[#?!@$%^&*-]/g; // Хотя бы один специальный символ
    const eightCharsOrMore = /.{8,}/g; // больше 8 символов

    const [email, setUserState] = useState("");
    const [password, setPasswordState] = useState("");
    // регулирует видимость измерителя надежности пароля
    const [meter, setMeter] = useState(false);
    const [showPass, setShowPass] = useState(false);
    const [sendAuthorizate, setSendAuthorizate] = useState(false);
    const [showErrorEmail, setShowErrorEmail] = useState(false);
    const [errorRequest, setErrorRequest] = useState(false);

    const navigate = useNavigate();

    const passwordTracker = {
        uppercase: password.match(atLeastOneUppercase),
        lowercase: password.match(atLeastOneLowercase),
        number: password.match(atLeastOneNumeric),
        specialChar: password.match(atLeastOneSpecialChar),
        eightCharsOrGreater: password.match(eightCharsOrMore),
    }
    // переменная, значение которое получается из количества верных значений в passwordTracker
    const passwordStrength = Object.values(passwordTracker).filter(
        (value) => value
    ).length;

    useEffect(() => {
        if ((email.indexOf('@') >= 0) && (email.indexOf('.') >= 0) && passwordStrength === 5) {
            setSendAuthorizate(true);
            setShowErrorEmail(false);
        }
        else {
            setSendAuthorizate(false);
        }
    }, [passwordStrength, password, email])

    useEffect(() => {
        if (errorRequest === true) {
            setErrorRequest(false);
        }
    }, [email])

    function handleEmailChange(event: ChangeEvent<HTMLInputElement>) {
        setUserState(event.target.value);
    }

    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPasswordState(event.target.value);
    }

    const handleShowPassword = () => {
        setShowPass(!showPass);
    }

    const handleSubmit = async (event: SyntheticEvent) => {
        event.preventDefault();
        if (sendAuthorizate) {
            try {
                const response = await axios.post(
                    "https://localhost:7250/Auth/register",
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
        }
    }

    return (
        <div className="register">
            <h1>Регистрация</h1>
            {errorRequest && <p style={{color: 'red'}}>Пользователь с таким email уже существует!</p>}
            <Form onSubmit={handleSubmit}>
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
                            onFocus={() => setMeter(true)}
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
                {meter && (
                    <div>
                        <div className="password-strength-meter"></div>
                        <div>
                            {passwordStrength < 5 && 'Пароль должен иметь '}
                            {!passwordTracker.uppercase && 'заглавную букву, '}
                            {!passwordTracker.lowercase && 'строчную букву, '}
                            {!passwordTracker.specialChar && 'специальный символ, '}
                            {!passwordTracker.number && 'цифру, '}
                            {!passwordTracker.eightCharsOrGreater &&
                                'восемь символов или больше'}
                        </div>
                    </div>
                )}
                <Button className="authUserButton" variant="secondary"
                    type="submit">
                    Зарегистрироваться
                </Button>
            </Form>
            <div className="divNavigate">
                <p><a href="/login">Уже есть аккаунт?</a></p>
            </div>
            <style>
                {`
                .password-strength-meter::before {
                    content: "";
                    background-color: ${['red', 'orange', '#ffd61d', '#b9e640', '#0ce052']
                    [passwordStrength - 1] || ''
                    };
                    height: 100%;
                    width: ${(passwordStrength / 5) * 100}%;
                    display: block;
                    border-radius: 3px;
                    transition: width 0.2s;
                }`}
            </style>
        </div>
    )
}

export default RegisterPage;