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
      console.log(response.data.user);
      return response.data;
    })
    .catch(function (error) {
      return error;
    });

  return axiosResponse;
}

export async function getForums() {
  const axiosResponse = axios
    .get('/api/getForums')
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return error;
    });
  return axiosResponse;
}

export async function getForumWithId(id) {
  const axiosResponse = axios
    .get(`/api/getForumWithId/${id}`)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return error;
    });
  return axiosResponse;
}

export async function getPosts(id) {
  const axiosResponse = axios
    .get(`/api/getPosts/${id}`)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return error;
    });
  return axiosResponse;
}

export async function postPost(data) {
  const axiosResonse = axios
    .post(`/api/postPost`, data)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return error;
    });
  return axiosResonse;
}
