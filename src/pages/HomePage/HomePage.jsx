// import { allFestivals } from "../data";

// HOOKS
import { useEffect } from "react";
import useFestivals from "../../hooks/use-festivals";

// STLYING
import "./HomePage.css";

// COMPONENTS
import FestivalCard from "../../components/FestivalCard";

function HomePage() {
  useEffect(() => {
    console.log("home page mounted");
    return () => {
      console.log("home page unmounted");
    };
  }, []);
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
