import { useParams } from "react-router-dom";
// HOOKS
import useFestival from "../../hooks/use-festival";
// COMPONENTS
import PledgeForm from "../../components/PledgeForm";

function FestivalPage() {
  const { id } = useParams();
  const { festival, isLoading, error } = useFestival(id);
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
      <PledgeForm festivalProp={id} />
    </>
  );
}

export default FestivalPage;
