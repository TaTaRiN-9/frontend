import { useRef, useEffect, useState } from "react";
import "../style/index.css";


export const NavBar = () => {
    const lastScrollTop = useRef(0);
    const [isNavbarVisible, setIsNavbarVisible] = useState(true);

    const handleScroll = () => {
        const { pageYOffset } = window;
        if (
            pageYOffset > lastScrollTop.current
        ) {
            setIsNavbarVisible(false);
        } else if (
            pageYOffset < lastScrollTop.current
        ) {
            setIsNavbarVisible(true);
        }
        lastScrollTop.current = pageYOffset;
    }

    useEffect(() => {
        window.addEventListener(
            "scroll",
            handleScroll,
            { passive: true }
        );

        return window.removeEventListener(
            "scroll", handleScroll
        )
    }, []);

    return (
        <>
            <nav className={`${isNavbarVisible ? "visible" : ""}`}>
                <div className="nav-items">
                    <a href="/">Лого</a>
                </div>
                <div className="nav-items">
                    <a href="/">Книги</a>
                    <a href="/about">О нас</a>
                    <a href="/account">Личный кабинет</a>
                </div>
            </nav>
        </>
    )
}