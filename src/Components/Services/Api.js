import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/?q=';
const KEY = '15336169-fb8ecea9b4c4a863b6c6a9193';
const TYPE = '&image_type=photo&orientation=horizontal&per_page=12';

export const fetchImages = (query = 'space', pageNr = 1) =>
  axios.get(BASE_URL + query + '&page=' + pageNr + '&key=' + KEY + TYPE);


