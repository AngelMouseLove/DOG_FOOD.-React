import React from "react";
import notFound from '../../assets/images/notfound.jpg';
import { Link } from 'react-router-dom';
import s from '../NotFound/index.css'

const NotFound = () => {
    return (
        <>
            <div className={s.notFound}>
                <img src={notFound} className={s.image} aria-hidden="true" />
                <h1 className={s.title}>Сраница не найдена.</h1>
                <Link to="/" className="btn" >На главную</Link>
            </div>

        </>
    );
}

export default NotFound;