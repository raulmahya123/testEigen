# Menggunakan node sebagai base image
FROM node:20

# Menetapkan direktori kerja dalam kontainer
WORKDIR /usr/src/app

# Menyalin dependensi dan file package.json ke direktori kerja
COPY package*.json ./

# Menginstal dependensi yang diperlukan
RUN npm install

# Menyalin seluruh kode sumber ke direktori kerja
COPY . .

# Menjalankan server aplikasi
CMD ["npm", "start"]
