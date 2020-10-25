import fetch from './fetch';
import { API } from '../../types';

const getUser = () => fetch<API.User>('/user');

export default {
  getUser,
};
