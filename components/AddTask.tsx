"use client";

import {
  FormEvent,
  JSX,
  startTransition,
  useActionState,
  useEffect,
  useState,
} from "react";
import InputField from "./InputField";
import Button from "./Button";
import { createTaskAction } from "@/lib/actions/task.actions";

const AddTask = (): JSX.Element => {
  const [taskData, setTaskData] = useState({ title: "", description: "" });
  const [state, createAction, isPending] = useActionState(createTaskAction, {});

  useEffect(() => {
    if (state?.status === "success") {
      setTaskData({ title: "", description: "" });
    }
  }, [state]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    if (title.trim() && description.trim()) {
      startTransition(() => {
        createAction(formData);
      });
    }
  };

  return (
    <div className="">
      <h1 className="text-xl font-semibold mb-2">Add Task</h1>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="bg-blue-50 w-full p-3 rounded-md"
      >
        <div className="mb-1.5">
          <label className="text-sm">Title</label>
          <InputField
            type={"text"}
            name="title"
            value={taskData.title}
            setValue={(title: string) =>
              setTaskData((prev) => ({ ...prev, title }))
            }
            placeholder="Example: Going to gym"
            disabled={isPending}
          />
        </div>
        <div className="mb-5">
          <label className="text-sm">Description</label>
          <InputField
            type={"text"}
            name="description"
            value={taskData.description}
            setValue={(description: string) =>
              setTaskData((prev) => ({ ...prev, description }))
            }
            placeholder="Describe the task..."
            disabled={isPending}
          />
        </div>
        {(state?.error?.title?.errors || state?.error?.description?.errors) && (
          <p className="bg-red-100 text-sm w-fit rounded-sm text-red-500 px-2 py-1 mb-2 border-l-2">
            {state?.error?.title?.errors[0] ||
              state?.error?.description?.errors[0]}
          </p>
        )}
        <div className="flex justify-end gap-2">
          {(taskData.title || taskData.description) && (
            <Button
              type="reset"
              onClick={() => {
                setTaskData({ title: "", description: "" });
              }}
            >
              Clear
            </Button>
          )}
          <Button
            type="submit"
            style="primary"
            disabled={
              !taskData.title.trim() ||
              !taskData.description.trim() ||
              isPending
            }
          >
            {isPending ? "Adding..." : "Add Task"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddTask;
