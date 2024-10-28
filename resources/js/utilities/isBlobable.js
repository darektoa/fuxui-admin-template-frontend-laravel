function isBloabable(file) {
    const { type } = file;

    return type.startsWith('image/') || type.startsWith('video/') || type.startsWith('audio/');
}

export default isBloabable;
