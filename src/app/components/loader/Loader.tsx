"use client";

import React, { useEffect } from "react";
import PlaneLoader from "./PlaneLoader.js";
import styles from "./Loader.module.scss";

function Loader() {
  useEffect(() => {
    const canvas = document.querySelector("#plane-canvas");

    if (canvas) {
      new PlaneLoader(canvas);
    }
  }, []);

  return (
    <canvas className={styles.canvas} id="plane-canvas"></canvas>
  );
}

export default React.memo(Loader);