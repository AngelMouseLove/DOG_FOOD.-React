import { useState, useEffect } from 'react';
import Footer from '../Footer/footer';
import Header from '../Header/header';
import Logo from '../Logo/logo';
import Search from '../Search/search';
import Sort from '../Sort/sort';
import CatalogPage from '../Pages/CatalogPage';
import ProductPage from '../Pages/ProductPage';
import './index.css';
//import data from '../../assets/data.json';
import SeachInfo from '../SeachInfo';
import api from '../../Api';
import useDebounce from '../../useDebounce';
import { Routes, Route } from 'react-router-dom';
import NotFound from '../NotFound/NotFound';

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const debounceValue = useDebounce(searchQuery, 500);

  const handleRequest = async () => {
    if (!debounceValue) {
      const allCards = await api.getProductList();
      setCards(allCards.products);
    } else {
      const filterCards = await api.search(debounceValue);
      setCards(filterCards);
    }
  }

  function handleProductLike(product) {
    const isLiked = product.likes.some(id => id === currentUser._id) //ищем в массиве лайков id текущего пользователя;
    api.changeLikeProductStatus(product._id, !isLiked).then((newCard) => { // в зависимсоти от того есть лайки или нет отправляем запрос PUT или DELETE
      const newCards = cards.map((c) => { console.log('Карточка в переборе', c); console.log('Карточка в c сервера', newCard); return c._id === newCard._id ? newCard : c });
      setCards(newCards);
    });
  }

  useEffect(() => {
    handleRequest()
  }, [debounceValue])

  useEffect(() => {
    Promise.all([api.getProductList(), api.getUserInfo()])
      .then(([productData, userData]) => {
        setCurrentUser(userData);
        setCards(productData.products);
      });
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleRequest();
  }

  const handleInputChange = (inputValue) => {
    setSearchQuery(inputValue);
  }

  function handleUpdateUser(userUpdate) {
    api.setUserInfo(userUpdate).then((newUserData) => {
      setCurrentUser(newUserData);
    });
  }

  return (
    <>
      <Header user={currentUser} onUpdateUser={handleUpdateUser}>
        <>
          <Logo className="logo logo_place_header" href="/" />
          <Search onSubmit={handleFormSubmit} onInput={handleInputChange} />
        </>
      </Header>
      <main className='content container'>
        <SeachInfo searchCount={cards.length} searchText={debounceValue} />
        <Sort />
        <div className='content__cards'>
          <Routes>
            <Route index element={
              <CatalogPage
                currentUser={currentUser}
                searchQuery={searchQuery}
                cards={cards}
                handleProductLike={handleProductLike}
              />
            }
            />
            <Route path="/product/:id" element={
              <ProductPage
                currentUser={currentUser}
                handleProductLike={handleProductLike}
              />
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default App;

