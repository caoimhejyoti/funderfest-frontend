import { useParams } from "react-router-dom";
// HOOKS
import useFestival from "../../hooks/use-festival";
import { useAuth } from "../../hooks/use-auth";
// COMPONENTS
import PledgeForm from "../../components/Pledges/PledgeForm";

function FestivalPage() {
  const { auth, setAuth } = useAuth();
  const { id } = useParams();
  const { festival, isLoading, error } = useFestival(id);
  const owner = festival?.owner;
  console.log("owner ", owner);
  const user = auth.userId;
  console.log("user ", user);
  const isOwner = owner === auth.userId;
  console.log("isOwner", isOwner);
  return (
    <>
      {/*TODO: remove before submission*/}
      <pre>{JSON.stringify(festival, null, 2)}</pre>
      <img src={festival?.image} />
      <h2>{festival?.title}</h2>
      <h3>Created at: {festival?.date_created}</h3>
      <h3>{`Status: ${festival?.is_open}`}</h3>
      <h3>Pledges:</h3>
      <ul>
        {festival?.pledges.map((pledgeData, key) => {
          return (
            <li key={key}>
              {pledgeData.amount} from {pledgeData.supporter}
            </li>
          );
        })}
      </ul>
      {/* TODO: ADD AUTHENTICATION TO REDUCE ACCESS & DELETE BUTTON */}
      {/* SECTION 2 - HEADER */}
      <div className="border-b border-gray-900/10 pb-6">
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Create a Pledge
        </h2>
      </div>
      {/* SECTION 3 - PLEDGES */}
      <div>
        {/* {auth.userId && festival.owner !== auth.userId &&  */}
        {/* SECTION 3A - PLEDGE FORM - AUTHENTICATED USERS */}
        <PledgeForm festivalProp={id} />
        {/* ):( */}
        {/* SECTION 3B - CTA - LOG IN REQUIRED */}
        {/* ) */}
      </div>
    </>
  );
}

export default FestivalPage;
