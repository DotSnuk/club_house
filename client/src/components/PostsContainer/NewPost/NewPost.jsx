import { useState } from 'react';
import { postPost } from '../../../api/backend';
import { useActiveUser } from '../../UserContext/UserContext';

export default function NewPost({ forumId }) {
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');
  const { user } = useActiveUser();
  console.log(user);
  console.log(forumId);
  async function submitPost(e) {
    e.preventDefault();
    // need userid, forumid
    await postPost({
      title,
      text,
      userId: user.id,
      forumId: parseInt(forumId),
    });
  }

  return (
    <form onSubmit={submitPost}>
      <label htmlFor='title'>Title: </label>
      <input
        type='text'
        name='title'
        id='title'
        onChange={e => setTitle(e.target.value)}
      />
      <label htmlFor='text'>Text: </label>
      <input
        type='text'
        name='text'
        id='text'
        onChange={e => setText(e.target.value)}
      />
      <button type='submit'>Submit</button>
    </form>
  );
}
