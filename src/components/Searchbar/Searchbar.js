import { Component } from 'react';
import PropTypes from 'prop-types';
// import { ToastContainer, toast } from 'react-toastify';
import { BiSearchAlt } from 'react-icons/bi';
import s from './Searchbar.module.css';


class Searchbar extends Component {
  
    static propTypes = {
    onSubmit: PropTypes.func,
  };

  state = {
    query: '',
  };

    // Изменение запроса
  
    handleChange = e => {
    this.setState({ query: e.currentTarget.value });
  };

    // Отправка запроса
    
  handleSubmit = e => {
      e.preventDefault();
      console.log('HS!')
    if (this.state.query.trim() === '') {
      alert('Please specify your query!');
      return;
    }
    this.props.onSubmit(this.state.query);
    this.setState({ query: '' });
  };

//   Разметка
    
  render() {
    const { query } = this.state;

      return (

          <header className={s.Searchbar}>
              <form className={s.SearchForm} onSubmit={this.handleSubmit}>
                  <button type="submit" className={s.SearchForm_button}>
                      <span className={s.SearchForm_button_label}><BiSearchAlt style={{ width: 30, height: 30 }}/>
                      </span>
                      
    </button>

    <input
                      className={s.SearchForm_input}
                      type="text"
                      name="query"
                      value={query}
                      onChange={this.handleChange}
      autoComplete="off"
      autoFocus
      placeholder="Search images and photos"
    />
  </form>
</header>
        
      
  
    );
  }
}

export default Searchbar;