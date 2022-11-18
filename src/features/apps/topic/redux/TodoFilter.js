import React, { useState } from 'react';

import { useDispatch } from 'react-redux';
import { filterKeyTopic } from '../slices/topicSlice';

export default function TodoFilter() {
  const [active, setActive] = useState('ALL');
  const dispatch = useDispatch();
  return (
    <>
      <div className="btn-group mb-3 w-100" role="group">
        <button
          type="button"
          className={`btn btn-outline-primary ${
            active === 'ALL' ? 'active' : null
          }`}
          onClick={() => {
            dispatch(filterKeyTopic('ALL'));
            setActive('ALL');
          }}
        >
          All
        </button>
        <button
          type="button"
          className={`btn btn-outline-primary ${
            active === 'COMPLETED' ? 'active' : null
          }`}
          onClick={() => {
            dispatch(filterKeyTopic('COMPLETED'));
            setActive('COMPLETED');
          }}
        >
          Completed
        </button>
        <button
          type="button"
          className={`btn btn-outline-primary ${
            active === 'UNCOMPLETED' ? 'active' : null
          }`}
          onClick={() => {
            dispatch(filterKeyTopic('UNCOMPLETED'));
            setActive('UNCOMPLETED');
          }}
        >
          Uncompleted
        </button>
      </div>
    </>
  );
}
