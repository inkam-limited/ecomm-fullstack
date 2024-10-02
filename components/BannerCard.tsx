import { Banner } from "@prisma/client";
import Image from "next/image";
import React from "react";

const BannerCard = ({ banner }: { banner: Banner }) => {
  return (
    <div className="relative aspect-w-7 aspect-h-2 rounded-lg">
      <Image src={banner.imageString} alt={banner.title} fill />
    </div>
  );
};

export default BannerCard;
