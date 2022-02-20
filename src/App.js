import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import fetchData from 'api/pixabayApi';
import  Container  from 'components/Container';
import  Searchbar  from 'components/Searchbar';
import  ImageGallery  from 'components/ImageGallery';
// import  ImageGalleryItem  from 'components/ImageGalleryItem';
import  Button  from 'components/Button';
import { AfterButton } from 'components/Button/AfterButton';
import  Modal  from 'components/Modal';
import Loader from 'components/Loader';

// import s from './App.module.css';


const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  PENDING_MORE: 'pending_more',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};
const params = {
  API_KEY: '25433386-4f25aa275c005ef248c74251b',
  image_type: 'photo',
  orientation: 'horizontal',
  PER_PAGE: 12,
}

function App() {
  
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState(null);
  const [total, setTotal] = useState(0);
  const [tags, setTags] = useState('');
  const [status, setStatus] = useState(Status.IDLE);

  // state = {
  //   images: [],
  //   query: '',
  //   error: null,
  //   page: 1,
  //   showModal: false,
  //   largeImageURL: null,
  //   status: Status.IDLE,
  // };

  // Произошло обновление query или page? Запрос. 

  useEffect(() => {
    if (query === '') return;
    fetchImages();
    setStatus(Status.PENDING);
    
  }, [query, page]);
  
  // useEffect(() => {
  //   setStatus(Status.PENDING_MORE);
  //   fetchData();
  // }, [page]);
  
  // componentDidUpdate(prevProps, prevState) {
  
  //   const { images, query, page  } = this.state;
  //   const loadNextPage = (page !== prevState.page && page !== 1);
     
  //   // Запуск функции - запроса
  //   if (query !== prevState.query || loadNextPage) {
           
  //     if (loadNextPage) { this.setState({ status: Status.PENDING_MORE }) }
  //     if (images.length === 0) { this.setState({ status: Status.PENDING }) }
      
  //     this.fetchImages();
  //  }
  // }

  // Функция - запрос
  
  const fetchImages = () => {
        
    fetchData(query, page, params)
      .then(({ hits, totalHits }) => {

        console.log(hits, totalHits)

        const totalPages = Math.ceil(totalHits / params.PER_PAGE);

        if (!hits.length) {
          return toast.error('Sorry, no images found. Please, try again!');
        }
        if (page === 1) {
          toast.success(`Hooray! We found ${totalHits} images.`);
        }
        if (page === totalPages) {
          toast.info("You've reached the end of search results.");
        }
      
        const newImages = hits.map(({ id, webformatURL, largeImageURL, tags }) => {
          return {
            id,
            webformatURL,
            largeImageURL,
            tags,
          };
        });
      
        setImages([...images, ...newImages]);
        setTotal(totalHits);
        setStatus(Status.RESOLVED);
        
        // this.setState(({ images }) => ({
        //   images: [...images, ...newImages],
        //   total: totalHits,
        //   status: Status.RESOLVED
      })
      .catch(error =>
        setError(error),
        setStatus(Status.REJECTED))
  }

   
  // Методы
  
  const handleSearchSubmit = query => {

    //  if (query === this.state.query) return;
    setQuery(query);
    setPage(1);
    setImages([]);
    setError(null);
  };

  const toggleModal = (largeImageURL, tags) => {
    setShowModal(!showModal);
    setLargeImageURL(largeImageURL);
    setTags(tags);
  };

  const onLoadMore = () => {
    setPage(page => page + 1);
               };
  

  // Разметка

  // render() {
// const { images, error, showModal, largeImageURL, tags, total, status } =
//       this.state;
    
    const loadMoreBtn =
      status === 'resolved'
      && images.length !== 0
      && images.length !== total;

return (
  <Container>
      
    <Searchbar
      onSubmit={handleSearchSubmit}
    />
       
    {status === 'rejected' && toast.error(error.message)}

    {status === 'idle' && <div style={{ margin: 'auto' }}>PLEASE, INPUT A QUERY ! </div>}
                     
    {(status === 'resolved' || status === 'pending_more') && <ImageGallery images={images} onClick={toggleModal} />}
    {loadMoreBtn && <Button onClick={onLoadMore}>Load more</Button>}
    {status === 'pending_more' && <AfterButton>Loading...</AfterButton>}
        
    {(status === 'pending' || status === 'pending_more') && <Loader />}
        
    {showModal && (
      <Modal onClose={toggleModal}>
        <img src={largeImageURL} alt={tags} />
      </Modal>
    )}
            
    <ToastContainer theme="colored" position="top-right" autoClose={5000} />
  </Container>
);
    

}
export default App;
