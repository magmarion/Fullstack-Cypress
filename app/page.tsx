"use client";

import { useState } from "react";

interface Todo {
  id: string;
  text: string;
}

const mockedTodos: Todo[] = [
  {
    id: "1",
    text: "Feed the cat",
  },
  {
    id: "2",
    text: "Ignore the dog",
  },
  {
    id: "3",
    text: "Walk all the cats",
  },
];

export default function Home() {
  const [todos, setTodos] = useState(mockedTodos);

  return (
    <main>
      <ul>
        {todos.map((t) => (
          <li key={t.id}>
            <span>{t.text}</span>
            <button
              onClick={() => setTodos(todos.filter(({ id }) => t.id !== id))}
            >
              🗑️
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}
