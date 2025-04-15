// Creado por Deylin, no quites créditos.

let handler = async (m, { conn, usedPrefix, command, args }) => {
    // Array de datos para los botones
    const buttonData = [
        { display_text: "/qr", copy_code: "/qr" },
        { display_text: "/serbot --code", copy_code: "/serbot --code" }
    ];
    
    // Genera los botones de manera simplificada
    const buttons = buttonData.map(data => ({
        name: "cta_copy",
        buttonParamsJson: JSON.stringify(data)
    }));
    
    // Mensaje con botones
    return conn.sendMessage(
        m.chat,
        {
            text: '⚠ *Si estás conectado a otra sesión de sub-bot, por favor te recomiendo que te desconectes o no te conectes a este bot. Si estás conectado a dos, tu cuenta podría ser baneada de WhatsApp y además podrían surgir problemas en el sistema del bot.*\n\n*/serbot --code*\n> Vincula con código de 8 dígitos\n*/serbot*\n> vincula con código QR',
            footer: 'Deylin',
            buttons: buttons,
            headerType: 1
        },
        { quoted: m }
    );
};

handler.tags = ['tools'];
handler.help = ['webinfo'];
handler.command = ['code', 'qr'];

export default handler;