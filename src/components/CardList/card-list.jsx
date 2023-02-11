import Card from '../Card/card';
import './index.css';

const CardList = ({goods, onProductLike, currentUser}) => {
	console.log(goods)

	return (
		
		<div className='cards'>
			{
				goods.map( (item, index) => (
					<Card key={index} product={item} {...item} onProductLike={onProductLike} currentUser={currentUser} />
				))
			}
		</div>
	);
};

export default CardList;

