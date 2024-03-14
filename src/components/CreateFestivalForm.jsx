// HOOKS
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

// LIBRARIES
import { PhotoIcon } from "@heroicons/react/24/solid";

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
      "https://github.com/caoimhejyoti/funderfest-frontend/blob/main/public/Funderfest_favicon.png?raw=true",
    is_open: false,
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
    if (
      festivalDetails.title &&
      festivalDetails.description &&
      festivalDetails.goal &&
      festivalDetails.start_date &&
      festivalDetails.end_date
    ) {
      postCreateFestival(festivalDetails).then((newFestival) => {
        navigate(`/festival/${newFestival.id}`);
      });
    }
  };

  return (
    <form className="container">
      <div className="space-y-12">
        {/* SECTION 1 - EVENT DETAILS */}
        <div className="border-b border-gray-900/10 pb-12">
          {/* EVENT TITLE */}
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
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
          </div>

          {/* EVENT DESCRIPTION */}
          <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-6">
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

          {/* EVENT GOAL */}
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
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

          {/* EVENT IMAGE */}
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <label htmlFor="image">Image URL:</label>
            <PhotoIcon
              className="mx-auto h-12 w-12 text-gray-300"
              aria-hidden="true"
            />

            <input
              type="text"
              id="image"
              placeholder="Provide image URL"
              onChange={handleChange}
            />
          </div>
        </div>
        {/* SECTION 2 - TICKETS */}
        <div className="border-b border-gray-900/10 pb-12">
          <label htmlFor="tickets_available">Tickets: COMING SOON!</label>
          {/* <input
            type="checkbox"
            id="tickets_available"
            onChange={handleChange}
          /> */}
        </div>
        {/* SECTION 3 - AUTO PUBLISH? */}
        <div className="border-b border-gray-900/10 pb-12">
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
        {/* SECTION 4 - DATES */}
        <div className="border-b border-gray-900/10 pb-12">
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <label
              htmlFor="start_date"
              className="after:content-['*'] after:ml-0.5 after:text-red-500"
            >
              When does your event start?
            </label>
            <input type="date" id="start_date" onChange={handleChange} />
          </div>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <label
              htmlFor="end_date"
              className="after:content-['*'] after:ml-0.5 after:text-red-500"
            >
              When does your event end?
            </label>
            <input type="date" id="end_date" onChange={handleChange} />
          </div>
        </div>
        {/* SECTION 5 - SUBMIT */}
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}

export default CreateFestivalForm;
