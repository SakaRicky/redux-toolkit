import { Link } from "react-router-dom";

const TopicDetail = ({ currentTopic }) => {

  console.log("currentTopic: " + JSON.stringify(currentTopic));

  return (
      <div className="col-md-6 mt-4">

      {currentTopic &&
            currentTopic.map((topic) => (
              <li
                key={topic.id}
              >
                {topic.title}
              </li>
            ))}
      </div>
    
  );
};

export default TopicDetail;
