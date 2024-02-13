import { useParams } from "react-router-dom";
// HOOKS
import useFestival from "../hooks/use-festival";

function FestivalPage() {
  const { id } = useParams();
  // console.log(`Festival id inside festival page:${id}`); //WORKING!
  const { festival, isLoading, error } = useFestival(id);
  console.log(`festival page ${festival}`);
  return (
    <>
      <pre>{JSON.stringify(festival, null, 2)}</pre>
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
    </>
  );
}

export default FestivalPage;
