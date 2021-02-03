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
}
