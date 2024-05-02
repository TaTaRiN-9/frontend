import React from "react";
import CircularProgress  from "@mui/material/CircularProgress";


const WithBookLoading = (Component) => {
    return function WithComponentLoading ({isLoading, ...props}) {
        if (!isLoading) return <Component {...props} />;
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