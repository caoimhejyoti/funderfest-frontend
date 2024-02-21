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
    is_open: false,
    date_created: new Date(),
    owner: id,
    tickets_available: true,
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
        <label
          htmlFor="title"
          className="after:content-['*'] after:ml-0.5 after:text-red-500"
        >
          Title:
        </label>
        <input
          type="text"
          id="title"
          placeholder="Enter Title"
          onChange={handleChange}
        />
      </div>
      <div>
        <label
          htmlFor="description"
          className="after:content-['*'] after:ml-0.5 after:text-red-500"
        >
          Description:
        </label>
        <input
          type="text"
          id="description"
          placeholder="Enter Event Description"
          onChange={handleChange}
        />
      </div>
      <div>
        <label
          htmlFor="goal"
          className="after:content-['*'] after:ml-0.5 after:text-red-500"
        >
          Goal:
        </label>
        <input
          type="int"
          id="goal"
          placeholder="Enter Goal value"
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
        <label htmlFor="is_open" className="peer-checked/draft:text-sky-950">
          Events are automatically published. Would you like to keep this as a
          draft?
        </label>
        <input
          type="checkbox"
          className="peer/draft"
          id="is_open"
          onChange={handleChange}
        />
        <div className="hidden peer-checked/draft:block">
          Drafts are only visible to administrators.
        </div>
        <div className="hidden peer-checked/published:block">
          Your post will be publicly visible on your site.
        </div>
      </div>
      <div>
        <label
          htmlFor="start_date"
          className="after:content-['*'] after:ml-0.5 after:text-red-500"
        >
          When does your event start?
        </label>
        <input type="date" id="start_date" onChange={handleChange} />
      </div>
      <div>
        <label
          htmlFor="end_date"
          className="after:content-['*'] after:ml-0.5 after:text-red-500"
        >
          When does your event end?
        </label>
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
