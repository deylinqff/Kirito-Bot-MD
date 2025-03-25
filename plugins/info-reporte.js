let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) return conn.reply(m.chat, `${emoji} Por favor, ingrese el error que desea reportar.`, m)
    if (text.length < 10) return conn.reply(m.chat, `${emoji} Especifique bien el error, mínimo 10 caracteres.`, m)
    if (text.length > 1000) return conn.reply(m.chat, `${emoji2} *Máximo 1000 caracteres para enviar el error.*`, m)

    const teks = `*✖️ \`R E P O R T E\` ✖️*

☁️ Número:
• Wa.me/${m.sender.split`@`[0]}

👤 Usuario: 
• ${m.pushName || 'Anónimo'}

💬 Mensaje:
• ${text}`

    let grupo = '120363399467898268@g.us' // ID del grupo de reportes
    let creador = global.owner[0] + '@s.whatsapp.net' // Número del creador

    try {
        await conn.sendMessage(grupo, { text: teks, mentions: conn.parseMention(teks) })
        await conn.sendMessage(creador, { text: teks, mentions: conn.parseMention(teks) })
        m.reply(`${emoji} El reporte fue enviado al grupo de reportes y al creador.`)
    } catch (e) {
        m.reply(`${emoji2} Hubo un error al enviar el reporte. Inténtelo nuevamente.`)
        console.error(e)
    }
}

handler.help = ['reportar']
handler.tags = ['info']
handler.command = ['reporte', 'report', 'reportar', 'bug', 'error']

export default handler