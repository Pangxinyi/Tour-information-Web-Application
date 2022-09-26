import React, { useState, useEffect } from "react";
import Loading from "./Loading";
import Tours from "./Tours";

const url = "https://course-api.com/react-tours-project"; //set up the API

function App() {
  const [loading, setLoading] = useState(true); //to see the loading component
  const [tours, setTours] = useState([]); //to see the tours component

  const removeTour = (id) => {
    const newTours = tours.filter((tour) => tour.id !== id);
    setTours(newTours);
  };

  const fetchTours = async () => {
    setLoading(true); //to tell users that we are fetching the data
    try {
      const response = await fetch(url); //to pass in the url
      const tours = await response.json(); //run json to pass it
      setLoading(false);
      setTours(tours);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    //to invoke the fetchTours()
    fetchTours();
  }, []);
  if (loading) {
    //to set up the condition: if loading is true, then return the loading component
    return (
      <main>
        <Loading />
      </main>
    );
  }
  if (tours.length === 0) {
    //if there is no tours left, then return the info
    return (
      <main>
        <div className="title">
          <h2>no tours left</h2>
          <button className="btn" onClick={() => fetchTours()}>
            refresh
          </button>
        </div>
      </main>
    );
  }
  return (
    //to return the tours component
    <main>
      <Tours tours={tours} removeTour={removeTour} />
    </main>
  );
}

export default App;
