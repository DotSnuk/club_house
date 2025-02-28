import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postCreateUser } from '../../api/backend';
import styles from './RegisterForm.module.css';

export default function RegisterForm() {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  async function submitUser(e) {
    e.preventDefault();
    // uncomment next line when you're done
    // if (password === '' || password !== confirmPassword) return;
    const data = { firstname, lastname, email, password };
    const response = await postCreateUser(data);
    console.log(response);
    if (!response.success) return handleError(response.errors);
  }

  function ErrorCheck(path) {
    if (errors.map(err => err.path).includes(path))
      return <span>{errors.filter(err => err.path === path)[0].msg}</span>;
  }

  function handleError(errors) {
    // need a way to remove old errors?
    // or set new each time?
    setErrors(errors);
  }

  return (
    <form onSubmit={submitUser} className={styles.container} method='POST'>
      <div>
        <label htmlFor='firstname'>Firstname: </label>
        <input
          type='text'
          name='firstname'
          id='firstname'
          onChange={e => setFirstname(e.target.value)}
        />
        {ErrorCheck('firstname')}
      </div>
      <div>
        <label htmlFor='lastname'>Lastname: </label>
        <input
          type='text'
          name='lastname'
          id='lastname'
          onChange={e => setLastname(e.target.value)}
        />
        {ErrorCheck('lastname')}
      </div>
      <div>
        <label htmlFor='email'>Email: </label>
        <input
          type='text'
          name='email'
          id='email'
          onChange={e => setEmail(e.target.value)}
        />
        {ErrorCheck('email')}
      </div>
      <div>
        <label htmlFor='password'>Password: </label>
        <input
          type='password'
          name='password'
          id='password'
          onChange={e => setPassword(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor='confirmPassword'>Confirm password: </label>
        <input
          type='password'
          name='confirmPassword'
          id='confirmPassword'
          onChange={e => setConfirmPassword(e.target.value)}
        />
      </div>

      {/* <label htmlFor='username'>Username: </label>
      <input
        type='text'
        name='username'
        id='username'
        onChange={e => setUsername(e.target.value)}
      />
      {errors.map(err => err.path).includes('username') && (
        <span>{errors.filter(err => err.path === 'username')[0].msg}</span>
      )} */}
      <button type='submit'>Submit</button>
    </form>
  );
}
