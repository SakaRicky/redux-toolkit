import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleTopic, removeTopic } from '../slices/topicSlice';

export default function TodoItem({ id, published, title }) {
  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(toggleTopic({ id }));
  };

  const handleRemove = (  ) => {
    dispatch(removeTopic({ id }));
  };

  return (
    <li className="d-flex align-items-center justify-content-between mb-2 border p-1 rounded">
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          id={id}
          checked={published}
          onChange={handleToggle}
        />
        <label
          className={`form-check-label ${
            published ? 'text-decoration-line-through' : null
          }`}
          htmlFor={id}
        >
          {title}
        </label>
      </div>

      <button className="btn btn-danger" onClick={handleRemove}>
        &times;
      </button>
    </li>
  );
}
