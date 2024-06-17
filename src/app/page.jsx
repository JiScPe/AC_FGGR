import TotalSection from "./components/TotalSection";
import FGGRRateChart from "./components/chart/FGGRRateChart";
import TableDetail from "./components/table-detail/TableDetail";

export default async function Home() {
  return (
    <div className="flex h-full items-center">
      <div className="mx-2 grid grid-cols-4 gap-4 w-full">
        <TotalSection />
        <FGGRRateChart />
        <TableDetail />
      </div>
    </div>
  );
}
