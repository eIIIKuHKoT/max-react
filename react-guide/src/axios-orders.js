import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://burger-builder-42c71.firebaseio.com'
});


export default instance;
