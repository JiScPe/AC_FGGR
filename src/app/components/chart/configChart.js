export function configuringDatalabel(chartType) {
  const dataLabelConfig = {
    align: "start",
    color: "#e9f0ff",
    anchor: "end",
    rotation: chartType === "Diff" ? 0 : -20,
    font: {
      weight: "bold",
      size: 14,
    },
    offset: -30,
  };
  return dataLabelConfig;
}