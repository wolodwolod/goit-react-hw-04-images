import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import fetchData from 'api/pixabayApi';
import  Container  from 'components/Container';
import  Searchbar  from 'components/Searchbar';
import  ImageGallery  from 'components/ImageGallery';
import  Button  from 'components/Button';
import  Modal  from 'components/Modal';
import Loader from 'components/Loader';

const PER_PAGE = 12;


const App = () => {
  
  const [data, setData] = useState({
        images: [],
        loading: false,
        error: null,        
    });
 
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  
  const [modal, setModal] = useState({
        open: false,
        largeImageURL: null,
        tags: '',        
    });


  useEffect(() => {
    
    // Функция - запрос
          
    const fetchImages = () => {
      fetchData(query, page, PER_PAGE)
      .then(({ hits, totalHits }) => {

        console.log(hits, totalHits);

        const totalPages = Math.ceil(totalHits / PER_PAGE);
                 

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
        
        setData(prevData => {
                    return {
                        images: [...prevData.images, ...newImages],
                        loading: false,
                        error: null  }
                })
             })
      
      .catch(error => 
        setData(prevData => { 
          return {
                    ...prevData,
                    loading: false,
                    error: error}
                })
      )
    }
        
      // Вызов функции запроса 
    
    if (query === "") return;
    
    fetchImages();
    setData(prevData => { 
          return {
                    ...prevData,
                    loading: true,
                    }
                })
        
  }, [query, page]);  
  
     // Функции
  
  const handleSearchSubmit = query => {

    setQuery(query);
    setPage(1);
    setData({
                    ...data,
                    images: [],
                    error: null
                })
      };

  const openModal = (largeImageURL, tags) => {
    setModal({
      open: true,
      largeImageURL: largeImageURL,
      tags: tags,
    });
  }
    
  const closeModal = () => {
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

const {error, images, loading} = data;

     return (
  <Container>
      
    <Searchbar
      onSubmit={handleSearchSubmit}
    />
       
    {error && toast.error(error.message)}

    <ImageGallery images={images} onClick={openModal} />
    
    {modal.open && (
      <Modal onClose={closeModal}>
        <img src={modal.largeImageURL} alt={modal.tags} />
      </Modal>
    )}
    
    {Boolean(images.length) && <Button onClick={onLoadMore}>Load more</Button>}
             
    {loading && <Loader />}
               
    <ToastContainer theme="colored" position="top-right" autoClose={5000} />
  </Container>
);
 
}
export default App;
