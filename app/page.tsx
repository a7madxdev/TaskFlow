import AddTask from "@/components/AddTask";
import TasksList from "@/components/TasksList";
import React from "react";

const Page = () => {
  return (
    <main className="w-screen h-full grid md:grid-cols-[300px_1fr] md:gap-10 gap-5 p-10">
      <AddTask />
      <TasksList />
    </main>
  );
};

export default Page;
