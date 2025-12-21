"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export const createTask = async (currentState: any, formData: FormData) => {
  const title = (formData.get("title") as string).trim();
  const description = (formData.get("description") as string).trim();
  if (!title) return;

  try {
    await prisma.task.create({
      data: {
        title,
        description,
      },
    });
    revalidatePath("/");

    return {
      success: true,
      message: "Task created successfully!",
      error: null,
    };
  } catch (error) {
    return { success: false, message: "Task not created", error };
  }
};

export const toggleTaskStatus = async (currentState: any, taskId: string) => {
  try {
    const task = await prisma.task.findUnique({ where: { id: taskId } });
    if (!task)
      return { success: false, message: "Task not found", error: null };

    await prisma.task.update({
      where: { id: taskId },
      data: { done: !task?.done },
    });

    revalidatePath("/");
    return {
      success: true,
      message: "Status toggled successfully",
      error: null,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Status not toggled successfully",
      error: error,
    };
  }
};

export const updateTask = async (
  currentState: any,
  taskData: { id: string; title: string; description: string }
) => {
  const { id, title, description } = taskData;
  try {
    const task = await prisma.task.findUnique({ where: { id } });
    if (!task)
      return {
        success: false,
        message: "Task not found",
        error: null,
      };

    await prisma.task.update({ where: { id }, data: { title, description } });
    revalidatePath("/");
    return {
      success: true,
      message: "Task updated successfully!",
      error: null,
    };
  } catch (error) {
    return {
      success: false,
      message: "Task not found",
      error: error,
    };
  }
};

export const deleteTask = async (id: string) => {
  try {
    await prisma.task.delete({ where: { id } });
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
};
