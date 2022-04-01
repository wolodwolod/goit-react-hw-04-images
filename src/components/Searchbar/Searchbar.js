import { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { BiSearchAlt } from 'react-icons/bi';
import s from './Searchbar.module.css';


function Searchbar({ onSubmit }) {
  console.log('rend SB');
  

  const [query, setQuery] = useState('');

    // Изменение запроса
  
    const handleChange = e => {
    setQuery(e.currentTarget.value);
  };

    // Отправка запроса
    
  const handleSubmit = e => {
      e.preventDefault();
      console.log('HS!')
    if (query.trim() === '') {
      toast.warn('Please specify your query!');
      return;
    }
    onSubmit(query);
    
      setQuery('');
  };

//   Разметка
    
 
      return (

          <header className={s.Searchbar}>
              <form className={s.SearchForm} onSubmit={handleSubmit}>
                  <button type="submit" className={s.SearchForm_button}>
                      <span className={s.SearchForm_button_label}><BiSearchAlt style={{ width: 30, height: 30 }}/>
                      </span>
                      
    </button>

    <input
                      className={s.SearchForm_input}
                      type="text"
                      name="query"
                      value={query}
                      onChange={handleChange}
      autoComplete="off"
      autoFocus
      placeholder="Search images and photos"
    />
  </form>
</header>
        
      
  
    );
  }
Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};

export default memo(Searchbar);