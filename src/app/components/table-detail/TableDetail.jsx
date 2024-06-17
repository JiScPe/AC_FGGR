"use client";
import { useEffect, useState } from "react";
import Barcode from "./Barcode";
import TableLoading from "./TableLoading";
import { useSearchParams } from "next/navigation";

function TableDetail() {
  const [fggrList, setfggrList] = useState([]);
  const [barcodeList, setbarcodeList] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const searchParams = useSearchParams();
  const plant = searchParams.get("plant");

  useEffect(() => {
    setisLoading(true)
    fetchData();
    fetchAllBarcode();
    const intervalId = setInterval(() => {
      fetchData();
      fetchAllBarcode();
    }, 1000 * 60 * 5);

    return () => clearInterval(intervalId);
  }, [plant]);

  async function fetchData() {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/get-fggr?plant=${plant}`)
      .then((res) => res.json())
      .then((data) => {
        setfggrList(data);
        setisLoading(false);
      });
  }

  async function fetchAllBarcode() {
    fetch(`/api/fg-notgr?plant=${plant}`)
      .then((res) => res.json())
      .then((data) => setbarcodeList(data));
  }

  return (
    <div className="col-span-2 overflow-y-hidden p-2 shadow-lg text-white bg-slate-700 bg-opacity-30 rounded-md">
      {isLoading ? (
        <TableLoading isVisible={isLoading} />
      ) : (
        <table className="min-w-full">
          <thead className="shadow-md pb-5">
            <tr className="min-w-full">
              <th>#</th>
              <th>FG</th>
              <th>FG Desc</th>
              <th>Offline</th>
              <th>GR</th>
              <th>Diff</th>
              <th>Barcode</th>
            </tr>
          </thead>
          <tbody>
            {fggrList.map((item, idx) => (
              <tr key={item.row_id} className="leading-9">
                <td className="text-center">{idx + 1}</td>
                <td>{item.FG}</td>
                <td>{item.FG_Desc}</td>
                <td className="text-center">{item.MES_Offline}</td>
                <td className="text-center">{item.GR}</td>
                <td className="font-semibold text-center text-rose-400">
                  {item.Diff}
                </td>
                <Barcode
                  itemList={barcodeList.filter(
                    (barcode) => barcode.product_code === item.FG
                  )}
                />
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default TableDetail;
