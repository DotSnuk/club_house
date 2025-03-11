import { useState, useEffect } from 'react';

export default function ForumItem({ title, id }) {
  // const [posts, setPosts] = useState([]);
  return (
    <div>
      {title} - id: {id}
    </div>
  );
}
