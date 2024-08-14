import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTodo } from "../services/todo";
import { useAuth } from "../auth";
import { SubmitHandler, useForm } from "react-hook-form";

type Input = {
  title: string;
};

export default function CreateTodo() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset } = useForm<Input>();
  const mutation = useMutation({
    mutationFn: (data: Input) =>
      createTodo(user?.access_token || "", data.title),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const onSubmit: SubmitHandler<Input> = (data) => {
    mutation.mutate(data);
    reset();
  };

  return (
    <form className="flex gap-3 mt-8" onSubmit={handleSubmit(onSubmit)}>
      <input className="input p-2" {...register("title")} />
      <button type="submit" className="btn">
        Add
      </button>
    </form>
  );
}
