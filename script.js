const simpanNama = localStorage.getItem("namaUser");
const simpanNpm = localStorage.getItem("npmUser");
const simpanJadwal = localStorage.getItem("daftarJadwal");
const simpanTugas = localStorage.getItem("daftarTugas");

let namaUser = simpanNama ? simpanNama : "";
let npmUser = simpanNpm ? simpanNpm : "";
let daftarJadwal = simpanJadwal ? JSON.parse(simpanJadwal) : [];
let daftarTugas = simpanTugas ? JSON.parse(simpanTugas) : [];

function simpanSemua() {
  localStorage.setItem("namaUser", namaUser);
  localStorage.setItem("npmUser", npmUser);
  localStorage.setItem("daftarJadwal", JSON.stringify(daftarJadwal));
  localStorage.setItem("daftarTugas", JSON.stringify(daftarTugas));
}

function ambilTanggal() {
  const hariIni = new Date();
  return hariIni.toLocaleDateString("id-ID", {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}

if(Notification.permission !== "granted") {
  Notification.requestPermission();
}

function tampilkanNotifikasi(pesan) {
  new Notification("UNMUS Reminder", {
    body: pesan
  })
  const suara = new Audio("https://assets.mixkit.co/sfx/preview/mixkit-software-interface-start-2574.mp3");
  suara.play();
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
  document.getElementById("teksSapa").innerText = "Selamat datang, " + namaUser;
  document.getElementById("teksTanggal").innerText = ambilTanggal();
  document.getElementById("teksProfil").innerText = namaUser + " | " + npmUser;

  simpanSemua();
}

function editTugas(index) {
  const nilaiBaru = prompt("Ubah tugas ini:", daftarTugas[index]);
  if(nilaiBaru) {
    daftarTugas[index] = nilaiBaru;
    renderTugas();
    simpanSemua();
  }
}

function editJadwal(index) {
  const nilaiBaru = prompt("Ubah jadwal ini:", daftarJadwal[index]);
  if(nilaiBaru) {
    daftarJadwal[index] = nilaiBaru;
    renderJadwal();
    simpanSemua();
  }
}

function tambahJadwal() {
  const isi = prompt("Masukkan jadwal kuliah:");
  if (isi) {
    daftarJadwal.push(isi);
    renderJadwal();
    simpanSemua();
  }
}

function tambahTugas() {
  const isi = prompt("Masukkan nama tugas + deadline:");
  if (isi) {
    daftarTugas.push(isi);
    renderTugas();
    simpanSemua();
  }
}

function renderJadwal() {
  const elemen = document.getElementById("daftarJadwal");
  elemen.innerHTML = "";
  daftarJadwal.forEach((item, indeks) => {
    elemen.innerHTML += `
      <li>
        ${item}
        <button onclick="editJadwal(${indeks})">Edit</button>
      </li>
    `;
  })
}

function renderTugas() {
  const elemen = document.getElementById("daftarTugas");
  elemen.innerHTML = "";
  daftarTugas.forEach((item, indeks) => {
    elemen.innerHTML += `
      <li>
        ${item}
        <button onclick="editTugas(${indeks})">Edit</button>
      </li>
    `;
  })
}

setInterval(function() {
  const hariIni = new Date();
  daftarTugas.forEach(item => {
    tampilkanNotifikasi("⚠️ Tugasmu ada yang deadline sebentar lagi!");
  })
}, 30000)

renderJadwal();
renderTugas();

if(namaUser !== "" && npmUser !== ""){
  document.getElementById("halamanLogin").classList.add("hidden");
  document.getElementById("halamanDashboard").classList.remove("hidden");
  document.getElementById("teksSapa").innerText = "Selamat datang, " + namaUser;
  document.getElementById("teksTanggal").innerText = ambilTanggal();
  document.getElementById("teksProfil").innerText = namaUser + " | " + npmUser;
}
