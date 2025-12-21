import { prisma } from "@/lib/prisma";
import Task from "./Task";
import { FolderOpen } from "lucide-react";

const TasksList = async () => {
  const tasks = await prisma.task.findMany({ orderBy: { createAt: "desc" } });
  const pendingTasks = tasks.filter((task) => !task.done);
  const completedTasks = tasks.filter((task) => task.done);
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <h1 className="text-xl font-semibold h-full">Tasks List</h1>
        {tasks.length > 0 && (
          <span className="text-sm text-gray-600">
            {completedTasks.length}/{tasks.length}
          </span>
        )}
      </div>
      {tasks.length === 0 && (
        <div className="flex flex-col items-center text-gray-500">
          <span className="">
            <FolderOpen size={34} />
          </span>
          <p className="text-sm">No tasks, add some now :)</p>
        </div>
      )}
      <ul>
        {pendingTasks.map((task, i) => (
          <Task key={i} {...task} />
        ))}
        {completedTasks.length > 0 && (
          <div className="h-10 text-sm flex items-center justify-center relative before:h-px before:w-8 before:bg-gray-400 before:absolute before:left-[calc(50%-55px)] before:top-[calc(50%-0.5px)] after:h-px after:w-8 after:bg-gray-400 after:absolute after:left-[calc(50%+23px)] after:top-[calc(50%-0.5px)]">
            Done
          </div>
        )}
        {completedTasks.map((task, i) => (
          <Task key={i} {...task} />
        ))}
      </ul>
    </div>
  );
};

export default TasksList;
