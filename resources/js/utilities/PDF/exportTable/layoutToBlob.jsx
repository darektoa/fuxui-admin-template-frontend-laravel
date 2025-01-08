import { pdf } from "@react-pdf/renderer";
import Layout from "./Layout";
import React from "react";

async function layoutToBlob(data) {
    return await pdf(<Layout data={data} />).toBlob();
}

export default layoutToBlob;
