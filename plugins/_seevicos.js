const handler = async(m, { conn }) => {
  if (command === 'servise') {  // Se cambió 'code' por 'servise'
    try {
      conn.reply(m.chat, 'texto', m, fake); `*Servicios de un Creador de Página Web:*

1. Diseño y Desarrollo Web: Creación de sitios web modernos y responsivos.
2. Optimización SEO: Mejora de la visibilidad en motores de búsqueda.
3. E-commerce: Desarrollo de tiendas online y sistemas de pago.
4. Mantenimiento: Actualización y mantenimiento de seguridad.
5. Rediseño: Modernización de páginas web antiguas.

*Servicios de un Bot de WhatsApp:*

1. Automatización de Respuestas: Respuestas automáticas y menú interactivo.
2. Atención al Cliente 24/7: Soporte instantáneo y escalable.
3. Notificaciones: Envío automático de mensajes, recordatorios y promociones.
4. Integración con Pagos: Realizar pagos y compras directamente en WhatsApp.
5. Encuestas: Recopilación de feedback a través de mensajes interactivos.

*Servicios Combinados:*

- Integración Web-Bot: Conectar la página web con el bot de WhatsApp.
- Soporte Multicanal: Atención en web y WhatsApp.
- Automatización de Marketing: Campañas automáticas y seguimiento de usuarios.`, m, fake);
    
    } catch (error) {
      console.error('Error al enviar el mensaje:', error);
      conn.reply(m.chat, 'Ocurrió un error al intentar enviar el mensaje.', m);
    }
  }
};

handler.help = ['servicio', 'servise'];
handler.tags = ['serbot'];
handler.command = ['servise']; // Se mantiene 'servise' como el comando correcto

export default handler;

// Código creado por Deyin