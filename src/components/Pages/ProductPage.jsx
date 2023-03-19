import React, { useEffect, useState } from "react";

import api from "../../Api";
import Card from "../Card/card";
import { useParams, useNavigate } from "react-router-dom";
import NotFound from "../NotFound/NotFound";


const ProductPage = ({ currentUser, handleProductLike }) => {
    const [product, setProduct] = useState([]);
    const [errorState, setErrorState] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        api.getProductById(id)
            .then((productData) => {
                setProduct(productData);
            })
            .catch(err => setErrorState(true))
    }, []);

    return (
        <>
            <a className="button-back" href="#" onClick={() => navigate(-1)}>Назад</a>
            {product.length === 0 || errorState ? null : <Card product={product} {...product} currentUser={currentUser} onProductLike={handleProductLike} />}
            {errorState && <NotFound />}
        </>
    );
}

export default ProductPage;