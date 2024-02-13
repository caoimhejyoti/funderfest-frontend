import { oneFestival } from "../data";

function FestivalPage() {
  return (
    <>
      <h2>{oneFestival.title}</h2>
      <h3>Created at: {oneFestival.date_created}</h3>
      <h3>{`Status: ${oneFestival.is_open}`}</h3>
      <h3>Pledges:</h3>
      <ul>
        {oneFestival.pledges.map((pledgeData, key) => {
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
