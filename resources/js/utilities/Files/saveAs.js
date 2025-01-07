function saveAs(blob, fileName) {
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);

    link.href = url;
    link.download = fileName;
    link.click();

    URL.revokeObjectURL(url);
}

export default saveAs;
