/* eslint-disable react/no-unescaped-entities */
"use client";
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button, Input } from "@nextui-org/react";

export default function Login() {
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const res = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });

    if (res?.error) {
      setError("Invalid credentials");
    }
    if (res?.ok) {
      return router.push("/");
    }
  };

  return (
    <section className="w-full flex-1 flex items-center justify-center">
      <form
        className="p-6 w-full max-w-[400px] flex flex-col justify-between items-center gap-2 
          border border-solid border-black bg-white rounded"
        onSubmit={handleSubmit}
      >
        {error && <div className="text-black">{error}</div>}
        <h1 className="mb-5 w-full text-2xl font-bold">Sign In</h1>
        <Input label="E Mail" type="email" name="email" />
        <Input label="Password" type="password" name="password" />
        <Button className="w-full">Sign In</Button>

        <Link
          href="/auth/register"
          className="text-sm text-[#888] transition duration-150 ease hover:text-black"
        >
          Don't have an account?
        </Link>
      </form>
    </section>
  );
}
