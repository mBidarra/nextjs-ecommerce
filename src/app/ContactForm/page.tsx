import ContactForm from "@/app/ContactForm/contactForm";

export default function ContactPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-3xl font-bold mb-4">Entre em Contato</h1>
      <ContactForm />
    </div>
  );
}
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Input from "@/components/InputForm";
<button onClick={() => signIn("google")} className="btn btn-secondary w-full mb-4">
Logar pelo Google
</button>