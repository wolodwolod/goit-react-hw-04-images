// import axios from 'axios';

const API_KEY = '25433386-4f25aa275c005ef248c74251b';

function fetchData(query, page, perPage) {

    return fetch(`https://pixabay.com/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}`)
        .then(response => {
          if (response.ok) {

      // console.log(response)
      return response.json();
    }

    return Promise.reject(new Error(`Нет изображений с названием ${query}`));
  });
}


export default fetchData;


