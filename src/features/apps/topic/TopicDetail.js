import { Link } from "react-router-dom";

const TopicDetail = ( ) => {

  return (
      
      <div className="col-md-6">
        {currentTopic ? (
          <div>
            <h4>Topic</h4>
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
          <div>
            <br />
            <p>Please click on a Topic...</p>
          </div>
        )}
      </div>
    
  );
};

export default TopicDetail;
