// import { allFestivals } from "../data";
// HOOKS
import useFestivals from "../hooks/use-festivals";

// STLYING
import "./HomePage.css";

// COMPONENTS
import FestivalCard from "../components/FestivalCard";

function HomePage() {
  const { festivals } = useFestivals();
  return (
    <div id="festival-list">
      {festivals.map((festivalData, key) => {
        return <FestivalCard key={key} festivalData={festivalData} />;
      })}
    </div>
  );
}

export default HomePage;
