import React from "react";
import { Button } from "./ui/button";
import { Video } from "./video";

const ActionToSell = () => {
  return (
    <div className="container px-4 mx-auto grid md:grid-cols-2 gap-4 py-8">
      <div>
        <h2 className="font-semibold">Start Earning with Creative Market</h2>
        <p className="text-gray-600 text-sm py-4">
          Sell your designs and reach millions of buyers or promote other
          artists on Creative Market to earn cash!
        </p>
        <div className="space-x-4">
          <Button variant="default">Sell your designs</Button>
          <Button variant="outline">Become an affiliate</Button>
        </div>
      </div>
      <div>
        <Video src="https://www.youtube.com/watch?v=3uA1yMnaS2I" />
      </div>
    </div>
  );
};

export default ActionToSell;
