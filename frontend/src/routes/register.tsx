import { createFileRoute, Link } from '@tanstack/react-router'
import RegisterForm from '../components/register-form'

export const Route = createFileRoute('/register')({
  component: () => (
    <div className="min-h-screen border flex flex-col p-4 items-center justify-center gap-4 bg-stone-100">
      <h1 className="font-bold text-4xl">Todo App</h1>
      <h2 className="font-bold text-xl">Register</h2>
      <RegisterForm />
      <div className="flex gap-1">
        <p className="font-light">Already registered?</p>{" "}
        <Link className="font-bold" to="/login">
          Login
        </Link>
      </div>
    </div>
  ),
})
