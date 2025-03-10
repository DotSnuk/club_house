import { useActiveUser } from '../UserContext/UserContext';
import { Link } from 'react-router-dom';

export default function Header() {
  const { user } = useActiveUser();
  console.log(user);
  return (
    <nav>
      {user === null ? (
        <>
          <Link to='/register'>Register</Link>
          <Link to='/login'>Login</Link>
        </>
      ) : (
        <Link to='/username'>{user.firstname}</Link>
      )}
    </nav>
  );
}
