import { Link } from "react-router-dom";
import "./FestivalCard.css";

function FestivalCard(props) {
  const { festivalData } = props;
  const festivalLink = `festival/${festivalData.id}`;

  return (
    <div className="festival-card bg-orange-500 py-6 px-3 rounded-lg ">
      <Link to={festivalLink}>
        <img className="mx-auto rounded-lg" src={festivalData.image} />
        <h3>{festivalData.title}</h3>
      </Link>
    </div>
  );
}

export default FestivalCard;
