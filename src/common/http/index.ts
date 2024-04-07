import axios, { AxiosRequestConfig } from 'axios';

/**
 * T는 response body의 타입입니다.
 */
export const postReq = <T>(
  url: string,
  data: any,
  config: AxiosRequestConfig,
) => {
  return axios.post<T>(url, data, config);
};
