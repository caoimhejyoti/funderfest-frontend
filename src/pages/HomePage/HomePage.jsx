// import { allFestivals } from "../data";

// HOOKS
import { useEffect } from "react";
import useFestivals from "../../hooks/use-festivals";

// STLYING
import "./HomePage.css";

// COMPONENTS
import FestivalCard from "../../components/Festivals/FestivalCard";

function HomePage() {
  // NOTE: Use Effect used to confirm React reloads.
  // useEffect(() => {
  //   console.log("home page mounted");
  //   return () => {
  //     console.log("home page unmounted");
  //   };
  // }, []);
  const { festivals } = useFestivals();
  return (
    <main className="container flex-col align-middle bg-pink-600 py-6 rounded-lg">
      <h1 className="text-3xl text-orange-200">Welcome to FunderFest Events</h1>
      <div
        className="container  bg-violet-600 py-6 inline-grid grid-cols-2 gap-4 rounded-lg"
        id="festival-list"
      >
        {festivals.map((festivalData, key) => {
          return <FestivalCard key={key} festivalData={festivalData} />;
        })}
      </div>
    </main>
  );
}

export default HomePage;
