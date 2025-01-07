function random(length: number = 8) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const randomArr = new Uint8Array(length);
    const resultArr: string[] = []; 
    crypto.getRandomValues(randomArr);

    randomArr.forEach(byte => {
        resultArr.push(characters[byte % characters.length]);
    });

    return resultArr.join('');
}

export default random;