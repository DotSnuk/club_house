import { useActiveUser } from '../UserContext/UserContext';
import { Link } from 'react-router-dom';

export default function Header() {
  const { user } = useActiveUser();

  return (
    <nav>
      {user.user === null ? (
        <Link to='/register'>Register</Link>
      ) : (
        <Link to='/username'>Username</Link>
      )}
    </nav>
  );
}
