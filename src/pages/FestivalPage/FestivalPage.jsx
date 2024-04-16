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

  console.log(festival);

  const owner = festival?.owner;
  console.log("owner ", owner);
  const userID = auth.userID;
  console.log("userID ", userID);
  const isOwner = owner == userID;
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
    <main className="container bg-pink-600 py-6 rounded-lg">
      {/* used for debugging */}
      {/* <pre>{JSON.stringify(festival, null, 2)}</pre>  */}

      {/* SECTION 1 - FESTIVAL DETAILS */}
      <section className="bg-violet-600 py-6 container rounded-lg">
        {/* SECTION 1A - FESTIVAL INFORMATION */}
        <img className="mx-auto pb-6 rounded-lg" src={festival?.image} />
        <h2 className="text-xl font-bold text-orange-200">{festival?.title}</h2>
        <h3>
          Created at:{" "}
          {new Date(festival?.date_created).toLocaleDateString("en-GB")}
        </h3>
        <h3>{`Owner: ${festival?.owner}`}</h3>

        {/* SECTION 1B - FESTIVAL EDITING */}
        {isOwner && (
          <>
            <p>Testing access</p>
            {/* <BasicButton message="Delete" btnClick={handleLoginBtn} /> */}
            <BasicButton
              message="Update Festvial"
              btnClick={handleUpdateFestivalBtn}
            />
          </>
        )}
      </section>
      {/* TODO: ADD AUTHENTICATION TO REDUCE ACCESS & DELETE BUTTON */}
      {/* SECTION 2 - PLEDGE DETAILS */}
      <section className="bg-orange-500 py-6 container rounded-lg mt-3">
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Pledges:
        </h2>
        <ul>
          {festival?.pledges.map((pledgeData, key) => {
            return (
              <li key={key}>
                {`$ ${pledgeData.pledge_amount} from ${pledgeData.supporter}.`}
                <br />
                {`${pledgeData.supporter} commented: "${pledgeData.comment}"`}
              </li>
            );
          })}
        </ul>
        <div className="border-b border-gray-900/10 pb-6 ">
          {/* SECTION 2A - HEADER */}
          <h3 className="text-base font-semibold py-2 leading-7 text-gray-900">
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
    </main>
  );
}

export default FestivalPage;
