import axios from 'axios';

const instance = axios.create({
  baseUrl: 'https://burger-builder-42c71.firebaseio.com/'
});


export default instance;
