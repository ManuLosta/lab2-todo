import { SubmitHandler, useForm } from "react-hook-form";

type Input = {
  username: string;
  password: string;
};

export default function LoginForm() {
  const { register, handleSubmit } = useForm<Input>();

  const onSubmit: SubmitHandler<Input> = (data) => {
    console.log(data);
  };

  return (
    <form
      className="flex flex-col gap-2 min-w-[300px]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="my-2">
        <label className="mb-1" htmlFor="username">
          Username
        </label>
        <input
          className="input w-full"
          id="username"
          {...register("username")}
        />
      </div>
      <div className="my-2">
        <label className="mb-1" htmlFor="password">
          Password
        </label>
        <input
          className="input w-full"
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
