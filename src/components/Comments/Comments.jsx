import { useState, useEffect } from 'react';
import api from '../../Api';
import './Comments.css'
import { useForm } from 'react-hook-form';

const Comments = ({ productId }) => {
    const [reviews, setReviews] = useState([]);

    const [tempReview, setTempReview] = useState([]);

    const { register, handleSubmit, reset, formState: { errors } } = useForm({ mode: "onBlur" });


    useEffect(() => {
        api.getReviewsByProduct(productId).then(reviews => setReviews(reviews));
    }, [tempReview])


    const onSubmit = (data) => {
        console.log(data)
        api.addCommentToProduct(productId, data).then(res => {
            setTempReview([...tempReview, res])
        })
        
        reset();
    }

    console.log(reviews)

    return(
<>
  <h2>Отзывы о товаре</h2>
  <div className="reviews">
    {
        reviews.map(review => 
            <div className="review">
                <div className="author">{review.author.name}</div>
                <div className="date">{review.created_at}</div>
                <div className="rating">{review.rating}</div>
                <div className="text">{review.text}</div>
            </div>
            )
    }
  </div>

  <form className='add-review' onSubmit={handleSubmit(onSubmit)}>
    <select {...register('rating', {required: true})}>
      <option value="" disabled selected>Оцените товар от 1 до 5</option>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
    </select>
    <textarea placeholder="Напишите свой отзыв" {...register('text', {required: true})}></textarea>
    <button type="submit">Оставить отзыв</button>
  </form>
  </>
    );

}

export default Comments