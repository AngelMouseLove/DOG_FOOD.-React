import React from "react";

import Sort from "../Sort/sort";
import CardList from "../CardList/card-list";

const CatalogPage = ({ currentUser, searchQuery, cards, handleProductLike }) => {
    return (
        <>
            <Sort />
            <div className="content__cards">
                <CardList
                    goods={cards}
                    onProductLike={handleProductLike}
                    currentUser={currentUser}
                />
            </div>
        </>
    );
};

export default CatalogPage;