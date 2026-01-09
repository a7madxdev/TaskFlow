import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export const getTasks = async () => {
  const session = await auth();
  if (!session) return { error: "Unauthorized" };
  return prisma.task.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      createAt: "desc",
    },
  });
};

export const getTaskById = async (id: string, userId: string) => {
  return prisma.task.findUnique({ where: { id, userId } });
};

export const createTask = async (
  title: string,
  description: string,
  userId: string
) => {
  return prisma.task.create({ data: { title, description, userId } });
};

export const updateTask = async (
  id: string,
  data: { title?: string; description?: string },
  userId: string
) => {
  return prisma.task.update({ where: { id, userId }, data });
};

export const deleteTask = async (id: string, userId: string) => {
  return prisma.task.delete({ where: { id, userId } });
};

export const toggleTaskStatus = async (
  id: string,
  userId: string,
  done: boolean
) => {
  return prisma.task.update({ where: { id, userId }, data: { done } });
};
