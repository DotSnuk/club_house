import axios from 'axios';

export async function postCreateUser(data) {
  console.log(data);
  const promise = axios
    .post('/api/createUser', data)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return error;
    });
  return promise;
}
