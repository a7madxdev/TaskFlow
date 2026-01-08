import { prisma } from "@/lib/prisma";

// ? Rules

const USERNAME_REGEX = /^[A-Za-z][A-Za-z0-9_]{5,29}$/;

// ? Helpers
export const normalizeUsernameBase = (email: string) => {
  let base = email.split("@")[0];

  base = base.toLowerCase().replace(/[^a-z0-9]/g, "");
  if (!/^[a-z]/.test(base)) {
    base = "u" + base;
  }

  if (base.length < 6) {
    base = base.padEnd(6, "0");
  }
  if (base.length > 30) {
    base = base.slice(0, 30);
  }

  return base;
};

const generateSuffix = () => {
  return Math.floor(100 + Math.random() * 900).toString();
};

const isValidUsername = (username: string) => {
  return USERNAME_REGEX.test(username);
};

// ? Main API
export const generateUniqueUsername = async (email: string) => {
  let base = normalizeUsernameBase(email);

  if (!isValidUsername(base)) {
    base = "user" + generateSuffix();
  }

  let username = base;
  let attmept = 0;

  while (attmept < 5) {
    const exists = await prisma.user.findUnique({
      where: { username },
      select: { id: true },
    });

    if (!exists) return username;
    const suffix = generateSuffix();
    username = `${base.slice(0, 30 - suffix.length)}${suffix}`;
    attmept++;
  }

  return `user_${Date.now().toString().slice(-8)}`;
};
