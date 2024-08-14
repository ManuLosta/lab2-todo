import { createFileRoute, redirect } from "@tanstack/react-router";
import TodoList from "../components/todo-list";
import CreateTodo from "../components/create-todo";

export const Route = createFileRoute("/")({
  beforeLoad: async ({ context }) => {
    const { isAuthenticated } = context.auth;
    if (!isAuthenticated) {
      throw redirect({ to: "/login" });
    }
  },
  component: () => <Home />,
});

function Home() {
  return (
    <div className="flex flex-col max-w-[500px] mx-auto mt-10 p-5">
      <h1 className="font-bold text-3xl">My Todo</h1>
      <CreateTodo />
      <TodoList />
    </div>
  );
}
