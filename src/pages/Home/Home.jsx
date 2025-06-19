import React from "react";
import MarathonSlider from "./MarathonSlider ";
import MarathonCard from "./MarathonCard";
import { Helmet } from "react-helmet-async";
import UpcomingMarathons from "./UpcomingMarathons";
import FeturedRunners from "./FeturedRunners";
import TrainingResources from "./TrainingResources";

function Home() {
  return (
    <div>
      <Helmet>
        <title>Home | Marathon App</title>
      </Helmet>
      <MarathonSlider></MarathonSlider>
      <MarathonCard></MarathonCard>
      <UpcomingMarathons></UpcomingMarathons>
      <FeturedRunners></FeturedRunners>
      <TrainingResources></TrainingResources>
    </div>
  );
}

export default Home;
