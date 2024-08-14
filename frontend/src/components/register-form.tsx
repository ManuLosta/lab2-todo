import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

type Input = {
  username: string;
  password: string;
  repeatPassword: string;
};

export default function RegisterForm() {
  const { register, handleSubmit } = useForm<Input>();
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: (data: Input) => {
      return axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, {
        username: data.username,
        password: data.password,
      });
    },
    onSuccess: () => {
      navigate({ to: "/login" });
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
      <div className="my-2">
        <label htmlFor="repeatPassword">Repeat password</label>
        <input
          className="input w-full mt-2"
          type="password"
          id="repeatPassword"
          {...register("repeatPassword")}
        />
      </div>
      <button className="my-2 mx-auto btn" type="submit">
        Register
      </button>
    </form>
  );
}
