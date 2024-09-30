import React from "react";
import { Button } from "./ui/button";
import { Video } from "./video";

const ActionToSell = () => {
  return (
    <div className="container px-8 mx-auto flex flex-wrap gap-4 py-8  rounded-lg">
      <div className="flex-grow pt-12">
        <h2 className="font-semibold text-3xl">
          Start Earning with Creative Market
        </h2>
        <p className="text-gray-600 text-sm py-4 max-w-md">
          Sell your designs and reach millions of buyers or promote other
          artists on Creative Market to earn cash!
        </p>
        <div className="gap-2 flex flex-col items-baseline lg:flex-row">
          <Button variant="default">Sell your designs</Button>
          <Button variant="outline">Become an affiliate</Button>
        </div>
      </div>
      <Video src="https://www.youtube.com/watch?v=3uA1yMnaS2I" />
    </div>
  );
};

export default ActionToSell;
