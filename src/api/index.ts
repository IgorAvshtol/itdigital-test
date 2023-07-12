import axios from 'axios';

export const instance = axios.create({
  withCredentials: false,
  baseURL: process.env.REACT_APP_BASE_URL,
});
