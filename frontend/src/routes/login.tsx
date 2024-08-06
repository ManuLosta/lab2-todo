import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  return (
    <div className="min-h-screen border flex flex-col p-4 items-center justify-center gap-4 bg-stone-100">
      <h1 className="font-bold text-3xl">Todo App</h1>
      <h2 className="font-bold text-xl">Login</h2>
      <form className="flex flex-col gap-2 min-w-[300px]">
        <div className="my-2">
          <p className="mb-1">Username</p>
          <input className="border-slate-800 border-4 bg-white p-3 w-full rounded-sm outline-none focus:shadow-[5px_5px_0px_0px_rgb(30,64,175)] focus:border-blue-800 transition-all duration-300" />
        </div>
        <div className="my-2">
          <p className="mb-1">Password</p>
          <input
            className="border-slate-800 border-4 bg-white p-3 w-full rounded-sm outline-none focus:shadow-[5px_5px_0px_0px_rgb(30,64,175)] focus:border-blue-800 transition-all duration-300"
            type="password"
          />
        </div>
        <button
          className="my-2 rounded-sm bg-slate-800 text-white font-bold p-2 mx-auto px-8 hover:shadow-[5px_5px_0px_0px_rgb(30,64,175)] transition-all duration-300 hover:bg-white hover:text-blue-700 border-4 border-slate-800 hover:border-blue-800"
          type="submit"
        >
          Login
        </button>
      </form>
      <div className="flex gap-1">
        <p className="font-light">New user?</p>{" "}
        <Link className="font-bold" to="/register">
          Register
        </Link>
      </div>
    </div>
  );
}
