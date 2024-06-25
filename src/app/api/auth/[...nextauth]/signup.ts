import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import bcrypt from 'bcrypt';

export async function POST(req: NextRequest) {
  try {
    const { name, email, password, cpf, cep, rua, bairro, cidade, uf, numero, dataNascimento } = await req.json();

    if (!name || !email || !password || !cpf || !cep || !rua || !bairro || !cidade || !uf || !numero || !dataNascimento) {
      return NextResponse.json({ message: 'Estão faltando campos preenchidos' }, { status: 400 });
    }

    const existingUser = await prisma.userForm.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ message: 'Email já cadastrado' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.userForm.create({
      data: {
        name,
        email,
        password: hashedPassword,
        cpf,
        cep,
        rua,
        bairro,
        cidade,
        uf,
        numero,
        dataNascimento,
      },
    });

    return NextResponse.json({ message: 'Usuário cadastrado com sucesso' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error', error: (error as Error).message }, { status: 500 });
  }
}
