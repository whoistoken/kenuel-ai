// 1. Ambil riwayat chat yang tersimpan di browser agar data tidak hilang saat di-refresh
document.addEventListener("DOMContentLoaded", () => {
    muatRiwayatChat();
});

// Variabel global untuk menyimpan jenis fitur aktif
let fiturAktif = '';

// Fungsi untuk menyimpan seluruh isi chat ke LocalStorage agar data tidak hilang
function simpanChat() {
    const chatBox = document.getElementById("chat");
    localStorage.setItem("riwayat_chat_kenuel", chatBox.innerHTML);
}

// Fungsi untuk memuat chat dari LocalStorage saat web dibuka
function muatRiwayatChat() {
    const chatBox = document.getElementById("chat");
    const dataLama = localStorage.getItem("riwayat_chat_kenuel");
    if (dataLama) {
        chatBox.innerHTML = dataLama;
        chatBox.scrollTop = chatBox.scrollHeight;
    } else {
        // Chat pembuka default jika belum ada riwayat obrolan sebelumnya
        chatBox.innerHTML = `<p><b>KENUEL AI:</b> Halo! Saya KENUEL AI 👋 Ada yang bisa saya bantu?</p><hr>`;
    }
}

// Fungsi untuk memilih fitur dari tombol menu bawah
function setFitur(namaFitur) {
    fiturAktif = namaFitur;
    let chat = document.getElementById("chat");
    let pesanFitur = '';
    
    if (namaFitur === 'hd') {
        pesanFitur = "✨ Fitur Jernihkan (HD) aktif! Silakan upload/kirim foto atau video kamu.";
    } else if (namaFitur === 'logo') {
        pesanFitur = "🎨 Fitur Pembuat Logo aktif! Silakan kirim foto contoh yang ingin dijadikan referensi logo.";
    } else if (namaFitur === 'stiker') {
        pesanFitur = "🎭 Fitur Pembuat Stiker aktif! Silakan kirim foto yang ingin kamu jadikan stiker.";
    }
    
    chat.innerHTML += `
        <p><b>KENUEL AI:</b> ${pesanFitur}</p>
        <hr>
    `;
    
    simpanChat(); // Simpan riwayat chat terbaru
    chat.scrollTop = chat.scrollHeight;
}

// Fungsi utama untuk memproses kiriman teks atau gambar dari pengguna
function prosesPerintahAI() {
    let input = document.getElementById("input");
    let chat = document.getElementById("chat");
    let fileInput = document.getElementById("file-input");
    
    let pesan = input.value.trim();
    let fileObj = fileInput ? fileInput.files[0] : null;

    // Jika tidak ada teks maupun file, jangan proses apa-apa
    if (pesan === "" && !fileObj) return;

    let jawaban = "Maaf, saya belum mengerti pertanyaan itu.";
    let pesanLower = pesan.toLowerCase();

    // Tampilkan pesan pengguna ke dalam chat room
    if (pesan !== "") {
        chat.innerHTML += `<p><b>Kamu:</b> ${input.value}</p>`;
    }
    if (fileObj) {
        chat.innerHTML += `<p><b>Kamu:</b> 📁 Mengirim File: ${fileObj.name}</p>`;
    }

    // LOGIKA 1: Jika ada file (gambar/video) yang dikirim pengguna
    if (fileObj) {
        if (fiturAktif === 'hd') {
            jawaban = "Sedang memproses penjernihan (HD) untuk file kamu... ⏳ (Fitur ini membutuhkan integrasi server AI eksternal)";
        } else if (fiturAktif === 'logo') {
            jawaban = `Saya telah menerima foto referensi "${fileObj.name}". Sedang mendesain logo/maskot baru berdasarkan contoh foto tersebut... ⏳`;
        } else if (fiturAktif === 'stiker') {
            jawaban = "Sedang memotong latar belakang dan mengubah foto kamu menjadi stiker... ⏳";
        } else {
            jawaban = "Foto berhasil diunggah! Silakan klik salah satu tombol fitur di bawah (HD, Logo, atau Stiker) agar saya tahu harus memproses foto ini sebagai apa.";
        }
    } 
    // LOGIKA 2: Jika hanya mengirim teks biasa (Respon chat default kamu)
    else {
        if (pesanLower.includes("halo")) {
            jawaban = "Halo! Saya KENUEL AI 👋";
        } else if (pesanLower.includes("nana")) {
            jawaban = "Nama saya KENUEL AI.";
        } else if (pesanLower.includes("developer")) {
            jawaban = "Developer saya adalah WhoIsToken.";
        } else if (pesanLower.includes("menu")) {
            jawaban = `
                🤖 Chat AI<br>
                🎤 Voice AI<br>
                🌙 Dark Mode<br>
                💾 Riwayat Chat<br>
                ⚙️ Pengaturan<br>
                📱 APK Android
            `;
        } else if (pesanLower.includes("jam")) {
            jawaban = new Date().toLocaleTimeString("id-ID");
        } else if (pesanLower.includes("tanggal")) {
            jawaban = new Date().toLocaleDateString("id-ID");
        } else if (pesanLower.includes("bersihkan") || pesanLower.includes("hapus chat")) {
            // Fitur tambahan untuk menghapus riwayat chat jika memori ingin dibersihkan
            localStorage.removeItem("riwayat_chat_kenuel");
            chat.innerHTML = `<p><b>KENUEL AI:</b> Riwayat obrolan telah dibersihkan!</p><hr>`;
            input.value = "";
            if (fileInput) fileInput.value = "";
            return;
        }
    }

    // Tampilkan jawaban AI ke layar chat
    chat.innerHTML += `
        <p><b>KENUEL AI:</b> ${jawaban}</p>
        <hr>
    `;

    // Reset kolom input & file upload setelah tombol kirim ditekan
    input.value = "";
    if (fileInput) fileInput.value = "";
    
    simpanChat(); // Simpan riwayat chat terbaru ke browser
    chat.scrollTop = chat.scrollHeight;
}

