import {useState} from 'react';
import { Link } from "react-router-dom";
import { useUpdateTopicMutation } from "./services/topicApi";

const TopicDetail = ({ currentTopic }) => {

  const [title, setTitle] = useState(currentTopic.title)
  const [description, setDescription] = useState(currentTopic.description)
  const [id, setId] = useState(currentTopic.id)
  const [updateTopic] = useUpdateTopicMutation();

  const handleUpdateTopic = (e) => {
    e.preventDefault();
    const topic = {
      title,
      description,
      id
    };
    updateTopic(topic);
    // console.log("currentTopic update: " + JSON.stringify(topic) );
  };

  return (

<form className='editTopic' name='updateTopic' onSubmit={handleUpdateTopic}>
      <div className="col-md-12 mt-4">

        <h4 className='badge bg-dark text-white mb-2'>Tab 1 (x)</h4>

      {currentTopic ? (
        <>
            <input
              className="form-control"
              name="title"
              type="text"
              onChange={(e) => setTitle(e.target.value.toUpperCase())} 
              value={currentTopic.title}
            />

            <textarea
              rows="10"
              className="mt-2 form-control"
              name="description"
              type="text"
              onChange={(e) => setDescription(e.target.value)}
              value={currentTopic.description}
            />
            <button className="mt-3 btn btn-primary">Submit</button>
        </>

      ) : (
        <>
          Click on a topic.
        </>
      ) }

      </div>
</form>

  );
};

export default TopicDetail;
