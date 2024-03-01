import MyThemeToggle from "./MyThemeToggle";

function MainNavigation() {
  return (
    <nav className="h-10 w-full text-center flex items-center justify-center mb-3 shadow-md text-gray-700 dark:text-white dark:bg-opacity-0">
      <h1 className="font-bold text-2xl">AC Factory FGGR Dashboard</h1>
      <MyThemeToggle />
    </nav>
  );
}

export default MainNavigation;
