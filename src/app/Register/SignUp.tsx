"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/InputForm";
import { validateCPF, validateEmail, validateCEP, validateDateOfBirth } from "@/lib/validations"; // Funções de validação

const SignUpForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [cep, setCep] = useState("");
  const [rua, setRua] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [uf, setUf] = useState("");
  const [numero, setNumero] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isAddressLocked, setIsAddressLocked] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validações
    if (!name || !email || !cpf || !cep || !rua || !bairro || !cidade || !uf || !numero || !dataNascimento || !password) {
      setError("Todos os campos são obrigatórios");
      return;
    }

    if (!validateEmail(email)) {
      setError("Formato de e-mail inválido");
      return;
    }

    if (!validateCPF(cpf)) {
      setError("CPF inválido");
      return;
    }

    if (!validateCEP(cep)) {
      setError("CEP inválido");
      return;
    }

    if (!validateDateOfBirth(dataNascimento)) {
      setError("Data de nascimento inválida ou idade menor que 18 anos");
      return;
    }

    if (password !== confirmPassword) {
      setError("Senhas não conferem");
      return;
    }

    const newUser = {
      name,
      email,
      password,
      cpf,
      cep,
      rua,
      bairro,
      cidade,
      uf,
      numero,
      dataNascimento,
    };

    // Salvar dados no localStorage
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    router.push("/login");
  };

  const handleCEPChange = async (value: string) => {
    setCep(value);
    if (validateCEP(value)) {
      // Requisição para buscar endereço pelo CEP
      const response = await fetch(`https://viacep.com.br/ws/${value}/json/`);
      const data = await response.json();
      if (!data.erro) {
        setRua(data.logradouro);
        setBairro(data.bairro);
        setCidade(data.localidade);
        setUf(data.uf);
        setIsAddressLocked(true);
      } else {
        setRua("");
        setBairro("");
        setCidade("");
        setUf("");
        setIsAddressLocked(false);
      }
    } else {
      setRua("");
      setBairro("");
      setCidade("");
      setUf("");
      setIsAddressLocked(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-4">Cadastrar-se</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <form onSubmit={handleSubmit}>
        <Input label="Nome" value={name} onChange={(e) => setName(e.target.value)} required />
        <Input label="E-mail" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <Input label="CPF" value={cpf} onChange={(e) => setCpf(e.target.value)} required />
        <Input label="CEP" value={cep} onChange={(e) => handleCEPChange(e.target.value)} required />
        <Input label="Rua" value={rua} onChange={(e) => setRua(e.target.value)} required disabled={isAddressLocked} />
        <Input label="Bairro" value={bairro} onChange={(e) => setBairro(e.target.value)} required disabled={isAddressLocked} />
        <Input label="Cidade" value={cidade} onChange={(e) => setCidade(e.target.value)} required disabled={isAddressLocked} />
        <Input label="UF" value={uf} onChange={(e) => setUf(e.target.value)} required disabled={isAddressLocked} />
        <Input label="Número" value={numero} onChange={(e) => setNumero(e.target.value)} required />
        <Input label="Data de Nascimento" type="date" value={dataNascimento} onChange={(e) => setDataNascimento(e.target.value)} required />
        <Input label="Senha" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <Input label="Confirmar Senha" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
        <button type="submit" className="btn btn-primary w-full mt-4">Cadastrar</button>
        <p className="mt-4 text-sm text-center">
          Já possui uma conta? <a href="/login" className="text-blue-500">Entrar</a>
        </p>
      </form>
    </div>
  );
};

export default SignUpForm;
