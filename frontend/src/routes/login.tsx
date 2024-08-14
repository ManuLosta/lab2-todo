import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import LoginForm from "../components/login-form";

export const Route = createFileRoute("/login")({
  beforeLoad: async ({ context }) => {
    const { isAuthenticated } = context.auth;
    if (isAuthenticated) {
      throw redirect({ to: "/" });
    }
  },
  component: LoginPage,
});

function LoginPage() {
  return (
    <div className="min-h-screen border flex flex-col p-4 items-center justify-center gap-4 bg-stone-100">
      <h1 className="font-bold text-4xl">Todo App</h1>
      <h2 className="font-bold text-xl">Login</h2>
      <LoginForm />
      <div className="flex gap-1">
        <p className="font-light">New user?</p>{" "}
        <Link className="font-bold" to="/register">
          Register
        </Link>
      </div>
    </div>
  );
}
