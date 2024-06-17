"use client";
import { useEffect, useState } from "react";
import Chart from "chart.js/auto";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import ChartDataLabels from "chartjs-plugin-datalabels";
import moment from "moment";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import MyDateRangePicker from "../MyDateRangePicker";
import { configuringDatalabel } from "./configChart";
import { useSearchParams } from "next/navigation";
import TableLoading from "../table-detail/TableLoading";

/* `Chart.register(ChartDataLabels);` is registering the `ChartDataLabels` plugin with the
    `Chart.js` library. This allows the plugin to be used in the chart configuration to display data
    labels on the chart. */
Chart.register(ChartDataLabels);

const FGGRRateChart = () => {
  const [dateRange, setDateRange] = useState([
    {
      startDate: moment().subtract(7, "days").toDate(), // 6 days ago
      endDate: new Date(), // today
      key: "selection",
    },
  ]);

  const [showDatePicker, setShowDatePicker] = useState(true);
  const [isLoading, setisLoading] = useState(true);
  const [toggleDateRange, settoggleDateRange] = useState(false);
  const searchParams = useSearchParams();
  const plant = searchParams.get("plant");

  

  useEffect(() => {
    function fetchData() {
      const start_date = moment(dateRange[0].startDate).format("YYYY-MM-DD");
      const end_date = moment(dateRange[0].endDate).format("YYYY-MM-DD");
  
      fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/fggr-rate?start_date=${start_date}&end_date=${end_date}&plant=${plant}`,
        { cache: "no-store" }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            configuringChart(data);
            setisLoading(false);
          }
        });
    }
    setisLoading(true);
    fetchData();
  }, [dateRange, plant]);

  async function configuringChart(reportData) {
    /**
     * The function "configuringDatalabel" returns a configuration object for data labels in a chart,
     * with different properties based on the chart type.
     * @returns an object with the following properties:
     */
    const data = {
      labels: reportData.map(({ Created_Date }) => Created_Date),
      datasets: [
        {
          label: "Mes Offline",
          data: reportData.map(({ MesOffline }) => MesOffline),
          backgroundColor: "rgba(255, 191, 70, 0.7)",
          borderColor: "rgba(255, 191, 70, 1)",
          borderWidth: 1,
          datalabels: configuringDatalabel("Mes Offline"),
        },
        {
          label: "GR",
          data: reportData.map(
            ({ Inbound, Not_GR_in_Day }) =>
              parseInt(Inbound) - parseInt(Not_GR_in_Day)
          ),
          backgroundColor: "rgba(138, 255, 136, 0.7)",
          borderColor: "rgba(138, 255, 136, 1)",
          borderWidth: 1,
          datalabels: configuringDatalabel("GR"),
        },
        {
          label: "Diff",
          data: reportData.map(
            ({ NotInbound, Not_GR_in_Day }) =>
              parseInt(NotInbound) + parseInt(Not_GR_in_Day)
          ),
          backgroundColor: "rgba(223, 41, 53, 0.7)",
          borderColor: "rgba(223, 41, 53, 1)",
          borderWidth: 1,
          datalabels: configuringDatalabel("Diff"),
        },
      ],
    };

    // Chart configuration
    const config = {
      type: "bar",
      data: data,
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        plugins: {
          title: {
            display: true,
          },
        },
      },
    };

    // Get the canvas element
    const ctx = document.getElementById("Chart");

    // Check if the chart already exists and destroy it
    const existingChart = Chart.getChart(ctx);
    if (existingChart) {
      existingChart.destroy();
    }

    // Create the new chart
    new Chart(ctx, config);
  }

  function handleDateRangeToggle() {
    settoggleDateRange(!toggleDateRange);
    if (toggleDateRange) {
      setShowDatePicker(false);
    } else {
      setShowDatePicker(true);
    }
  }

  const handleDateChange = (ranges) => {
    setDateRange([ranges.selection]);
  };

  return (
    <div className="col-span-2 bg-slate-700 bg-opacity-30 p-2 rounded-md shadow-lg">
      {/* {isLoading ? (
        <TableLoading isVisible={isLoading} />
      ) : ( */}
      <div className="flex flex-col justify-center px-3">
        <button
          type="button"
          className="flex items-center justify-center text-xl text-white hover:bg-slate-500 hover:bg-opacity-50 transition-colors duration-300 rounded-t-md py-1"
          onClick={handleDateRangeToggle}
          title="toggleChart"
        >
          {toggleDateRange ? <FaChevronUp /> : <FaChevronDown />}
        </button>

        {isLoading ? (
          <TableLoading isVisible={isLoading} />
        ) : (
          toggleDateRange && (
            <MyDateRangePicker
              value={dateRange}
              onChange={handleDateChange}
              visible={showDatePicker}
            />
          )
        )}
        <canvas id="Chart" className="w-full h-[400px]"></canvas>
      </div>
      {/* )} */}
    </div>
  );
};

export default FGGRRateChart;
