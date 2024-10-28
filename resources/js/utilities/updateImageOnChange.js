import toDataURL from './toDataURL';

async function updateImageOnChange(event, previewElementId) {
    const file = event.target.files[0];
    const imagesDataURL = await toDataURL(file);
    document.getElementById(previewElementId).src = imagesDataURL;
}

export default updateImageOnChange;
