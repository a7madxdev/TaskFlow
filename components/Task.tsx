"use client";

import { Edit, Trash2, Circle, CircleCheckBig, Loader } from "lucide-react";
import {
  useActionState,
  useState,
  useTransition,
  startTransition,
  useEffect,
} from "react";
import InputField from "./InputField";
import Button from "./Button";
import {
  deleteTask,
  toggleTaskStatus,
  updateTask,
} from "@/lib/actions/task.actions";
import { useAlert } from "@/context/AlertContext";

const Task = ({
  id,
  title,
  description,
  done,
}: {
  id: string;
  title: string;
  description: string;
  done: boolean;
}) => {
  const [editing, setEditing] = useState(false);
  const [updatedTask, setUpdatedTask] = useState({
    title: "",
    description: "",
  });
  const [, toggleAction, isTogglePending] = useActionState(toggleTaskStatus, {
    success: false,
    message: "",
    error: null,
  });
  const [updateState, updateAction, isUpdatePending] = useActionState(
    updateTask,
    { success: false, message: "", error: null }
  );
  const { showAlert } = useAlert();

  const handleDelete = () => {
    showAlert({
      title: "Delete Task",
      message: "Delete this task ?",
      btnText: "Delete",
      btnStyle: "danger",
      onConfirm: () => deleteTask(id),
      overlay: {
        theme: "dark",
      },
    });
  };

  useEffect(() => {
    if (!isUpdatePending) {
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

  return (
    <li
      className={`bg-gray-200 p-3 rounded-md select-none not-last:mb-2 ${
        isTogglePending || isUpdatePending
          ? "pointer-events-none opacity-50"
          : ""
      }`}
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
            className={`font-medium flex-1 cursor-pointer ${
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
      <div className="flex justify-end gap-1">
        {editing ? (
          <>
            <Button
              onClick={() => {
                setEditing(false);
                setUpdatedTask({ title, description });
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
                updatedTask.title === title &&
                updatedTask.description === description
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
              onClick={handleDelete}
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
