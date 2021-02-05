const axios = require('axios');

export default class Helper {
  static async axiosCall({
    method = 'GET',
    host = '',
    payload = {},
    headers: hdrs = {},
  }) {
    const headers = {
      'Content-Type': 'application/json',
      ...hdrs,
    };

    const axiosData = {
      method,
      url: host,
      data: payload,
      headers,
      json: true,
    };

    return axios(axiosData);
  }

  static getImage(str: String, res = '300') {
    return `http://image.tmdb.org/t/p/w${res}/${str}`;
  }

  static breakpoints = (theme, size, dir) =>
    ({
      sm: {
        down: `@media (max-width: ${theme.breakpoints['sm']})`,
        up: `@media (min-width: ${theme.breakpoints['sm']})`,
      }[dir],
      md: {
        down: `@media (max-width: ${theme.breakpoints['md']})`,
        up: `@media (min-width: ${theme.breakpoints['md']})`,
      }[dir],
      lg: {
        down: `@media (max-width: ${theme.breakpoints['lg']})`,
        up: `@media (min-width: ${theme.breakpoints['lg']})`,
      }[dir],
      xl: {
        down: `@media (max-width: ${theme.breakpoints['xl']})`,
        up: `@media (min-width: ${theme.breakpoints['xl']})`,
      }[dir],
    }[size]);
}
