import { useActiveUser } from '../UserContext/UserContext';

export default function Home() {
  const { user, loading } = useActiveUser();
  console.log(user);
  console.log(loading);
  if (loading) return <div>Loading...</div>;
  return <div>Welcome home {user.firstname}</div>;
}
