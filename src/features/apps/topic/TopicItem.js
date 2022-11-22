import React from 'react';
import { useDispatch } from 'react-redux';
import { removeTopic } from './slices/topicSlice';

export default function TopicItem({ id, published, post_status, title, getTopic }) {
  const dispatch = useDispatch();

  const handleRemove = (  ) => {
    dispatch(removeTopic({ id }));
  };

  return (
    <>
      <li className="d-flex align-items-center justify-content-between mb-2 border p-1 rounded">
        <div>
          <span
            key={id}
            onClick={() => getTopic(id)}
          >
            {title} 
          </span>
          
        </div>
        <span className='badge small badge-info'>{post_status}</span>
      </li>
  </>
  );
}
