function kirim(){
    let input = document.getElementById("input");
    let chat = document.getElementById("chat");

    let pesan = input.value;

    let jawaban = "Saya belum mengerti.";

    if(pesan.toLowerCase().includes("halo")){
        jawaban = "Halo juga!";
    }

    if(pesan.toLowerCase().includes("nama")){
        jawaban = "Saya KENUEL AI.";
    }

    if(pesan.toLowerCase().includes("developer")){
        jawaban = "Developer saya adalah WhoIsToken.";
    }

    chat.innerHTML += `
        <p><b>Kamu:</b> ${pesan}</p>
        <p><b>KENUEL AI:</b> ${jawaban}</p>
    `;

    input.value="";
}
