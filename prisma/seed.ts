import { Todo } from "@/generated/prisma";
import { db } from "./db";

async function main() {
  const mockedTodos: Todo[] = [
    {
      id: "68adb30b0c2c50f13d0a64e9",
      text: "Feed the cat",
    },
    {
      id: "68adb30b0c2c50f13d0a64ea",
      text: "Ignore the dog",
    },
    {
      id: "68adb30b0c2c50f13d0a64eb",
      text: "Walk all the cats",
    },
  ];

  for (const { id, ...todo } of mockedTodos) {
    await db.todo.upsert({
      where: { id },
      update: todo,
      create: { id, ...todo },
    });
  }
}

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
