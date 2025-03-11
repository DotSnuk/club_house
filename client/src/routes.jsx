import App from './App';
import RegisterForm from './components/RegisterForm/RegisterForm';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import ForumContainer from './components/ForumContainer/ForumContainer';

export const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/register', element: <RegisterForm /> },
      { path: '/login', element: <Login /> },
      { path: '/home', element: <Home /> },
      { path: '/forum', element: <ForumContainer /> },
    ],
  },
];
