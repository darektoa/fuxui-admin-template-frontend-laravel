function toDataURL(file) {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    const promise = new Promise((resolve, reject) => {
        fileReader.addEventListener('load', (event) => {
            const dataURL = event.target.result;
            resolve(dataURL);
        });

        fileReader.addEventListener('error', (event) => {
            reject(null);
        });
    });

    return promise;
}

export default toDataURL;
