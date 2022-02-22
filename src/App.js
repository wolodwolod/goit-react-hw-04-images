import { useState, useEffect } from 'react';
// import  usePrevious  from 'helper/usePrevious';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import fetchData from 'api/pixabayApi';

import  Container  from 'components/Container';
import  Searchbar  from 'components/Searchbar';
import  ImageGallery  from 'components/ImageGallery';

import  Button  from 'components/Button';
import { AfterButton } from 'components/Button/AfterButton';
import  Modal  from 'components/Modal';
import Loader from 'components/Loader';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  PENDING_MORE: 'pending_more',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

const PER_PAGE = 12;


const App = () => {
  
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [error, setError] = useState(null);
  const [total, setTotal] = useState (0);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState(Status.IDLE);

    const [modal, setModal] = useState({
        open: false,
        largeImageURL: null,
        tags: '',        
    });


  useEffect(() => {
    const prevPage = prevState => { return prevState.page };
    const loadNextPage = (page !== prevPage && page !== 1);
   
    // Функция - запрос
          
    const fetchImages = async () => {
      try {
        const { hits, totalHits } = await fetchData(query, page, PER_PAGE);
        console.log(hits, totalHits);

        const totalPages = Math.ceil(totalHits / PER_PAGE);
                 

        if (!hits.length) {
          setStatus(Status.IDLE)
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
        
        setImages(prevImages => [...prevImages, ...newImages]);
        setTotal(totalHits);
        setStatus(Status.RESOLVED);
      }
      
      catch (error) {
        setError(error);
          setStatus(Status.REJECTED)
      }
    }
        
      // Вызов функции запроса 
    
    if (query === "") return;

    
    
    fetchImages();

if (loadNextPage) { setStatus(Status.PENDING_MORE) }
    else { setStatus(Status.PENDING) }
    
        
  }, [query, page]);  
  
   
  // Функции
  
  const handleSearchSubmit = query => {

    setQuery(query);
    setPage(1);
    setImages([]);
    setError(null);
  };

  const openModal = (largeImageURL, tags) => {
    setModal({
      open: true,
      largeImageURL: largeImageURL,
      tags: tags,
    });
  }
    
  const closeModal = (largeImageURL, tags) => {
    setModal({
      open: false,
      largeImageURL: null,
      tags: '',
    });
  }
      
    const onLoadMore = () => {
    setPage(page => page + 1);
               };
  

  // Разметка

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
                     
    {(status === 'resolved' || status === 'pending_more') && <ImageGallery images={images} onClick={openModal} />}
    {loadMoreBtn && <Button onClick={onLoadMore}>Load more</Button>}
    
    {status === 'pending_more' && <AfterButton>Loading...</AfterButton>}
        
    {(status === 'pending' || status === 'pending_more') && <Loader />}
        
    {modal.open && (
      <Modal onClose={closeModal}>
        <img src={modal.largeImageURL} alt={modal.tags} />
      </Modal>
    )}
            
    <ToastContainer theme="colored" position="top-right" autoClose={5000} />
  </Container>
);
   

}
export default App;
