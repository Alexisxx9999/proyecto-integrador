import {
    getAllUsuarios,
    createUsuario,
} from '@/data/usuariosService';
import { User } from '@/models/user';
import { NextResponse, NextRequest } from "next/server";


export async function GET() {
    try {
        const usuarios = await getAllUsuarios();
        return NextResponse.json(usuarios);
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const { email, password, name, lastname, role, profile } = await req.json();
        const status = 'active';
        const usuarioNuevo = { email, password, name, lastname, role, status, profile } as User;
        const usuario = await createUsuario(usuarioNuevo);
        return NextResponse.json({ usuarioCreado: usuario }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
