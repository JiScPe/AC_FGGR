"use client";
import { useEffect, useState } from "react";
import Card from "./total-table/Card";

function TotalSection() {
  const [totalData, settotalData] = useState([]);
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(() => {
      fetchData();
    }, 1000 * 10);

    return () => clearInterval(intervalId);
  }, []);

  function fetchData() {
    console.log("fetching total data...");
    // setisLoading(true)
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/get-total`, {
      cache: "no-store",
    })
      .then((res) => res.json())
      .then((data) => {
        console.info(`%cTotal Data:`, "color: green;");
        console.info(data);
        settotalData(data);
        setisLoading(false);
      });
  }

  return (
    <div className="col-span-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {isLoading ? (
          <>
            <div className="flex flex-col items-center m-2 bg-gray-700 py-20 rounded-lg animate-pulse">
              <p>{""}</p>
            </div>
            <div className="flex flex-col items-center m-2 bg-gray-700 py-20 rounded-lg animate-pulse">
              <p>{""}</p>
            </div>
            <div className="flex flex-col items-center m-2 bg-gray-700 py-20 rounded-lg animate-pulse">
              <p>{""}</p>
            </div>
            <div className="flex flex-col items-center m-2 bg-gray-700 py-20 rounded-lg animate-pulse">
              <p>{""}</p>
            </div>
          </>
        ) : (
          <>
            <Card qty={totalData[0].MesOffline} name="Mes Offline" />
            <Card qty={totalData[0].Inbound} name={"FG GR"} />
            <Card qty={totalData[0].NotInbound} name="Diff" diff={true} />
            <Card qty={"???"} name="Total" />
          </>
        )}
      </div>
    </div>
  );
}

export default TotalSection;
