// HOOKS
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useAuth } from "../../hooks/use-auth";
// LIBRARIES
import { PhotoIcon } from "@heroicons/react/24/solid";

// API
import getFestival from "../../api/get-festival";
import putUpdateFestival from "../../api/put-update-festival";

function UpdateFestivalForm(props) {
  const { id } = useParams();
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const [festivalDetails, setFestivalDetails] = useState({
    title: "",
    description: "",
    goal: "",
    image: "",
    is_open: "",
    date_created: "",
    owner: auth.userID,
    tickets_available: false,
    start_date: "",
    end_date: "",
  });

  useEffect(() => {
    if (id) {
      console.log(id);
      getFestival(id)
        .then((festival) => {
          setFestivalDetails({
            title: `${festival.title}`,
            description: `${festival.description}`,
            goal: festival.goal,
            image: `${festival.image}`,
            is_open: festival.is_open,
            date_created: festival.date_created,
            owner: festival.owner,
            tickets_available: festival.tickets_available,
            start_date: festival.start_date,
            end_date: festival.end_date,
          });
        })
        .catch((error) => {
          console.error("Failed to load festival details: ", error);
        });
    }
  }, [id]);

  console.log(festivalDetails);

  const handleChange = (event) => {
    const { id, value } = event.target;
    setFestivalDetails((prevFestivalDetails) => ({
      ...prevFestivalDetails,
      [id]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    putUpdateFestival(festivalDetails, id).then((updatedFestival) => {
      navigate(`/festival/${updatedFestival.id}`);
    });
  };

  return (
    <main className="container  bg-pink-600 py-6 rounded-lg">
      {/* SECTION 1 - Current event details */}
      <section className="container bg-violet-600 py-6 rounded-lg">
        <h2 className="text-xl font-bold text-orange-200">Update your event</h2>
        <h3>Current Event details</h3>
        <table className="table-auto border-2 bg-orange-200 rounded-lg border-black">
          <tbody>
            <tr>
              <td className="border-2 border-black">Current Event Name</td>
              <td className="border-2 border-black">
                {festivalDetails?.title}
              </td>
            </tr>
            <tr>
              <td className="border-2 border-black">
                Current Event Description
              </td>
              <td className="border-2 border-black">
                {festivalDetails?.description}
              </td>
            </tr>
            <tr>
              <td className="border-2 border-black">Current Event Goal</td>
              <td className="border-2 border-black">
                ${festivalDetails?.goal}
              </td>
            </tr>
            <tr>
              <td className="border-2 border-black">Current Event Image</td>
              <td className="border-2 border-black">
                <img src={`${festivalDetails?.image}`} alt="" />
              </td>
            </tr>
            <tr>
              <td className="border-2 border-black">Is the event published?</td>
              <td className="border-2 border-black">
                {festivalDetails?.is_open}
              </td>
            </tr>
            <tr>
              <td className="border-2 border-black">
                Current Event start date
              </td>
              <td className="border-2 border-black">
                {new Date(festivalDetails?.start_date).toLocaleDateString(
                  "en-GB"
                )}
              </td>
            </tr>
            <tr>
              <td className="border-2 border-black">Current Event end date</td>
              <td className="border-2 border-black">
                {new Date(festivalDetails?.end_date).toLocaleDateString(
                  "en-GB"
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </section>
      {/* SECTION 2- Update form */}
      <section className="bg-orange-500 py-6 container rounded-lg mt-3">
        <h2 className="text-xl font-bold text-violet-600">Update form</h2>
        <p>Only change the event details you need to. </p>
        <form className="container">
          <div className="space-y-12">
            {/* SECTION 1 - EVENT DETAILS */}
            <div className="border-b border-gray-900/10 pb-12">
              {/* EVENT TITLE */}
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label htmlFor="title" className="">
                    Title:
                  </label>
                  <input
                    type="text"
                    id="title"
                    placeholder={festivalDetails?.title}
                    // value={festivalDetails?.title}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* EVENT DESCRIPTION */}
              <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-6">
                <label htmlFor="description" className="">
                  Description:
                </label>
                <input
                  type="text"
                  id="description"
                  placeholder={festivalDetails?.description}
                  onChange={handleChange}
                />
              </div>

              {/* EVENT GOAL */}
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <label htmlFor="goal" className="">
                  Goal:
                </label>
                <input
                  type="int"
                  id="goal"
                  placeholder={festivalDetails?.goal}
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
              <label
                htmlFor="is_open"
                className="peer-checked/draft:text-sky-950"
              >
                Events are automatically published. Would you like to keep this
                as a draft?
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
                <label htmlFor="start_date" className="">
                  When does your event start?
                </label>
                <input type="date" id="start_date" onChange={handleChange} />
              </div>
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <label htmlFor="end_date" className="">
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
      </section>
    </main>
  );
}

export default UpdateFestivalForm;
