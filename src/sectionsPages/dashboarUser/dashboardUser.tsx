'use server'

import { prisma } from '@/lib/prisma';

export default async function AdminVerify() {
  const solicitudes = await prisma.verificationUser.findMany({
    where: { isAproved: false },
    orderBy: { createdAt: 'desc' },
  });

  async function aprobarUsuario(id: bigint) {
    'use server';
    await prisma.verificationUser.update({
      where: { id },
      data: { isAproved: true },
    });
  }

  return (
    <div>
      <h1>Solicitudes de Verificación</h1>
      {solicitudes.length === 0 ? (
        <p>No hay solicitudes pendientes</p>
      ) : (
        <ul>
          {solicitudes.map((user) => (
            <li key={user.id.toString()}>
              <strong>{user.name}</strong> - {user.email} - {user.ubication}
              <form action={aprobarUsuario}>
                <input type="hidden" name="id" value={user.id.toString()} />
                <button type="submit">Aprobar</button>
              </form>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
