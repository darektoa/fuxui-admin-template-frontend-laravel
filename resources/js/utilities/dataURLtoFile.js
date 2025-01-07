const dataURLtoFile = async (dataUrl, filename) => {
    const dataUrlParts = dataUrl.split(","); // Memisahkan Data URL menjadi dua bagian: informasi MIME dan data base64
    const mimeType = dataUrlParts[0].match(/:(.*?);/)[1]; // Menangkap MIME type dari bagian pertama
    const base64Data = atob(dataUrlParts[1]); // Mengubah data base64 menjadi string biner
    let length = base64Data.length; // Panjang dari string biner
    const uInt8Array = new Uint8Array(length); // Membuat array Uint8Array dengan panjang yang sesuai

    while (length--) {
        uInt8Array[length] = base64Data.charCodeAt(length); // Mengisi array dengan kode karakter dari string biner
    }

    return Promise.resolve(
        new File([uInt8Array], filename, { type: mimeType })
    );
};

export default dataURLtoFile;
