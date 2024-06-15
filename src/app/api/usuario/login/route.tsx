import { getUsuarioByEmail } from "@/data/usuariosService";
import { User } from "@/models/user";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
    try {
        const { email, password } = await req.json();
        const status = 'active';
        const userLogin = { email, password };
        const usuario = await getUsuarioByEmail(userLogin.email);
        //valida login y password
        if (usuario) {
            if (usuario.password === userLogin.password) {
                return NextResponse.json(usuario, { status: 200 });
            } else {
                return NextResponse.json({ message: 'Password incorrecto' }, { status: 401 });
            }
        } else {
            return NextResponse.json({ message: 'Usuario no existe' }, { status: 404 });
        }
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}