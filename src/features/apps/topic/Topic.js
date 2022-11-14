import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from 'react-router-dom';
import { updateTopic, deleteTopic } from "./slices";
import TopicApiService from "./services";

const Topic = (props) => {
  const { id }= useParams();
  let navigate = useNavigate();

  const initialTopicState = {
    id: null,
    title: "",
    description: "",
    published: false
  };
  const [currentTopic, setCurrentTopic] = useState(initialTopicState);
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const getTopic = id => {
    TopicApiService.get(id)
      .then(response => {
        setCurrentTopic(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (id)
      getTopic(id);
  }, [id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentTopic({ ...currentTopic, [name]: value });
  };

  const updateStatus = status => {
    const data = {
      id: currentTopic.id,
      title: currentTopic.title,
      description: currentTopic.description,
      published: status
    };

    dispatch(updateTopic({ id: currentTopic.id, data }))
      .unwrap()
      .then(response => {
        console.log(response);
        setCurrentTopic({ ...currentTopic, published: status });
        setMessage("The status was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const updateContent = () => {
    dispatch(updateTopic({ id: currentTopic.id, data: currentTopic }))
      .unwrap()
      .then(response => {
        console.log(response);
        setMessage("The topic was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const removeTopic = () => {
    dispatch(deleteTopic({ id: currentTopic.id }))
      .unwrap()
      .then(() => {
        navigate("/topics");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentTopic ? (
        <div className="edit-form">
          <h4>Topic</h4>
          <form>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={currentTopic.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={currentTopic.description}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>
                <strong>Status:</strong>
              </label>
              {currentTopic.published ? "Published" : "Pending"}
            </div>
          </form>

          {currentTopic.published ? (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updateStatus(false)}
            >
              UnPublish
            </button>
          ) : (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updateStatus(true)}
            >
              Publish
            </button>
          )}

          <button className="badge badge-danger mr-2" onClick={removeTopic}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateContent}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Topic...</p>
        </div>
      )}
    </div>
  );
};

export default Topic;
