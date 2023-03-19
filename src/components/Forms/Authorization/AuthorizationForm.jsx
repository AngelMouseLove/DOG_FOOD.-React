import './AuthorizationForm.css';
import { useForm } from 'react-hook-form';
import api from '../../../Api';
import { useState, useContext } from 'react';
import {PASS_REGEXP, EMAIL_REGEXP, AUTH_TOKEN_KEY} from '../../../constants';
import { UserContext } from '../../../UserContext';

function RegistrationForm({setActive}) {

  const { register, handleSubmit, reset, formState: { errors } } = useForm({ mode: "onBlur" });
  const [apiErrorMsg, setApiErrorMsg] = useState(null);
  const {currentUser, setCurrentUser} = useContext(UserContext);

  const onSubmit = (data) => {

    api.authorization(data).then(res => {
      console.log(res)
      setCurrentUser(res.data);
      localStorage.setItem(AUTH_TOKEN_KEY, res.token);
      setActive(false);
      reset();
      setApiErrorMsg("");
    }).catch(err => { 
      console.log(err)
      setApiErrorMsg(err.includes('401') ? 'Неправильное имя пользователя и/или пароль' : `Ошибка! ${err}`)
    });

  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Авторизация</h2>

      <input
        {...register('email', {
          required: 'Обязательное поле.',
          pattern: {
            value: EMAIL_REGEXP,
            message: "Введите правильную почту."
          }
        })}
        type="text"
        placeholder="Email"
      />

      {errors?.email && <p className='errorMessage'>{errors?.email?.message}</p>}

      <input
        {...register('password', {
          required: 'Обязательное поле.',
          pattern: {
            value: PASS_REGEXP,
            message: "Пароль должен содержать минимум восемь символов, одну букву латинского алфавита и одну цифру"
          }
        })}
        type="password"
        placeholder="Password"
      />
       {errors?.password && <p className='errorMessage'>{errors?.password?.message}</p>}

      <button>Войти</button>
      {apiErrorMsg && <p className='errorMessage'>{apiErrorMsg}</p>}
    </form>
  );
};

export default RegistrationForm;