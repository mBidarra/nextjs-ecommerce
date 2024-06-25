"use client"; // Adiciona isso no topo do arquivo

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Altere a importação para next/navigation
import Input from "@/components/InputForm";
import { EnvelopeIcon, UserIcon, ChatBubbleOvalLeftIcon } from '@heroicons/react/24/outline';

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!name || !email || !message) {
      setError("Todos os campos são obrigatórios.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Formato de e-mail inválido.");
      return;
    }

    // Simulando um processo de envio de formulário
    setTimeout(() => {
      setSuccess("Mensagem enviada com sucesso!");
      setName("");
      setEmail("");
      setMessage("");
      setTimeout(() => {
        router.push("/"); // Use router.push do next/navigation
      }, 2000); // Redireciona para a página inicial após 2 segundos
    }, 1000);
  };

  return (
    <div className="max-w-full mx-auto bg-white p-6 rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-4">Contato</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {success && <div className="text-green-500 mb-4">{success}</div>}
      <form onSubmit={handleSubmit}>
        <Input
          label="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          icon={UserIcon}
          required
        />
        <Input
          label="E-mail"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          icon={EnvelopeIcon}
          required
        />
        <div className="flex flex-col gap-y-3">
          <label className="text-sm font-medium">Mensagem</label>
          <div className="relative">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="px-4 py-2 w-full border rounded-md focus:outline-none focus:ring-2"
              required
            />
            {/* <span className="absolute inset-y-0 left-3 flex items-center">
              <ChatBubbleOvalLeftIcon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            </span> */}
          </div>
        </div>
        <button
          type="submit"
          className="mt-4 w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Enviar
        </button>
      </form>
    </div>
  );
}
