import React from "react";
import { AvengerCodeRain } from "./background/AvengerCodeRain";
import { AvengerParticles } from "./background/AvengerParticles";
import { AvengerOrbs } from "./background/AvengerOrbs";

export const AvengerBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
      <AvengerCodeRain />
      <AvengerParticles />
      <AvengerOrbs />
    </div>
  );
};
