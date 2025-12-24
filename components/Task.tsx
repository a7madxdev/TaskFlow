"use client";

import { Edit, Trash2, Circle, CircleCheckBig, Loader } from "lucide-react";
import { useActionState, useState, startTransition, useEffect } from "react";
import InputField from "./InputField";
import Button from "./Button";
import {
  toggleTaskStatusAction,
  updateTaskAction,
} from "@/lib/actions/task.actions";
import { useAlert } from "@/context/AlertContext";
import { twMerge } from "tailwind-merge";
import { useToast } from "@/context/ToastContext";

const Task = ({
  id,
  title,
  description,
  done,
  onDelete,
  disabled,
}: {
  id: string;
  title: string;
  description: string;
  done: boolean;
  onDelete: (id: string) => void;
  disabled: boolean;
}) => {
  const [editing, setEditing] = useState(false);
  const [updatedTask, setUpdatedTask] = useState({
    title: "",
    description: "",
  });
  const [toggleState, toggleAction, isTogglePending] = useActionState(
    toggleTaskStatusAction,
    {}
  );
  const [updateState, updateAction, isUpdatePending] = useActionState(
    updateTaskAction,
    {}
  );
  const { showToast } = useToast();

  useEffect(() => {
    if (!isUpdatePending && updateState.status !== "error") {
      setEditing(false);
    }
  }, [updateState]);

  useEffect(() => {
    if (editing) {
      setUpdatedTask({ title, description });
    }
  }, [editing, id]);

  useEffect(() => {
    setEditing(false);
  }, [id]);

  useEffect(() => {
    if (toggleState.status === "error") {
      showToast(toggleState.error, "error");
    }
  }, [toggleState]);
  useEffect(() => {
    console.log(updateState);
    if (
      updateState.status === "error" &&
      typeof updateState.error === "string"
    ) {
      showToast(updateState.error, "error");
    }
  }, [updateState]);

  return (
    <li
      className={twMerge(
        "bg-gray-200 p-3 rounded-md select-none not-last:mb-2",
        isTogglePending || isUpdatePending || disabled
          ? "pointer-events-none opacity-50"
          : ""
      )}
    >
      <div className={`flex min-h-6 py-1.5 gap-2`}>
        <div className="min-h-full flex items-center">
          <label
            className={`${
              editing ? "pointer-events-none opacity-50" : ""
            } cursor-pointer`}
            htmlFor={id}
          >
            {isTogglePending ? (
              <span className="animate-spin block">
                <Loader size={16} />
              </span>
            ) : (
              <span className={done ? "text-gray-600" : ""}>
                {done ? <CircleCheckBig size={16} /> : <Circle size={16} />}
              </span>
            )}
          </label>
          <input
            id={id}
            type="checkbox"
            className="appearance-none"
            checked={done}
            onChange={(e) => {
              startTransition(() => toggleAction(id));
            }}
          />
        </div>
        {editing ? (
          <InputField
            className="flex-1"
            type={"text"}
            value={updatedTask.title}
            setValue={(title: string) =>
              setUpdatedTask((prev) => ({ ...prev, title }))
            }
            placeholder={title}
          />
        ) : (
          <label
            htmlFor={id}
            className={`font-medium flex-1 cursor-pointer break-all ${
              done ? "line-through text-gray-600" : ""
            }`}
          >
            {title}
          </label>
        )}
      </div>
      {editing ? (
        <InputField
          className="mb-2"
          type="text"
          value={updatedTask.description}
          setValue={(description: string) =>
            setUpdatedTask((prev) => ({ ...prev, description }))
          }
          placeholder={description as string}
        />
      ) : (
        <p className="text-sm text-gray-700">{description}</p>
      )}
      {(updateState?.error?.title?.errors ||
        updateState?.error?.description?.errors) &&
        editing && (
          <p className="bg-red-200 text-sm w-fit rounded-sm text-red-600 px-2 py-1 mb-2 border-l-2">
            {updateState?.error?.title?.errors[0] ||
              updateState?.error?.description?.errors[0]}
          </p>
        )}
      <div className="flex justify-end gap-1">
        {editing ? (
          <>
            <Button
              onClick={() => {
                setEditing(false);
                setUpdatedTask({ title, description });
                updateState.error = {};
              }}
              className="bg-gray-300 text-black font-normal"
            >
              Cancel
            </Button>
            <Button
              style="primary"
              onClick={() => {
                startTransition(() =>
                  updateAction({
                    id,
                    ...(updatedTask as { title: string; description: string }),
                  })
                );
              }}
              disabled={
                (updatedTask.title === title &&
                  updatedTask.description === description) ||
                !updatedTask.title ||
                !updatedTask.description
              }
            >
              {isUpdatePending ? "Updating.." : "Update"}
            </Button>
          </>
        ) : (
          <>
            <button
              className="grid place-items-center size-6 duration-150 hover:scale-95 text-blue-800"
              onClick={() => setEditing(true)}
            >
              <Edit size={18} />
            </button>
            <button
              className="grid place-items-center size-6 duration-150 hover:scale-95 text-red-500"
              onClick={() => {
                onDelete(id);
              }}
            >
              <Trash2 size={18} />
            </button>
          </>
        )}
      </div>
    </li>
  );
};

export default Task;
