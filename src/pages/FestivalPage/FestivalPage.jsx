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
  const userID = auth.userID;
  console.log("userID ", userID);
  const isOwner = owner === userID;
  console.log("isOwner", isOwner);

  // BTN FNCS
  const handleUpdateFestivalBtn = (event) => {
    event.preventDefault();
    navigate(`/festival/${id}/update`);
  };
  const handleLoginBtn = (event) => {
    event.preventDefault();
    navigate("/login");
  };
  const handleSignUpBtn = (event) => {
    event.preventDefault();
    navigate("/create-user");
  };

  return (
    <>
      {/*TODO: remove before submission*/}
      {/* <pre>{JSON.stringify(festival, null, 2)}</pre> */}

      {/* SECTION 1 - FESTIVAL DETAILS */}
      <section className="bg-green-300 pb-6">
        {/* SECTION 1A - FESTIVAL INFORMATION */}
        <img src={festival?.image} />
        <h2>{festival?.title}</h2>
        <h3>Created at: {festival?.date_created}</h3>
        <h3>{`Status: ${festival?.is_open}`}</h3>

        {/* SECTION 1B - FESTIVAL EDITING */}
        {isOwner && (
          <>
            <p>Testing access</p>
            <BasicButton message="Delete - login" btnClick={handleLoginBtn} />
            <BasicButton
              message="Update Festvial - login"
              btnClick={handleUpdateFestivalBtn}
            />
          </>
        )}
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
          {/* <div> */}
          {/* SECTION 2B-1 - PLEDGE FORM - AUTHENTICATED USERS */}
          {userID ? (
            <PledgeForm festivalProp={id} />
          ) : (
            <>
              <p>
                If you want to support this event - please login or create an
                account.{" "}
              </p>
              <BasicButton message="Login" btnClick={handleLoginBtn} />
              <BasicButton message="Sign up" btnClick={handleSignUpBtn} />
            </>
          )}
          {/* SECTION 2B-2 - CTA - LOG IN REQUIRED */}
          {/* </div> */}
        </div>
      </section>
    </>
  );
}

export default FestivalPage;
