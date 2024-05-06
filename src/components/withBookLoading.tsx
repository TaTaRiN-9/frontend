import React from "react";
import CircularProgress  from "@mui/material/CircularProgress";

const WithBookLoading = (Component : React.ElementType) => {
    return function WithComponentLoading ({isLoading, ...books}: {isLoading: Boolean, books: null}) {
        if (!isLoading) return <Component {...books} />;
        return (
            <div className="container-loading">
                <p>
                    Погоди, запрос данных может занять некоторое время...
                </p>
                <CircularProgress />
            </div>
        );
    };
}

export default WithBookLoading;