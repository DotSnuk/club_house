import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './ForumItem.module.css';

export default function ForumItem({ title, id }) {
  // const [posts, setPosts] = useState([]);
  return (
    <div className={styles.forumItem}>
      <Link to={`/posts/${id}`}>{title}</Link>
    </div>
  );
}
