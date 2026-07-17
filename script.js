function kirim() {
    let input = document.getElementById("input");
    let chat = document.getElementById("chat");

    let pesan = input.value.trim();

    if (pesan === "") return;

    let jawaban = "Maaf, saya belum mengerti pertanyaan itu.";

    pesan = pesan.toLowerCase();

    if (pesan.includes("halo")) {
        jawaban = "Halo! Saya KENUEL AI 👋";
    } else if (pesan.includes("nama")) {
        jawaban = "Nama saya KENUEL AI.";
    } else if (pesan.includes("developer")) {
        jawaban = "Developer saya adalah WhoIsToken.";
    } else if (pesan.includes("menu")) {
        jawaban = `
🤖 Chat AI
🎤 Voice AI
🌙 Dark Mode
💾 Riwayat Chat
⚙️ Pengaturan
📱 APK Android
`;
    } else if (pesan.includes("jam")) {
        jawaban = new Date().toLocaleTimeString("id-ID");
    } else if (pesan.includes("tanggal")) {
        jawaban = new Date().toLocaleDateString("id-ID");
    }

    chat.innerHTML += `
        <p><b>Kamu:</b> ${input.value}</p>
        <p><b>KENUEL AI:</b> ${jawaban}</p>
        <hr>
    `;

    input.value = "";
    chat.scrollTop = chat.scrollHeight;
}
