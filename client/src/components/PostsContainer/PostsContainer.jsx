import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getForumWithId, getPosts } from '../../api/backend';
import NewPost from './NewPost/NewPost';
import styles from './PostsContainer.module.css';
import { useActiveUser } from '../UserContext/UserContext';

export default function PostsContainer() {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useActiveUser();

  useEffect(() => {
    if (!id) navigate('/forum');
  }, [id, navigate]);

  useEffect(() => {
    const getTitle = async () => {
      const forumData = await getForumWithId(id);
      if (forumData.status === 401) {
        navigate('/forum');
      }
      setTitle(forumData.title);
      // if can't get title, the forum dont exist. redirect?
    };
    const getPostsData = async () => {
      const data = await getPosts(id);
      console.log(data);
      setPosts(data);
      setLoading(false);
    };
    getTitle();
    getPostsData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <h1>{title}</h1>
      {posts.length === 0 ? (
        <div>
          <i>No posts yet...</i>
        </div>
      ) : (
        posts.map(post => (
          <div key={post.id}>
            {post.content}time: {convertTime(post.date_time)}
            {user !== null && getName(post)}
          </div>
        ))
      )}
      <NewPost forumId={id} />
    </>
  );
}

function getName(user) {
  return <div>Posted by: {user.user_firstname}</div>;
}

function convertTime(time) {
  const newDate = new Date(time);
  const [month, day, hour, minute] = [
    newDate.getMonth(),
    newDate.getDate(),
    newDate.getHours(),
    newDate.getMinutes(),
  ];
  return `${month + 1}/${day} - ${hour}:${minute}`;
}
