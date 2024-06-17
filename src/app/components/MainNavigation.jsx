"use client";

import { useRouter, useSearchParams } from "next/navigation";

function MainNavigation() {
  const route = useRouter();
  const searchParams = useSearchParams();
  const plant = searchParams.get("plant");

  if (!plant) {
    route.push(`/?plant=${process.env.NEXT_PUBLIC_DEFAULT_PLANT}`);
  }

  function handleSelectPlantChange(value) {
    return route.push(`/?plant=${value}`);
  }

  return (
    <nav className="h-10 w-full text-center flex items-center justify-center mb-3 shadow-md text-white gap-3">
      <select
        name="plant"
        id="plant"
        className="text-xl font-semibold rounded-sm focus:outline-none bg-black bg-opacity-30"
        value={plant}
        onChange={(e) => handleSelectPlantChange(e.target.value)}
      >
        <Option plant_val={"9771"} name={"RF"} />
        <Option plant_val={"9773"} name={"WAC"} />
        <Option plant_val={"9774"} name={"SAC"} />
      </select>
      <h1 className="font-bold text-2xl"> Factory FGGR Dashboard</h1>
      {/* <MyThemeToggle /> */}
    </nav>
  );
}

export default MainNavigation;

function Option({ plant_val, name }) {
  return (
    <option value={plant_val} className="bg-inherit">
      {name}
    </option>
  );
}
