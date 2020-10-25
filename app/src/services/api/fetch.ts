import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { get } from 'lodash';
import { apiURL } from '../../config';

const instance = axios.create({ baseURL: apiURL });

const settings: { [key: number]: () => void | Promise<void> } = {};

interface Fetch {
  request<T>(url: string, options?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
}

const fetch: Fetch['request'] = async (url: string, options: AxiosRequestConfig = {}): Promise<AxiosResponse<any>> => {
  try {
    const token = localStorage.getItem('token');

    return await instance(url, {
      ...options,
      headers: { ...options.headers, authorization: `Bearer ${token}` },
    });
  } catch (error) {
    if (error.isAxiosError) {
      const status = get(error, 'response.status');
      console.log(status);
      if (status !== undefined && settings[status] !== undefined) {
        await settings[status]();
      }
    }
    throw error;
  }
};

export default fetch;

export const setOnUnauthorized = (cb: () => void | Promise<void>) => {
  settings[401] = cb;
};
export const setOnForbidden = (cb: () => void | Promise<void>) => {
  settings[403] = cb;
};
export const setOnNotFound = (cb: () => void | Promise<void>) => {
  settings[404] = cb;
};
