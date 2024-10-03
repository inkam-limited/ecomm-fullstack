import { Button } from "@/components/ui/button";
import { Facebook, Linkedin, LinkedinIcon, Twitter } from "lucide-react";
import React from "react";

const ShareLInks = () => {
  return (
    <div className="flex space-x-4">
      <Button variant="outline">
        <Twitter className="mr-2 h-4 w-4" />
        Twitter
      </Button>
      <Button variant="outline">
        <Facebook className="mr-2 h-4 w-4" />
        Facebook
      </Button>
      <Button variant="outline">
        <Linkedin className="mr-2 h-4 w-4" />
        LinkedIn
      </Button>
    </div>
  );
};

export default ShareLInks;
