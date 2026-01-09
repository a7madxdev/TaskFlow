"use client";

import { startTransition, useActionState, useEffect, useState } from "react";
import { deleteTaskAction } from "@/lib/actions/task.actions";
import { FolderOpen } from "lucide-react";
import Task from "./Task";
import { useAlert } from "@/context/AlertContext";
import { useToast } from "@/context/ToastContext";

type TaskType = {
  id: string;
  title: string;
  description: string;
  done: boolean;
  createAt: Date;
};

const TasksList = ({ tasks }: { tasks: TaskType[] }) => {
  const { showAlert } = useAlert();
  const { showToast } = useToast();
  const pendingTasks = tasks.filter((task) => !task.done);
  const completedTasks = tasks.filter((task) => task.done);
  const [deleteState, deleteAction, deletePending] = useActionState(
    deleteTaskAction,
    {
      status: "idle",
    }
  );
  const [deletingId, setDeletingId] = useState<string | null>(null);
  useEffect(() => {
    if (deleteState.status === "success") {
      setDeletingId(null);
      showToast("The task has been successfully deleted", "success");
    } else if (deleteState.status === "error") {
      showToast(deleteState.error, "error");
      setDeletingId(null);
    }
  }, [deleteState]);

  const onDelete = (id: string) => {
    showAlert({
      title: "Delete Task",
      message: "Delete this task ?",
      btnText: "Delete",
      btnStyle: "danger",
      onConfirm: () => {
        deleteAction(id);
        setDeletingId(id);
      },
      loading: deletePending,
      overlay: {
        theme: "dark",
      },
    });
  };

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
          <Task
            key={i}
            {...task}
            onDelete={onDelete}
            disabled={task.id === deletingId}
          />
        ))}
        {completedTasks.length > 0 && (
          <div className="h-10 text-sm flex items-center justify-center relative before:h-px before:w-8 before:bg-gray-400 before:absolute before:left-[calc(50%-55px)] before:top-[calc(50%-0.5px)] after:h-px after:w-8 after:bg-gray-400 after:absolute after:left-[calc(50%+23px)] after:top-[calc(50%-0.5px)]">
            Done
          </div>
        )}
        {completedTasks.map((task, i) => (
          <Task
            key={i}
            {...task}
            onDelete={deleteAction}
            disabled={task.id === deletingId}
          />
        ))}
      </ul>
    </div>
  );
};

export default TasksList;
