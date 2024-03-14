import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// API
import postCreatePledge from "../../api/post-create-pledge";

// HOOKS
import { useAuth } from "../../hooks/use-auth";

function PledgeForm(festivalProp) {
  const festivalId = festivalProp.festivalProp;
  const [pledgeSuccess, setPledgeSuccess] = useState(false);
  const navigate = useNavigate();
  const [pledgeDetails, setPledgeDetails] = useState({
    comment: "",
    anonymous: false,
    pledge_amount: 0,
    ticket_option: "",
    festival: festivalId,
  });

  const handleChange = (event) => {
    const { id, value } = event.target;
    setPledgeDetails((prevPledgeDetails) => ({
      ...prevPledgeDetails,
      [id]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (pledgeDetails.comment && pledgeDetails.pledge_amount) {
      postCreatePledge(pledgeDetails).then((newPledge) => {
        setPledgeSuccess(true),
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        navigate(`/festival/${festivalId}`);
        // navigate("/");
      });
    } else {
      console.log("no comment/p amount");
    }
  };

  return (
    <form className="container">
      <div className="space-y-12">
        {/* SECTION 1 - HEADER
        <div className="border-b border-gray-900/10 pb-6">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Create a Pledge
          </h2>
        </div> */}
        {/* SECTION 2 - INPUTS */}
        <div className="border-b border-gray-900/10 pb-12">
          {/* COMMENT */}
          <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                htmlFor="comment"
                className="after:content-['*'] after:ml-0.5 after:text-red-500"
              >
                Comment:
              </label>
              <input
                type="text"
                id="comment"
                placeholder="Enter Comment"
                onChange={handleChange}
              />
            </div>
          </div>
          {/* ANONYMOUS */}
          <div className="">
            <label
              htmlFor="anonymous"
              className="peer-checked/draft:text-sky-950"
            >
              Pledges are automatically attributed to a user. Would you like to
              keep this as an anonymous pledge?
            </label>
            <input
              type="checkbox"
              className="peer/draft"
              id="anonymous"
              onChange={handleChange}
            />
            <div className="hidden peer-checked/published:block">
              This pledge will be anonymous.
            </div>
            <div className="hidden peer-checked/draft:block">
              Your pledge will be publicly attributed to your username.
            </div>
          </div>
          {/* PLEDGE AMOUNT */}
          <div className="">
            <label htmlFor="pledge_amount">Pledge Amount</label>
            <div className="relative mt-2 rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <span className="text-gray-500 sm:text-sm">$</span>
              </div>
              <input
                type="text"
                name="pledge_amount"
                id="pledge_amount"
                className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="0.00"
                onChange={handleChange}
              />
              <div className="absolute inset-y-0 right-0 flex items-center">
                <label htmlFor="currency" className="sr-only">
                  Currency
                </label>
                <select
                  id="currency"
                  name="currency"
                  className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                >
                  <option>AUD</option>
                  <option>USD</option>
                  <option>GBP</option>
                  <option>EUR</option>
                </select>
              </div>
            </div>
          </div>
          {/* TICKET OPTION */}
          {/* future development - tbc */}
        </div>
        {/* SECTION 3 - SUBMIT */}
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
      {pledgeSuccess && (
        <>
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Thank you for your pledge!{" "}
          </h2>
          <h3>This page will reload shortly to show your pledge. </h3>
        </>
      )}
    </form>
  );
}

export default PledgeForm;
