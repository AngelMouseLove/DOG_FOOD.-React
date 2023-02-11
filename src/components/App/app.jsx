import { useState, useEffect } from 'react';
import CardList from '../CardList/card-list';
import Footer from '../Footer/footer';
import Header from '../Header/header';
import Logo from '../Logo/logo';
import Search from '../Search/search';
import Sort from '../Sort/sort';
import './index.css';
//import data from '../../assets/data.json';
import SeachInfo from '../SeachInfo';
import api from '../../Api';
import useDebounce from '../../useDebounce';

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
			const newCards = cards.map((c) => {console.log('Карточка в переборе', c); console.log('Карточка в c сервера', newCard); return c._id === newCard._id ? newCard : c});
			setCards(newCards);
		});
	}

  useEffect(() => {
    handleRequest()
    console.log("INPUT", debounceValue);
  },[debounceValue])


  // useEffect(() => {
  //     api.getUserInfo().then((userData) => {
  //       setCurrentUser(userData);
  //     });
  //     api.getProductList().then((cardData) => {
  //         setCards(cardData);
  //       });
  //   }, []);

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
          <Search onSubmit={handleFormSubmit} onInput={handleInputChange}/>
        </>
      </Header>
      <main className='content container'>
      <SeachInfo searchCount={cards.length} searchText={debounceValue}/>
       <Sort/>
        <div className='content__cards'>
         <CardList goods={cards}  onProductLike={handleProductLike} currentUser={currentUser}/>
        </div>
      </main>
      <Footer/>
    </>
  )
}

export default App;

