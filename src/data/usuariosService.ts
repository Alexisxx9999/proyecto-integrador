import { User } from '@/models/user';
import * as fs from 'fs';
import * as path from 'path';


const filePath = 'src\\data\\usuarios.json'

function readUsuarios(): Promise<User[]> {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                const usuarios: User[] = JSON.parse(data);
                resolve(usuarios);
            }
        });
    });
}

function writeUsuarios(usuarios: User[]): Promise<void> {
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, JSON.stringify(usuarios, null, 2), 'utf8', (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

export async function getAllUsuarios(): Promise<User[]> {
    return readUsuarios();
}

export async function getUsuarioById(id: number): Promise<User | undefined> {
    const usuarios = await readUsuarios();
    return usuarios.find((usuario) => usuario.id === id);
}

export async function getUsuarioByEmail(email: string): Promise<User | undefined> {
    const usuarios = await readUsuarios();
    return usuarios.find((usuario) => usuario.email === email);
}

export async function createUsuario(usuario: User): Promise<User> {
    const usuarios = await readUsuarios();
    const newUsuario = { ...usuario, id: usuarios.length + 1, created_at: new Date(), updated_at: new Date() };
    usuarios.push(newUsuario);
    await writeUsuarios(usuarios);
    return newUsuario;
}

export async function updateUsuario(id: number, updatedUsuario: User): Promise<User | null> {
    const usuarios = await readUsuarios();
    const index = usuarios.findIndex((usuario) => usuario.id === id);
    console.log('index', index);
    if (index !== -1) {
        const updatedUsuarioWithDates = { ...updatedUsuario, id, updated_at: new Date() };
        usuarios[index] = updatedUsuarioWithDates;
        await writeUsuarios(usuarios);
        return updatedUsuarioWithDates;
    } else {
        return null;
    }
}

export async function deleteUsuario(id: number): Promise<boolean> {
    const usuarios = await readUsuarios();
    const filteredUsuarios = usuarios.filter((usuario) => usuario.id !== id);

    if (usuarios.length !== filteredUsuarios.length) {
        await writeUsuarios(filteredUsuarios);
        return true;
    } else {
        return false;
    }
}