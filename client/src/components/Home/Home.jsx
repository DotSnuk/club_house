import { useActiveUser } from '../UserContext/UserContext';

export default function Home() {
  const { user, loading, isAuthenticated } = useActiveUser();

  if (loading) return <div>Loading...</div>;
  if (!isAuthenticated()) return <div>Not authenticated</div>;

  return <div>Welcome home {user.firstname}</div>;
}
