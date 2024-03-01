"use client";
import React, { useEffect, useState } from "react";

function Barcode({ itemList }) {
  const [randomBarcode, setRandomBarcode] = useState(null);

  useEffect(() => {
    if (itemList.length > 0) {
      const intervalId = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * itemList.length);
        setRandomBarcode(itemList[randomIndex].barcode);
      }, 2000);

      // Cleanup the interval on component unmount or itemList change
      return () => clearInterval(intervalId);
    }
  }, [itemList]);

  if (itemList.length > 0) {
    return <td className="text-center">{randomBarcode}</td>;
  }

  return null;
}

export default Barcode;
