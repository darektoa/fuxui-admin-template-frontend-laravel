import isAuthorized from "@/utilities/isAuthorized";
import React, { useMemo } from "react";
import Section from "@/components/Section";
import TableSectionHeader from "../TableSectionHeader";
import Table from "../Table";

function TableSection() {
    console.log("Face Table Card - Table Section");

    return useMemo(
        () => (
            <Section
                permissions="01JDKB58YQNTN1HHF0TBKVP68Z"
                className="col-span-12"
            >
                <TableSectionHeader />
                <Table />
            </Section>
        ),
        []
    );
}

export default TableSection;
