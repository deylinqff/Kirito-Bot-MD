import fetch from 'node-fetch';
import yts from 'yt-search';

const handler = async (m, { conn, text, command }) => {
  if (!text) throw '⚠️ Ingresa el nombre de la música que deseas descargar.';

  const search = await yts(text);
  if (!search.all.length) throw '❌ No se encontraron resultados para tu búsqueda.';

  const videoInfo = search.all[0];
  const body = `🎵 *Descargando:* *${videoInfo.title}*\n\n` +
    `📺 *Canal:* ${videoInfo.author.name || 'Desconocido'}\n` +
    `👁️ *Vistas:* ${videoInfo.views}\n` +
    `⏳ *Duración:* ${videoInfo.timestamp}\n` +
    `📅 *Publicado:* ${videoInfo.ago}\n` +
    `🔗 *Link:* ${videoInfo.url}`;

  if (command.startsWith('play')) {
    await conn.sendMessage(m.chat, {
      image: { url: videoInfo.thumbnail },
      caption: body,
      buttons: [
        { buttonId: `.yta ${videoInfo.url}`, buttonText: { displayText: '🎧 Audio' } },
        { buttonId: `.ytv ${videoInfo.url}`, buttonText: { displayText: '🎬 Video' } }
      ],
      viewOnce: true,
    }, { quoted: m });

    return m.react('⏳');
  }

  if (command.startsWith('yta') || command.startsWith('ytmp3')) {
    return await downloadMedia(m, conn, videoInfo.url, 'mp3');
  }

  if (command.startsWith('ytv') || command.startsWith('ytmp4')) {
    return await downloadMedia(m, conn, videoInfo.url, 'mp4');
  }

  throw '❌ Comando no reconocido.';
};

const downloadMedia = async (m, conn, url, type) => {
  m.react('⏳');
  const apis = [
    `https://api.alyachan.dev/api/youtube?url=${url}&type=${type}&apikey=Gata-Dios`,
    `https://delirius-apiofc.vercel.app/download/yt${type}?url=${url}`,
    `https://api.vreden.my.id/api/yt${type}?url=${url}`
  ];

  for (let api of apis) {
    try {
      const response = await fetch(api);
      if (!response.ok) continue; // Si la API falla, intenta con la siguiente
      const data = await response.json();
      if (data?.data?.url) {
        if (type === 'mp3') {
          return conn.sendMessage(m.chat, { 
            audio: { url: data.data.url }, 
            mimetype: 'audio/mpeg' 
          }, { quoted: m });
        } else {
          return conn.sendMessage(m.chat, { 
            video: { url: data.data.url }, 
            mimetype: 'video/mp4' 
          }, { quoted: m });
        }
      }
    } catch (error) {
      console.error(`Error con la API: ${api}`, error);
    }
  }

  throw `❌ No se pudo obtener el ${type === 'mp3' ? 'audio' : 'video'}.`;
};

handler.help = ['play', 'playvid', 'ytv', 'ytmp4', 'yta', 'play2', 'ytmp3'];
handler.command = ['play', 'playvid', 'ytv', 'ytmp4', 'yta', 'play2', 'ytmp3'];
handler.tags = ['descargas'];
handler.register = true;

export default handler;