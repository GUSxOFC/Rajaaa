<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Kirim Pesan Anonim</title>
  <style>
    body {
      background: #111;
      color: #fff;
      font-family: Arial, sans-serif;
      text-align: center;
      padding: 40px;
    }
    textarea {
      width: 90%;
      height: 120px;
      padding: 10px;
      margin: 20px 0;
      background: #222;
      color: #fff;
      border: none;
      border-radius: 10px;
      resize: none;
      font-size: 16px;
    }
    button {
      padding: 10px 30px;
      font-size: 16px;
      background: #e91e63;
      border: none;
      border-radius: 30px;
      color: white;
      cursor: pointer;
    }
    button:hover {
      background: #d81b60;
    }
    .status {
      margin-top: 20px;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <h1>Kirim Pesan Anonim</h1>
  <textarea id="pesan" placeholder="Tulis pesan kamu di sini..."></textarea><br>
  <button onclick="kirimPesan()">Kirim</button>
  <div class="status" id="status"></div>

  <script>
    async function kirimPesan() {
      const pesan = document.getElementById('pesan').value.trim();
      const statusEl = document.getElementById('status');

      if (!pesan) {
        statusEl.textContent = "⚠️ Pesan tidak boleh kosong!";
        return;
      }

      statusEl.textContent = "⏳ Mengirim...";

      try {
        const response = await fetch('/api/send', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ pesan })
        });

        const result = await response.json();

        if (result.status === "success") {
          statusEl.textContent = "✅ Pesan berhasil dikirim!";
          document.getElementById('pesan').value = "";
        } else {
          statusEl.textContent = "❌ Gagal kirim.";
        }
      } catch (error) {
        statusEl.textContent = "❌ Terjadi kesalahan.";
      }
    }
  </script>
</body>
</html>
