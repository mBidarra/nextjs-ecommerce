"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Input from "@/components/InputForm";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Verificar credenciais no localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((user: any) => user.email === email && user.password === password);

    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      router.push("/");
    } else {
      setError("E-mail ou senha incorretos");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-4">Entrar</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <form onSubmit={handleSubmit}>
        <Input label="E-mail" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <Input label="Senha" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit" className="btn btn-primary w-full mt-4">Entrar</button>
        <button onClick={() => signIn("google")} className="btn btn-secondary w-full mb-4 mt-4">
          Logar pelo Google
        </button>
        <p className="mt-4 text-sm text-center">
          Não possui uma conta? <a href="/Register" className="text-blue-500">Cadastrar-se</a>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
