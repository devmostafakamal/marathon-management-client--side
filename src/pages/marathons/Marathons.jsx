import React from "react";
import AddMarathons from "./AddMarathons";
import MarathonDetails from "./MarathonDetails";
import AllMarathon from "./AllMarathon";
import { Helmet } from "react-helmet-async";

function Marathons() {
  return (
    <div>
      <Helmet>
        <title>Marathons | Explore Races</title>
      </Helmet>
      <AllMarathon></AllMarathon>
      {/* <AddMarathons></AddMarathons> */}
      {/* <MarathonDetails></MarathonDetails> */}
    </div>
  );
}

export default Marathons;
