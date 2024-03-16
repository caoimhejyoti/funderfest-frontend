import { useParams, useNavigate } from "react-router-dom";
// HOOKS
import useFestival from "../../hooks/use-festival";
import { useAuth } from "../../hooks/use-auth";
// COMPONENTS
import PledgeForm from "../../components/Pledges/PledgeForm";
import BasicButton from "../../components/Elements/Button";

function FestivalPage() {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();
  const { id } = useParams();
  const { festival, isLoading, error } = useFestival(id);

  const owner = festival?.owner;
  console.log("owner ", owner);
  const user = auth.userId;
  console.log("user ", user);
  const isOwner = owner === auth.userId;
  console.log("isOwner", isOwner);

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/login");
  };

  return (
    <>
      {/*TODO: remove before submission*/}

      <pre>{JSON.stringify(festival, null, 2)}</pre>
      {/* SECTION 1 - FESTIVAL INFORMATION */}
      <section className="bg-green-300 pb-6">
        <img src={festival?.image} />
        <h2>{festival?.title}</h2>
        <h3>Created at: {festival?.date_created}</h3>
        <h3>{`Status: ${festival?.is_open}`}</h3>
      </section>
      {/* TODO: ADD AUTHENTICATION TO REDUCE ACCESS & DELETE BUTTON */}
      {/* SECTION 2 - PLEDGE DETAILS */}
      <section className="bg-red-300 pb-6">
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Pledges:
        </h2>
        <ul>
          {festival?.pledges.map((pledgeData, key) => {
            return (
              <li key={key}>
                {pledgeData.amount} from {pledgeData.supporter}
              </li>
            );
          })}
        </ul>
        <div className="border-b border-gray-900/10 pb-6 ">
          {/* SECTION 2A - HEADER */}
          <h3 className="text-base font-semibold leading-7 text-gray-900">
            Create a Pledge
          </h3>

          {/* SECTION 2B - PLEDGE CREATION */}
          <div>
            {/* {auth.userId && festival.owner !== auth.userId &&  */}
            {/* SECTION 2B-1 - PLEDGE FORM - AUTHENTICATED USERS */}
            <PledgeForm festivalProp={id} />
            {/* ):( */}
            {/* SECTION 2B-2 - CTA - LOG IN REQUIRED */}

            <BasicButton message="Go to login" btnClick={handleSubmit} />
            {/* ) */}
          </div>
        </div>
      </section>
    </>
  );
}

export default FestivalPage;
