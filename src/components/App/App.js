import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import fetchData from 'Api/pixabayApi';
import  Container  from 'components/Container';
import  Searchbar  from 'components/Searchbar';
import  ImageGallery  from 'components/ImageGallery';
import  Button  from 'components/Button';
import  Modal  from 'components/Modal';
import  Loader  from 'components/Loader';



const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export class App extends Component {

  state = {
    images: [],
    query: '',
    error: null,
    page: 1,
    showModal: false,
    largeImageURL: null,
    status: Status.IDLE,
  };

  // Произошло обновление
  
  componentDidUpdate(prevProps, prevState) {
  
    const { query, page } = this.state;
  
    // Запуск функции - запроса

    if (query !== prevState.query ||
      (page !== prevState.page && page !== 1)) {
      this.fetchImages();
    }
  }

  // Функция - запрос

  fetchImages = () => {
    const { query, page } = this.state;
    const perPage = 12;

    this.setState({ status: Status.PENDING });
  
    console.log(query, page, perPage)

    fetchData(query, page, perPage)
      .then(({ hits, totalHits }) => {

        console.log(hits, totalHits)

        const totalPages = Math.ceil(totalHits / perPage);

if (hits.length === 0) {
          return toast.error('Sorry, no images found. Please, try again!');
        }

        if (page === 1) {
          toast.success(`Hooray! We found ${totalHits} images.`);
        }

        if (page === totalPages) {
          toast.info("You've reached the end of search results.");
        }

        const data = hits.map(({ id, webformatURL, largeImageURL, tags }) => {
          return {
            id,
            webformatURL,
            largeImageURL,
            tags,
          };
        });
        this.setState(({ images }) => ({
          images: [...images, ...data],
          // page: page + 1,
          total: totalHits,
        }));
      })
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false })


      )
  }
 
  
  
  
  handleSearchSubmit = query => {
    this.setState({ query });
  };

  render() {


    return (
      <Container>
      
        <Searchbar onSubmit={this.handleSearchSubmit} />
      
        
        <ToastContainer theme="colored" position="top-right" autoClose={3000} />
      </Container>
      
    )
  }
}
