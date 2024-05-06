import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
    const error : any = useRouteError();
    console.log(error);

    return (
        <div id="error-page">
            <h1>Что-то пошло не так :(</h1>
            <p>Извините, произошла неожидаемая ошибка</p>
            <p>
                <i>{error.status}</i>
                <br />
                <i>{error.statusText || error.message}</i>
            </p>

        </div>
    )
}

export default ErrorPage;