import ExcelJS from "exceljs";
import Files from "../Files";
import isFunction from "../isFunction";
import Times from "../Times";

async function export1(fileName, data) {
    const CHUNK_SIZE = 50;
    const workbook = new ExcelJS.Workbook();

    for(const item of data) {
        const NUM_OF_PART = Math.ceil(item?.rows?.length);
        const worksheet = workbook.addWorksheet(item?.sheetName);
        worksheet.columns = item?.columns;

        for (let i = 0; i < NUM_OF_PART; i += CHUNK_SIZE) {
            const chunk = item?.rows?.slice(i, i + CHUNK_SIZE);
            const maps = item?.maps;

            chunk.forEach((rowItem) => {
                const row = { ...rowItem };

                if (maps) for (const key in maps) {
                    if (isFunction(maps?.[key])) row[key] = maps[key](rowItem);
                }

                worksheet.addRow(row);
            });

            await Times.delay(50);
        }

        await Times.delay(50);
    };

    const BLOB_TYPE = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: BLOB_TYPE });

    Files.saveAs(blob, fileName);
}

export default export1;
