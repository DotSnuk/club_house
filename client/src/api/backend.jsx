import axios from 'axios';

export async function postCreateUser(data) {
  const axiosResponse = axios
    .post('/api/createUser', data)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return error;
    });
  return axiosResponse;
}

export async function postLoginUser(data) {
  console.log(data);
  const axiosResponse = axios
    .post('/api/login', data)
    .then(function (response) {
      console.log(response.data);
      return response.data;
    })
    .catch(function (error) {
      return error;
    });

  return axiosResponse;
}
