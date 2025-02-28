import App from './App';
import RegisterForm from './components/RegisterForm/RegisterForm';

export const routes = [
  {
    path: '/',
    element: <App />,
    children: [{ path: '/register', element: <RegisterForm /> }],
  },
];
