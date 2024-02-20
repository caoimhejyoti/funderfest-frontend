import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

// API
import postCreateFestival from "../api/post-create-festival";

function CreateFestivalForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [festivalDetails, setFestivalDetails] = useState({
    title: "",
    description: "",
    goal: "",
    image:
      "https://drive.google.com/file/d/1AqBIZiyR9GH07RFydKMMy3jS-STP6iwv/view?usp=drive_link",
    is_open: true,
    date_created: new Date(),
    owner: id,
    tickets_available: false,
    start_date: "",
    end_date: "",
  });

  const handleChange = (event) => {
    const { id, value } = event.target;
    setFestivalDetails((prevFestivalDetails) => ({
      ...prevFestivalDetails,
      [id]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("submit button pressed");
    if (
      festivalDetails.title &&
      festivalDetails.description &&
      festivalDetails.goal &&
      festivalDetails.start_date &&
      festivalDetails.end_date
    ) {
      postCreateFestival(
        festivalDetails.title,
        festivalDetails.description,
        festivalDetails.goal,
        festivalDetails.image,
        festivalDetails.is_open,
        festivalDetails.date_created,
        festivalDetails.owner,
        festivalDetails.tickets_available,
        festivalDetails.start_date,
        festivalDetails.end_date
      ).then((newFestival) => {
        navigate(`/festival/${newFestival.id}`);
      });
    }
  };

  return (
    <form>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          placeholder="Enter Title"
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <input
          type="text"
          id="description"
          placeholder="Enter Event Description"
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="goal">Goal:</label>
        <input
          type="int"
          id="goal"
          placeholder="Enter Goal"
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="image">Image URL:</label>
        <input
          type="text"
          id="image"
          placeholder="Provide image URL"
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="tickets_available">Will you be offering tickets?</label>
        <input type="checkbox" id="tickets_available" onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="start_date">When does your event start?</label>
        <input type="date" id="start_date" onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="end_date">When does your event end?</label>
        <input type="date" id="end_date" onChange={handleChange} />
      </div>
      <button type="submit" onClick={handleSubmit}>
        Submit
      </button>
      {/* <button type="submit">Submit</button> */}
    </form>
  );
}

export default CreateFestivalForm;
