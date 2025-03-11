import { useState, useEffect } from 'react';
import { getForums } from '../../api/backend';
import ForumItem from './ForumItem/ForumItem';

export default function ForumContainer() {
  const [forums, setForums] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getForumsData = async () => {
      const data = await getForums();
      console.log(data);
      setForums(data);
      setLoading(false);
    };
    getForumsData();
  }, []);

  if (loading) return <div>Loading...</div>;

  const forumCategories = forums.map(forum => {
    return <ForumItem title={forum.title} id={forum.id} key={forum.id} />;
  });
  console.log(forumCategories);
  return <div>{forumCategories}</div>;
}
