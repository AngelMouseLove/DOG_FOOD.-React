import s from './index.module.css';
import cn from 'classnames';
import { useState } from 'react';


function Header({user, onUpdateUser, children}) {

  const [name, setName] = useState(user.name);
  const [about, setAbout] = useState(user.about);

  const handleClickButtonEdit = (e) => {
		e.preventDefault();
		onUpdateUser({name: name, about: about})
	}

  return (
    <header className={cn(s.header,'cover')}>
      <div className="container">
        <div className={s.wrapper}>
          {children}
        </div>
      </div>

      <input type="text" 
             value={user.name} 
             onChange={(e) => {
                setName(e.target.value);
              }}/>

      <input type="text" 
             value={user.about} 
             onChange={(e) => {
              setAbout(e.target.value);
              }}/>

      <button onClick={handleClickButtonEdit} className="btn btn_type_secondary">
        Изменить
      </button>
    </header>
  )
}

export default Header;

