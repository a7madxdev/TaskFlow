"use server";

import { revalidatePath } from "next/cache";
import {
  createTask,
  deleteTask,
  getTaskById,
  toggleTaskStatus,
  updateTask,
} from "../services/task.services";
import z from "zod";
import { auth } from "@/auth";

type ActionState = {
  status?: "idle" | "loading" | "success" | "error";
  error?: string | any;
};

const createTaskSchema = z.object({
  title: z
    .string()
    .trim()
    .nonempty("Title can't be empty")
    .max(128, "Task title is too long"),
  description: z
    .string()
    .trim()
    .nonempty("Description can't be empty")
    .max(256, "Task description is too long"),
});

const updateTaskSchema = createTaskSchema.extend({
  id: z.string(),
});

export const createTaskAction = async (
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> => {
  const session = await auth();
  if (!session?.user?.id) return { status: "error", error: "Unauthorized" };
  const rawData = {
    title: formData.get("title") as string,
    description: formData.get("description") as string,
  };
  const parsed = createTaskSchema.safeParse(rawData);
  if (!parsed.success) {
    return { error: z.treeifyError(parsed.error).properties, status: "error" };
  }
  const { title, description } = parsed.data;

  try {
    await createTask(title, description, session.user.id);
    revalidatePath("/");

    return {
      status: "success",
    };
  } catch (error) {
    return { error: "Failed to add the task, try again", status: "error" };
  }
};

export const toggleTaskStatusAction = async (
  prevState: ActionState,
  taskId: string
): Promise<ActionState> => {
  const session = await auth();
  if (!session) return { status: "error", error: "Unauthorized" };
  try {
    const task = await getTaskById(taskId, session.user.id);
    if (!task)
      return {
        error: "This task isn't exist",
        status: "error",
      };

    await toggleTaskStatus(taskId, session.user.id, !task.done);

    revalidatePath("/");
    return {
      status: "success",
    };
  } catch (error) {
    return {
      status: "error",
      error: "Something went wrong, try again",
    };
  }
};

export const updateTaskAction = async (
  prevState: ActionState,
  { id, title, description }: { id: string; title: string; description: string }
): Promise<ActionState> => {
  const session = await auth();
  if (!session) return { status: "error", error: "Unauthorized" };
  try {
    const parsed = updateTaskSchema.safeParse({ id, title, description });
    if (!parsed.success)
      return {
        error: z.treeifyError(parsed.error).properties,
        status: "error",
      };
    const task = await getTaskById(parsed.data.id, session.user.id);
    if (!task)
      return {
        error: "Task does not exist",
        status: "error",
      };

    await updateTask(
      id,
      {
        title: parsed.data.title,
        description: parsed.data.description,
      },
      session.user.id
    );
    revalidatePath("/");
    return {
      status: "success",
    };
  } catch (error) {
    return {
      error: "Failed to update the task, try again",
      status: "error",
    };
  }
};

export const deleteTaskAction = async (
  prevState: ActionState,
  id: string
): Promise<ActionState> => {
  const session = await auth();
  if (!session) return { status: "error", error: "Unauthorized" };
  try {
    const task = await getTaskById(id, session.user.id);
    if (!task) return { error: "This task isn't exist", status: "error" };
    await deleteTask(id, session.user.id);
    revalidatePath("/");
    return { status: "success" };
  } catch (error) {
    return { error: "Failed to delete the task, try again", status: "error" };
  }
};
