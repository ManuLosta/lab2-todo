import { CheckIcon } from "lucide-react";
import { Todo } from "../types/todo";
import { toggleTodoCompletion } from "../services/todo";
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

  return (
    <div
      className="p-4 rounded-sm flex gap-3 items-center cursor-pointer"
      onClick={() => toggleCompletion.mutate(todo.id)}
    >
      {!todo.completed ? (
        <>
          <div className="border-2 border-slate-800 rounded-sm h-[24px] w-[24px]"></div>
          <p className="font-medium">{todo.title}</p>
        </>
      ) : (
        <>
          <div className="border-2 border-slate-800 rounded-sm h-[24px] w-[24px] bg-slate-800 flex items-center justify-center">
            <CheckIcon color="white" size={20} />
          </div>
          <p className="text-slate-500 line-through">{todo.title}</p>
        </>
      )}
    </div>
  );
}
