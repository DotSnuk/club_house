import { useState } from 'react';
import { postLoginUser } from '../../api/backend';
import { useNavigate } from 'react-router-dom';
import { useActiveUser } from '../UserContext/UserContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setUser } = useActiveUser();

  async function loginUser(e) {
    e.preventDefault();
    console.log('logging in...');
    const response = await postLoginUser({ email, password });
    if (response.success) return successLogin(response);
    failedLogin(response.msg);
  }

  function failedLogin(msg) {
    setError(msg);
  }

  function successLogin(response) {
    setUser(response.user);
    // set activeUser
    navigate('/home');
  }

  return (
    <form onSubmit={loginUser} method='POST'>
      <label htmlFor='email'>Email: </label>
      <input
        type='text'
        name='email'
        id='email'
        onChange={e => setEmail(e.target.value)}
      />
      <label htmlFor='password'>Password: </label>
      <input
        type='password'
        name='password'
        id='password'
        onChange={e => setPassword(e.target.value)}
      />
      {error !== '' && <span>{error}</span>}
      <button type='submit'>Login</button>
    </form>
  );
}
