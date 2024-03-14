import { Link } from "react-router-dom";
import "./FestivalCard.css";

function FestivalCard(props) {
  const { festivalData } = props;
  console.log(
    `Festival data inside FestivalCard(): ${festivalData.festivalData}`
  );
  const festivalLink = `festival/${festivalData.id}`;

  return (
    <div className="festival-card">
      <Link to={festivalLink}>
        <img src={festivalData.image} />
        <h3>{festivalData.title}</h3>
      </Link>
    </div>
  );
}

export default FestivalCard;
