let namaUser = "";
let npmUser = "";
let daftarJadwal = [];
let daftarTugas = [];

function ambilTanggal() {
    const hariIni = new Date();
    return hariIni.toLocaleDateString("id-ID", {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
}

function login() {
    namaUser = document.getElementById("inputNama").value;
    npmUser = document.getElementById("inputNpm").value;
    if (namaUser === "" || npmUser === "") {
        alert("Isi nama dan NPM dulu!");
        return;
    }
    document.getElementById("halamanLogin").classList.add("hidden");
    document.getElementById("halamanDashboard").classList.remove("hidden");
    document.getElementById("teksSapa").innerText = "Selamat sore, " + namaUser + "!";
    document.getElementById("teksTanggal").innerText = ambilTanggal();
    document.getElementById("teksProfil").innerText = namaUser + " | NPM: " + npmUser;
}

function tambahJadwal() {
    const isi = prompt("Masukkan jadwal kuliah:");
    if (isi) {
        daftarJadwal.push(isi);
        renderJadwal();
    }
}

function renderJadwal() {
    const elemen = document.getElementById("daftarJadwal");
    elemen.innerHTML = "";
    daftarJadwal.forEach(item => {
        elemen.innerHTML += `<li>${item}</li>`;
    })
}

function tambahTugas() {
    const isi = prompt("Masukkan nama tugas + deadline:");
    if (isi) {
        daftarTugas.push(isi);
        renderTugas();
    }
}

function renderTugas() {
    const elemen = document.getElementById("daftarTugas");
    elemen.innerHTML = "";
    daftarTugas.forEach(item => {
        elemen.innerHTML += `<li>${item}</li>`;
    })
}