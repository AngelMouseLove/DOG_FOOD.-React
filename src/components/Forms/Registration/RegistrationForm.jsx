import './RegistrationForm.css';
import { useForm } from 'react-hook-form';
import api from '../../../Api';
import { useState, useEffect } from 'react';
import {PASS_REGEXP, EMAIL_REGEXP} from '../../../constants';

function RegistrationForm({setActive}) {

  const { register, handleSubmit, reset, formState: { errors } } = useForm({ mode: "onBlur" });
  const [apiErrorMsg, setApiErrorMsg] = useState(null);

  const onSubmit = (data) => {
    let userInfo = {...data, group: "group-10"}
    api.registration(userInfo)
      .then((res) => {
        if (res.ok) {
          setActive(false);
          alert('Регистрация прошла успешно : ' + userInfo.email)
          reset();
          setApiErrorMsg("");
        } else {
          setApiErrorMsg(`Ошибка! Status Code: ${res.status} ${res.statusText}`)
        }
      });

  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Регистрация</h2>
      <input
        {...register('name', { required: 'Обязательное поле.' })}
        type="text"
        placeholder="Имя"
      />

      {errors?.name && <p className='errorMessage'>{errors?.name?.message}</p>} 

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

      <button>Зарегистрироваться</button>
      {apiErrorMsg && <p className='errorMessage'>{apiErrorMsg}</p>}
    </form>
  );
};

export default RegistrationForm;