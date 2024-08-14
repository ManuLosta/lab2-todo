import { useAuth } from "../auth";
import { useQuery } from "@tanstack/react-query";
import TodoItem from "./todo-item";
import { Todo } from "../types/todo";
import { fetchTodos } from "../services/todo";

export default function TodoList() {
  const { user } = useAuth();
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["todos"],
    queryFn: () => fetchTodos(user?.access_token || ""),
  });

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  const notCompleted = data.filter((todo: Todo) => !todo.completed);
  const completed = data.filter((todo: Todo) => todo.completed);

  return (
    <div className="flex flex-col mt-5 divide-y">
      {notCompleted.map((todo: Todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
      <p className="p-3 font-light">Completed</p>
      {completed.map((todo: Todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
}
