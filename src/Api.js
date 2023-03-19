const onResponce = (res) => {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
};

class Api {
    constructor({ baseUrl }) {
        const headers = {
            authorization: this.getToken(),
            "Content-Type": "application/json"
        };
        this._requestInit = {
            headers: headers,
        };
        this._baseUrl = baseUrl;
    }

    getToken() {
        return "Bearer " + localStorage.getItem('my-sber-token');
    }

    getProductList() {
        return fetch(`${this._baseUrl}/products`, this._requestInit).then(onResponce);
    }

    getProductById(id) {
        return fetch(`${this._baseUrl}/products/${id}`, this._requestInit).then(onResponce);
    }

    getReviewsByProduct(id) {
        return fetch(`${this._baseUrl}/products/review/${id}`, this._requestInit).then(onResponce);
    }

    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, this._requestInit).then(onResponce);
    }

    getUsers() {
        return fetch(`${this._baseUrl}/users`, this._requestInit).then(onResponce);
    }

    search(searchQuery) {
        return fetch(
            `${this._baseUrl}/products/search?query=${searchQuery}`,
            this._requestInit
        ).then(onResponce)
    }

    changeLikeProductStatus(productID, like) {
        // Обычная реализация: 2 разных метода для удаления и постановки лайка.
        return fetch(`${this._baseUrl}/products/likes/${productID}`, {
            method: like ? "PUT" : "DELETE",
            headers: {
                authorization: this.getToken(),
                "Content-Type": "application/json",
            },
        }).then(onResponce);
    }

    addCommentToProduct(productID, body) {
        return fetch(`${this._baseUrl}/products/review/${productID}`, {
            method: "POST",
            headers: {
                authorization: this.getToken(),
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body)
        })
    }

    registration(userInfo) {
        return fetch(`${this._baseUrl}/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userInfo)
        })
    }

    authorization(loginPassPair) {
        return fetch(`${this._baseUrl}/signin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(loginPassPair)
        }).then(onResponce)
    }

}

const config = {
    baseUrl: 'https://api.react-learning.ru'
}

const api = new Api(config)

export default api;