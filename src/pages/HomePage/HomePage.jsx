// import { allFestivals } from "../data";

// HOOKS
import { useEffect } from "react";
import useFestivals from "../../hooks/use-festivals";

// STLYING
import "./HomePage.css";

// COMPONENTS
import FestivalCard from "../../components/Festivals/FestivalCard";

function HomePage() {
  useEffect(() => {
    console.log("home page mounted");
    return () => {
      console.log("home page unmounted");
    };
  }, []);
  const { festivals } = useFestivals();
  return (
    <>
      <h1 className="text-3xl  font-display-head ">
        Welcome to FunderFest Events
      </h1>
      <div
        className="container inline-grid grid-cols-2 gap-4"
        id="festival-list"
      >
        {festivals.map((festivalData, key) => {
          return <FestivalCard key={key} festivalData={festivalData} />;
        })}
      </div>
    </>
  );
}

export default HomePage;
