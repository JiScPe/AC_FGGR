"use client";
import { useEffect, useState } from "react";
import Card from "./total-table/Card";
import { useSearchParams } from "next/navigation";

function TotalSection() {
  const [totalData, settotalData] = useState({});
  const [isLoading, setisLoading] = useState(true);

  const searchParams = useSearchParams();
  const plant = searchParams.get("plant");

  useEffect(() => {
    setisLoading(true)
    fetchData();
    const intervalId = setInterval(() => {
      fetchData();
    }, 1000 * 60 * 5);

    return () => clearInterval(intervalId);
  }, [plant]);

  function fetchData() {
    // setisLoading(true)
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/get-total?plant=${plant}`)
      .then((res) => res.json())
      .then((data) => {
        // console.info(`%cTotal Data: ${plant}`, "color: green;");
        // console.info(data);
        settotalData(data);
        setisLoading(false);
      });
  }

  return (
    <div className="col-span-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
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
          </>
        ) : (
          <>
            <Card qty={totalData.MesOffline} name="Mes Offline" />
            <Card qty={totalData.Inbound} name={"FG GR"} />
            <Card qty={totalData.NotInbound} name="Diff" diff={true} />
          </>
        )}
      </div>
    </div>
  );
}

export default TotalSection;
