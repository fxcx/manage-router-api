'use client';

import { useEffect, useState, useTransition } from 'react';
import { agregarUsuario } from '../../app/actions';

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [isPending, startTransition] = useTransition();

  const fetchUsers = async () => {
    const res = await fetch('/api/users');
    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async (formData: FormData) => {
    await agregarUsuario(formData);
    startTransition(() => {
      fetchUsers();
    });
  };

  return (
    <div>
      <h2>Usuarios:</h2>
      <ul>
        {users.map((u: any) => (
          <li key={u.id}>{u.name}</li>
        ))}
      </ul>

      <form action={handleSubmit}>
        <input name="name" placeholder="Nuevo usuario" />
        <button type="submit">Agregar</button>
      </form>

      {isPending && <p>Agregando...</p>}
    </div>
  );
}
