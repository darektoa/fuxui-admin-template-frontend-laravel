function toBlob(file) {
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);

    const promise = new Promise((resolve, reject) => {
        fileReader.addEventListener('load', (event) => {
            const arrayBuffer = event.target.result;
            const blob = new Blob([arrayBuffer]);
            resolve(blob);
        });

        fileReader.addEventListener('error', (event) => {
            reject(null);
        });
    });

    return promise;
}

export default toBlob;
