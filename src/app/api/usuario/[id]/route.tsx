import { NextRequest, NextResponse } from "next/server";
import {
    updateUsuario,
    deleteUsuario,
    getUsuarioById
} from '@/data/usuariosService';
import { User } from "@/models/user";

export async function GET(req: NextRequest, { params }: { params: { id: number } }) {
    try {
        const idUsuario = Number(params.id);
        const usuario = await getUsuarioById(idUsuario);
        return NextResponse.json(usuario, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function PUT(req: NextRequest, { params }: { params: { id: number } }) {
    try {
        const idUsuario = Number(params.id);
        const { email, password, name, lastname, role, status, profile } = await req.json();
        const usuarioActualizar = { email, password, name, lastname, role, status, profile } as User;
        const usuario = await updateUsuario(idUsuario, usuarioActualizar);
        return NextResponse.json({ usuarioActualizado: usuario }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: number } }) {
    try {
        const idUsuario = Number(params.id);
        const usuario = await deleteUsuario(idUsuario);
        return NextResponse.json(usuario, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}