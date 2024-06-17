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
    <nav className="h-10 w-full text-center flex items-center justify-center mb-3 shadow-md text-gray-700 gap-3">
      <select
        name="plant"
        id="plant"
        className="text-xl font-semibold"
        value={plant}
        onChange={(e) => handleSelectPlantChange(e.target.value)}
      >
        <option value="9771">RF</option>
        <option value="9773">WAC</option>
        <option value="9774">SAC</option>
      </select>
      <h1 className="font-bold text-2xl"> Factory FGGR Dashboard</h1>
      {/* <MyThemeToggle /> */}
    </nav>
  );
}

export default MainNavigation;
