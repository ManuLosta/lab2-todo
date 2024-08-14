import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAuth } from "../auth";
import { useNavigate } from "@tanstack/react-router";

type Input = {
  username: string;
  password: string;
};

export default function LoginForm() {
  const { register, handleSubmit } = useForm<Input>();
  const { updateUser } = useAuth();
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: (data: Input) => {
      return axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, data);
    },
    onSuccess: async (res) => {
      const user = res.data;
      updateUser(user);
      navigate({ to: "/" });
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const onSubmit: SubmitHandler<Input> = (data) => {
    mutation.mutate(data);
  };

  return (
    <form
      className="flex flex-col gap-2 min-w-[300px]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="my-2">
        <label htmlFor="username">Username</label>
        <input
          className="input w-full mt-2"
          id="username"
          {...register("username")}
        />
      </div>
      <div className="my-2">
        <label htmlFor="password">Password</label>
        <input
          className="input w-full mt-2"
          type="password"
          id="password"
          {...register("password")}
        />
      </div>
      <button className="my-2 mx-auto btn" type="submit">
        Login
      </button>
    </form>
  );
}
