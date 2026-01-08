import { auth } from "@/auth";
import AddTask from "@/components/AddTask";
import TasksList from "@/components/TasksList";
import { getTasks } from "@/lib/services/task.services";
import { redirect } from "next/navigation";

const HomePage = async () => {
  const session = await auth();
  const tasks = await getTasks();
  return (
    <main className="grid md:grid-cols-[300px_1fr] md:gap-10 gap-5 py-5">
      <AddTask />
      <TasksList tasks={tasks} />
    </main>
  );
};

export default HomePage;
