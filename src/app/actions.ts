'use server';

import { addUser } from "../lib/db";

export async function agregarUsuario(formData: FormData) {
    const name = formData.get("name")?.toString();
    if (!name) return;

    const user = addUser(name);
    return user;
}
