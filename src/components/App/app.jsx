import React, { useState, useEffect } from 'react';
import Footer from '../Footer/footer';
import Header from '../Header/header';
import Logo from '../Logo/logo';
import Search from '../Search/search';
import Sort from '../Sort/sort';
import CatalogPage from '../Pages/CatalogPage';
import ProductPage from '../Pages/ProductPage';
import './index.css';
import SeachInfo from '../SeachInfo';
import api from '../../Api';
import useDebounce from '../../useDebounce';
import { Routes, Route } from 'react-router-dom';
import NotFound from '../NotFound/NotFound';
import Modal from '../Modal/Modal';
import RegistrationForm from '../Forms/Registration/RegistrationForm';
import AuthorizationForm from '../Forms/Authorization/AuthorizationForm'
import { UserContext } from '../../UserContext';
import { AUTH_TOKEN_KEY } from '../../constants';
import AuthInfo from '../AuthInfo/AuthInfo';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [cards, setCards] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [modalRegActive, setModalRegActive] = useState(false);
  const [modalAuthActive, setModalAuthActive] = useState(false);
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
      const newCards = cards.map((c) => { return c._id === newCard._id ? newCard : c });
      setCards(newCards);
    });
  }

  useEffect(() => {
    console.log(currentUser)
    let authToken = localStorage.getItem(AUTH_TOKEN_KEY)
    if (authToken) {
      if (!currentUser) {
        api.getUserInfo()
        .then((userData) => {
          setCurrentUser(userData);
        });
      } else {
           api.getProductList()
            .then((productData) => {
              setCards(productData.products);
             });
      }
    }
  },[currentUser]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleRequest();
  }

  const handleInputChange = (inputValue) => {
    setSearchQuery(inputValue);
  }

  const handleOnClickReg = () => {
    setModalRegActive(true)
  }

  const handleOnClickAuth = () => {
    setModalAuthActive(true)
  }

  function handleUpdateUser(userUpdate) {
    api.setUserInfo(userUpdate).then((newUserData) => {
      setCurrentUser(newUserData);
    });
  }

  return (
    <>
    <UserContext.Provider value={{currentUser, setCurrentUser}}>
    <Header>
        <>
          <Logo className="logo logo_place_header" href="/" />
          <Search onSubmit={handleFormSubmit} onInput={handleInputChange} />
          <AuthInfo onReg={handleOnClickReg} onAuth={handleOnClickAuth}/>
        </>
      </Header>
      <main className='content container'>
        <SeachInfo searchCount={cards.length} searchText={debounceValue} />
        <Sort />
        {currentUser == null && <h1>Авторизуйтесь</h1>}
        <div className='content__cards'>
          <Routes>
            <Route index element={
              currentUser &&
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
        <Modal active={modalRegActive} setActive={setModalRegActive}>
          <RegistrationForm setActive={setModalRegActive}/> 
        </Modal>

        <Modal active={modalAuthActive} setActive={setModalAuthActive}>
            <AuthorizationForm setActive={setModalAuthActive} />
        </Modal>
      </main>
      <Footer />
    </UserContext.Provider>
    </>
  )
}

export default App;

