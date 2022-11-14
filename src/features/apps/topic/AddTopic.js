import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createTopic } from "./slices";

const AddTopic = () => {
  const initialTopicstate = {
    id: null,
    title: "",
    description: "",
    published: false
  };
  const [topic, setTopic] = useState(initialTopicstate);
  const [submitted, setSubmitted] = useState(false);

  const dispatch = useDispatch();

  const handleInputChange = event => {
    const { name, value } = event.target;
    setTopic({ ...topic, [name]: value });
  };

  const saveTopic = () => {
    const { title, description } = topic;

    dispatch(createTopic({ title, description }))
      .unwrap()
      .then(data => {
        console.log(data);
        setTopic({
          id: data.id,
          title: data.title,
          description: data.description,
          published: data.published
        });
        setSubmitted(true);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newTopic = () => {
    setTopic(initialTopicstate);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newTopic}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              value={topic.title || ''}
              onChange={handleInputChange}
              name="title"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={topic.description || ''}
              onChange={handleInputChange}
              name="description"
            />
          </div>

          <button onClick={saveTopic} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddTopic;
