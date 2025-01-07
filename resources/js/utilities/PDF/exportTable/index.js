import Files from "../../Files";
import layoutToBlob from "./layoutToBlob";

async function exportTable(fileName, data) {
    const blob = await layoutToBlob(data);
    Files.saveAs(blob, fileName);
}

export default exportTable;
