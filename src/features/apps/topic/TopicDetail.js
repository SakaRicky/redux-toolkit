import { Link } from "react-router-dom";

const TopicDetail = ({ currentTopic }) => {



  return (
      <div className="col-md-6 mt-4">
        {currentTopic ? (
          <div>
            <div>
              <label>
                <strong>Title:</strong>
              </label>{" "}
              {currentTopic.title}
            </div>
            <div>
              <label>
                <strong>Description:</strong>
              </label>{" "}
              {currentTopic.description}
            </div>
            <div>
              <label>
                <strong>Status:</strong>
              </label>{" "}
              {currentTopic.published ? "Published" : "Pending"}
            </div>

            <Link
              to={"/topics/" + currentTopic.id}
              className="badge badge-warning"
            >
              Edit
            </Link>
          </div>
        ) : (
          <>
          </>
        )}
      </div>
    
  );
};

export default TopicDetail;
