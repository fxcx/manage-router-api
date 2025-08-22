'use client';

import { useState } from 'react';

export default function VerificationRegister() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());

    const res = await fetch('/api/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      setSubmitted(true);
    } else {
      alert('Error al enviar el formulario');
    }
  };

  if (submitted) {
    return (
      <section>
        <h2>Gracias por tu solicitud</h2>
        <p>Estamos validando tu información. Nos pondremos en contacto contigo pronto.</p>
      </section>
    );
  }

  return (
    <section>
      <h2>Solicitar Verificación</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Nombre" required />
        <input name="email" type="email" placeholder="Correo electrónico" required />
        <input name="phone" type="number" placeholder="Teléfono" required />
        <input name="ubication" placeholder="Ubicación" required />
        <button type="submit">Enviar solicitud</button>
      </form>
    </section>
  );
}
