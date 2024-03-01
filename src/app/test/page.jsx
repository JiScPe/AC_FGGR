import React, { Suspense } from "react";
import Test from "../components/Test";

async function getTodo() {
  let res = await fetch("https://jsonplaceholder.typicode.com/todos/1");
  const todo = await res.json();
  return todo;
}

async function page() {
  const todo = await getTodo();
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Test todo={todo} />
    </Suspense>
  );
}

export default page;
