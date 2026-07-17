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
        pesanFitur = "✨ Fitur Jernihkan (HD) aktif! Silakan pilih foto dengan klik tombol '📁 Kirim Media' lalu tekan 'Kirim'.";
    } else if (namaFitur === 'logo') {
        pesanFitur = "🎨 Fitur Pembuat Logo aktif! Silakan kirim foto contoh/referensi dengan klik '📁 Kirim Media' lalu tekan 'Kirim'.";
    } else if (namaFitur === 'stiker') {
        pesanFitur = "🎭 Fitur Pembuat Stiker aktif! Silakan pilih foto dengan klik '📁 Kirim Media' lalu tekan 'Kirim'.";
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

    // Tampilkan pesan teks pengguna jika ada
    if (pesan !== "") {
        chat.innerHTML += `<p><b>Kamu:</b> ${input.value}</p>`;
    }

    // LOGIKA 1: Jika ada file (gambar/video) yang dikirim pengguna
    if (fileObj) {
        // Buat URL sementara agar foto yang dikirim bisa langsung tampil di layar chat
        let linkFoto = URL.createObjectURL(fileObj);
        
        chat.innerHTML += `
            <p><b>Kamu:</b> 📁 Mengirim Media: ${fileObj.name}</p>
            <div style="text-align: left; margin: 10px 0;">
                <img src="${linkFoto}" style="max-width: 100%; max-height: 200px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.2);" alt="Preview">
            </div>
        `;

        if (fiturAktif === 'hd') {
            jawaban = "Mulai memproses peningkatan kualitas gambar (HD)... ⏳ Silakan tunggu beberapa detik.";
            chat.innerHTML += `<p><b>KENUEL AI:</b> ${jawaban}</p><hr>`;
            chat.scrollTop = chat.scrollHeight;

            // Simulasi proses AI (3 detik) lalu menampilkan hasilnya secara visual
            setTimeout(() => {
                chat.innerHTML += `
                    <p><b>KENUEL AI:</b> ✨ Gambar berhasil dijernihkan! Ini hasil HD milikmu:</p>
                    <div style="text-align: left; margin: 10px 0;">
                        <img src="${linkFoto}" style="max-width: 100%; max-height: 200px; border-radius: 10px; border: 2px solid #00c6ff; filter: contrast(1.15) saturate(1.1) brightness(1.05);" alt="HD Result">
                    </div>
                    <hr>
                `;
                simpanChat();
                chat.scrollTop = chat.scrollHeight;
            }, 3000);
            
            // Bersihkan input dan hentikan eksekusi di sini agar tidak double post
            input.value = "";
            if (fileInput) fileInput.value = "";
            return;

        } else if (fiturAktif === 'logo') {
            jawaban = "Sedang menganalisis foto referensi untuk mendesain logo/maskot baru... ⏳";
            chat.innerHTML += `<p><b>KENUEL AI:</b> ${jawaban}</p><hr>`;
            chat.scrollTop = chat.scrollHeight;

            // Simulasi proses AI (3 detik) untuk membuat logo kartun
            setTimeout(() => {
                chat.innerHTML += `
                    <p><b>KENUEL AI:</b> 🎨 Logo/maskot baru berhasil dibuat berdasarkan referensi fotomu! Ini hasilnya:</p>
                    <div style="text-align: left; margin: 10px 0;">
                        <img src="${linkFoto}" style="max-width: 100%; max-height: 200px; border-radius: 50%; border: 4px solid #0072ff; filter: hue-rotate(180deg) saturate(1.5);" alt="Logo Result">
                    </div>
                    <hr>
                `;
                simpanChat();
                chat.scrollTop = chat.scrollHeight;
            }, 3000);

            input.value = "";
            if (fileInput) fileInput.value = "";
            return;

        } else if (fiturAktif === 'stiker') {
            jawaban = "Sedang memproses pemotongan latar belakang gambar untuk dijadikan stiker... ⏳";
            chat.innerHTML += `<p><b>KENUEL AI:</b> ${jawaban}</p><hr>`;
            chat.scrollTop = chat.scrollHeight;

            // Simulasi proses AI (3 detik) memberikan efek stroke border putih tebal seperti stiker asli
            setTimeout(() => {
                chat.innerHTML += `
                    <p><b>KENUEL AI:</b> 🎭 Stiker kamu sudah jadi! Siap digunakan:</p>
                    <div style="text-align: left; margin: 10px 0; background: rgba(255,255,255,0.15); padding: 15px; border-radius: 12px; display: inline-block;">
                        <img src="${linkFoto}" style="max-width: 150px; border-radius: 8px; filter: drop-shadow(4px 4px 0px white) drop-shadow(-4px -4px 0px white) drop-shadow(4px -4px 0px white) drop-shadow(-4px 4px 0px white);" alt="Sticker Result">
                    </div>
                    <hr>
                `;
                simpanChat();
                chat.scrollTop = chat.scrollHeight;
            }, 3000);

            input.value = "";
            if (fileInput) fileInput.value = "";
            return;

        } else {
            jawaban = "Foto berhasil diterima! Silakan klik salah satu tombol fitur di bawah (HD, Logo, atau Stiker) terlebih dahulu agar saya tahu cara memprosesnya.";
        }
    } 
    // LOGIKA 2: Jika hanya mengirim teks biasa (Chat bawaan)
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
            localStorage.removeItem("riwayat_chat_kenuel");
            chat.innerHTML = `<p><b>KENUEL AI:</b> Riwayat obrolan telah dibersihkan!</p><hr>`;
            input.value = "";
            if (fileInput) fileInput.value = "";
            return;
        }
    }

    // Tampilkan jawaban AI ke layar chat jika tidak masuk ke mode simulasi gambar
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
