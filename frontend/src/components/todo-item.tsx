import { CheckIcon, Trash2 } from "lucide-react";
import { Todo } from "../types/todo";
import { deleteTodo, toggleTodoCompletion } from "../services/todo";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../auth";

export default function TodoItem({ todo }: { todo: Todo }) {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const toggleCompletion = useMutation({
    mutationFn: (id: number) =>
      toggleTodoCompletion(user?.access_token || "", id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const remove = useMutation({
    mutationFn: (id: number) => deleteTodo(user?.access_token || "", id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  return (
    <div
      className="p-4 rounded-sm flex items-center justify-between cursor-pointer"
      onClick={() => toggleCompletion.mutate(todo.id)}
    >
      {!todo.completed ? (
        <div className="flex items-center gap-3">
          <div className="border-2 border-slate-800 rounded-sm h-[24px] w-[24px]"></div>
          <p className="font-medium">{todo.title}</p>
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <div className="border-2 border-slate-800 rounded-sm h-[24px] w-[24px] bg-slate-800 flex items-center justify-center">
            <CheckIcon color="white" size={20} />
          </div>
          <p className="text-slate-500 line-through">{todo.title}</p>
        </div>
      )}
      <button
        onClick={() => remove.mutate(todo.id)}
        className="hover:bg-red-500 p-1 rounded-sm text-red-500 hover:text-white transition-all duration-300"
      >
        <Trash2 />
      </button>
    </div>
  );
}
