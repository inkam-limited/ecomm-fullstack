import React from "react";
import { Button } from "./ui/button";
import { Video } from "./video";

const ActionToSell = () => {
  return (
    <div className="container px-4 mx-auto flex gap-4 py-8 bg-amber-200/20 rounded-lg">
      <div className="basis-full md:basis-1/3 lg:basis-1/2 p-8 pt-20">
        <h2 className="font-semibold">Start Earning with Creative Market</h2>
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
