"use client";

import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

type LoginForm = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const { register, handleSubmit } = useForm<LoginForm>();

  const router = useRouter();

  const onSubmit = async (data: LoginForm) => {
    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    console.log(result);

    if (result?.error) {
      alert("Invalid email or password");
      return;
    }

    router.push("/dashboard");
  };

  return (
    <main className="flex min-h-screen items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md space-y-4 rounded-lg border p-6"
      >
        <h1 className="text-2xl font-bold">Login</h1>

        <input
          {...register("email")}
          type="email"
          placeholder="Email"
          className="w-full rounded border p-2"
        />

        <input
          {...register("password")}
          type="password"
          placeholder="Password"
          className="w-full rounded border p-2"
        />

        <button
          type="submit"
          className="w-full rounded bg-black p-2 text-white"
        >
          Login
        </button>
      </form>
    </main>
  );
}
