import { useActiveUser } from '../UserContext/UserContext';

export default function Home() {
  const { user, loading, isAuthenticated } = useActiveUser();
  console.log('loading:');
  console.log(loading);
  console.log('is auth');
  console.log(isAuthenticated());

  if (loading) return <div>Loading...</div>;
  if (!isAuthenticated()) return <div>Not authenticated</div>;

  return <div>Welcome home {user.firstname}</div>;
}
