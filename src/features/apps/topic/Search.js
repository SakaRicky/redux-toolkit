const CategoriesList = ( ) => {


return (
<div className="col-md-12">
        <div className="input-group mb-6">
          <input
            type="search"
            className="form-control"
            placeholder="Search by title"
            value={interest}
            onChange={HandleChange}
          />
          <button
           onClick={() => searchTopics(interest)}   
           className="searchbutton"
           // You may want to disable your button until interest is set
           disabled={interest === null}
         >
           Search
         </button>
        </div>
      </div>
  );
};

export default CategoriesList;
