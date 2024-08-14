const hitungBMI = () => {
   // Mengambil data dari input user pada form
   let jenisKelamin = document.querySelector("input[name='jenis-kelamin']:checked").value;
   let usia = document.getElementById("usia").value;
   let tinggiBadan = document.getElementById("tinggi-badan").value;
   let beratBadan = document.getElementById("berat-badan").value;

   // Logic untuk hitung BMI
   const hasilHitung = (beratBadan / Math.pow(tinggiBadan / 100, 2)).toFixed(1);

   return (
      ((document.getElementById("hasil-bmi").textContent = `${hasilHitung}`),
      ((document.getElementById("status-berat-badan").textContent = showStatusBeratBadan(hasilHitung)), document.getElementById("download-hasil").removeAttribute("disabled")),
      scrollToHasil(),
      setDataBMI(jenisKelamin, usia, tinggiBadan, beratBadan),
      ((document.getElementById("deskripsi-bmi").textContent = deskripsiHasilBMI(`${hasilHitung}`)), showPenyakit(`${hasilHitung}`))),
      setDownloaded(false)
   );
};

// Fungsi untuk menampilkan data yang dimasukan oleh user pada container hasil
const setDataBMI = (jenis_kelamin, usia, tinggiBadan, beratBadan) => {
   const container = document.getElementsByClassName("data-bmi");

   // Loop untuk merubah background color pada semua data dan menampilkan symbol berdasarkan gender
   for (let i = 0; i < container.length; i++) {
      if (jenis_kelamin == "Laki-laki") {
         container[i].style.backgroundColor = "rgb(62, 168, 255)";
         document.getElementById("jenis-kelamin-symbol").setAttribute("src", "./assets/male-symbol.svg");
      } else if (jenis_kelamin == "Perempuan") {
         container[i].style.backgroundColor = "rgb(255, 62, 142)";
         document.getElementById("jenis-kelamin-symbol").setAttribute("src", "./assets/female-symbol.svg");
      }
   }

   // Memasukkan data BMI user ke HTML
   document.getElementById("data-jenis-kelamin").innerHTML = jenis_kelamin;
   document.getElementById("data-usia").innerHTML = usia + " tahun";
   document.getElementById("data-tinggi-badan").innerHTML = tinggiBadan + " cm";
   document.getElementById("data-berat-badan").innerHTML = beratBadan + " kg";

   // Memunculkan bagian data BMI user dengan mengubah display container data BMI user dari none menjadi block
   document.getElementById("data-bmi-container").style.display = "block";
};

// Fungsi untuk menentukan status berat badan user
const showStatusBeratBadan = (hasil) => {
   switch (true) {
      case hasil <= 18.5:
         return "Kekurangan Berat Badan";
      case hasil > 18.5 && hasil <= 24.9:
         return "Berat Badan Ideal";
      case hasil >= 25.0 && hasil <= 29.9:
         return "Kelebihan Berat Badan";
      case hasil >= 30:
         return "Obesitas";
      default:
         break;
   }
};

// Fungsi untuk menentukan deskripsi yang sesuai dengan hasil BMI user
const deskripsiHasilBMI = (hasil) => {
   switch (true) {
      case hasil <= 18.5:
         return "Anda berada dalam kategori kekurangan berat badan jika BMI Anda berada di bawah angka 18.5. Kekurangan berat badan dapat menunjukkan bahwa tubuh tidak mendapatkan cukup nutrisi yang diperlukan untuk berfungsi dengan baik. Ini bisa disebabkan oleh berbagai faktor, termasuk kekurangan asupan makanan, gangguan makan, atau kondisi medis yang mendasarinya.";
      case hasil > 18.5 && hasil <= 24.9:
         return "Anda berada dalam kategori berat badan ideal jika BMI Anda berada di antara angka 18.5 dan 24.9. Ini menunjukkan bahwa berat badan Anda berada dalam rentang yang dianggap sehat untuk tinggi badan Anda. Mempertahankan berat badan ideal dapat membantu mengurangi risiko berbagai penyakit kronis dan meningkatkan kualitas hidup secara keseluruhan.";
      case hasil >= 25.0 && hasil <= 29.9:
         return "Anda berada dalam kategori berat badan berlebih jika BMI Anda berada di antara angka 25 dan 29.9. Berat badan berlebih dapat disebabkan oleh berbagai faktor seperti konsumsi makanan berkalori tinggi, kurangnya aktivitas fisik, genetika, dan gaya hidup yang tidak sehat.";
      case hasil >= 30:
         return "Anda berada dalam kategori obesitas jika BMI Anda berada di atas angka 30. Obesitas dapat disebabkan oleh kombinasi faktor genetik, gaya hidup yang tidak aktif, pola makan yang tidak sehat, serta faktor lingkungan dan psikologis. Obesitas meningkatkan risiko berbagai penyakit kronis dan komplikasi kesehatan serius.";
      default:
         break;
   }
};

// Fungsi untuk menentukan daftar penyakit yang sesuai dengan hasil BMI user
const showPenyakit = (hasil) => {
   const penyakitTitles = {
      beratKurang: "Beberapa penyakit yang berasal dari kekurangan berat badan:",
      beratLebih: "Beberapa penyakit yang berasal dari kelebihan berat badan:",
      obesitas: "Beberapa penyakit yang berasal dari obesitas:",
   };

   const penyakitList = {
      beratKurang: ["Anemia", "Osteoporosis", "Gangguan imun", "Masalah pertumbuhan (pada anak-anak dan remaja)"],
      beratLebih: ["Diabetes Tipe 2", "Penyakit Jantung", "Sleep Apnea", "Osteoarthritis", "Hipertensi", "GERD"],
      obesitas: ["Diabetes Tipe 2", "Penyakit Jantung", "Sleep Apnea:", "Osteoarthritis", "Hipertensi", "Gangguan Pencernaan"],
   };

   // Deklarasi variabel yang nantinya akan diisi dengan daftar penyakit
   let penyakit = "";

   switch (true) {
      case hasil <= 18.5:
         // Mengosongkan variabel penyakit terlebih dahulu agar list penyakit tidak menumpuk saat user menghitung BMI lebih dari sekali
         penyakit = "";

         // Mengosongkan list penyakit yang ada di HTML agar tidak menumpuk dengan list penyakit baru jika pengguna menghitung BMI lebih dari sekali
         document.getElementById("penyakit-list").innerHTML = ""; //

         // Loop untuk memasukkan daftar penyakit ke variabel penyakit
         for (i = 0; i < penyakitList.beratKurang.length; i++) {
            penyakit += "<li>" + penyakitList.beratKurang[i] + "</li>";
         }

         // Menampilkan judul penyakit (status berat) dan list penyakitnya
         return (document.getElementById("penyakit-judul").innerHTML = penyakitTitles.beratKurang), (document.getElementById("penyakit-list").innerHTML += penyakit);

      case hasil > 18.5 && hasil <= 24.9:
         // Mengosongkan judul penyakit (status berat) dan list penyakit karena berat badan dalam kategori ideal
         return (document.getElementById("penyakit-judul").innerHTML = ""), (document.getElementById("penyakit-list").innerHTML = "");

      case hasil >= 25.0 && hasil <= 29.9:
         // Mengosongkan variabel penyakit terlebih dahulu agar list penyakit tidak menumpuk saat user menghitung BMI lebih dari sekali
         penyakit = "";

         // Mengosongkan list penyakit yang ada di HTML agar tidak menumpuk dengan list penyakit baru jika pengguna menghitung BMI lebih dari sekali
         document.getElementById("penyakit-list").innerHTML = "";

         // Loop untuk memasukkan daftar penyakit ke variabel penyakit
         for (i = 0; i < penyakitList.beratLebih.length; i++) {
            penyakit += "<li>" + penyakitList.beratLebih[i] + "</li>";
         }

         // Menampilkan judul penyakit (status berat) dan list penyakitnya
         return (document.getElementById("penyakit-judul").innerHTML = penyakitTitles.beratLebih), (document.getElementById("penyakit-list").innerHTML += penyakit);

      case hasil >= 30:
         // Mengosongkan variabel penyakit terlebih dahulu agar list penyakit tidak menumpuk saat user menghitung BMI lebih dari sekali
         penyakit = "";

         // Mengosongkan list penyakit yang ada di HTML agar tidak menumpuk dengan list penyakit baru jika pengguna menghitung BMI lebih dari sekali
         document.getElementById("penyakit-list").innerHTML = "";

         // Loop untuk memasukkan daftar penyakit ke variabel penyakit
         for (i = 0; i < penyakitList.obesitas.length; i++) {
            penyakit += "<li>" + penyakitList.obesitas[i] + "</li>";
         }

         // Menampilkan judul penyakit (status berat) dan list penyakitnya
         return (document.getElementById("penyakit-judul").innerHTML = penyakitTitles.obesitas), (document.getElementById("penyakit-list").innerHTML += penyakit);

      default:
         break;
   }
};

// Fungsi untuk mengubah icon download menjadi checklist atau sebaliknya
const setDownloaded = (status) => {
   /* Saat tombol diklik, maka status akan berubah menjadi true dan icon berubah menjadi checklist/done.
   Saat tombol Hitung BMI diklik lagi, maka status akan berubah menjadi false dan icon berubah menjadi download kembali */
   if (status == true) {
      document.getElementById("download-icon").setAttribute("src", "./assets/done.png");
      document.getElementById("download-hasil").style = "background-color: rgba(92, 126, 219, 0.849);";
   } else if (status == false) {
      document.getElementById("download-icon").setAttribute("src", "./assets/download.png");
      document.getElementById("download-hasil").style = "background-color: rgba(25, 78, 224, 0.849);";
   }
};

// Fungsi agar layar user auto scroll ke container hasil saat tombol Hitung BMI diklik
const scrollToHasil = () => {
   document.getElementById("hasil-container").scrollIntoView({
      behavior: "smooth",
      block: "start",
   });
};
