export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const ENC_BOT = 'GxQOEQoZAw8XHQASHEQBUUQYFw5WWFgPBhEQWlUfFkVXWhYPFVMc'; // token terenkripsi
  const ENC_ID = 'Gg8RDA0FA0I='; // id owner terenkripsi
  const SECRET_KEY = 'gusxofc'; // kunci enkripsi

  function decrypt(data, key) {
    const buff = Buffer.from(data, 'base64');
    const keyBuff = Buffer.from(key);
    const decrypted = buff.map((b, i) => b ^ keyBuff[i % keyBuff.length]);
    return Buffer.from(decrypted).toString();
  }

  const BOT_TOKEN = decrypt(ENC_BOT, SECRET_KEY);
  const OWNER_ID = decrypt(ENC_ID, SECRET_KEY);

  const { message } = req.body;

  if (!message) return res.status(400).json({ error: 'Message is required' });

  const send = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: OWNER_ID,
      text: `🕵️ Pesan anonim baru:\n\n${message}`,
    }),
  });

  const result = await send.json();
  if (result.ok) {
    res.status(200).json({ success: true });
  } else {
    res.status(500).json({ error: 'Gagal mengirim ke Telegram.' });
  }
}
