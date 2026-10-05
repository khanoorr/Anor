"use client";

import React from "react";
import { AnorLoader, AnorLoaderProps } from "./AnorLoader";

export const Preloader: React.FC<AnorLoaderProps> = (props) => {
  return <AnorLoader {...props} />;
};

export { AnorLoader };
