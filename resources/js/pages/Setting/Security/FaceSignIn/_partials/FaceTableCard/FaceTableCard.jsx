import "./style.css";
import { Card, CardBody } from "@nextui-org/react";
import { useFetchFace } from "../../_hooks";
import CardHeader from "./CardHeader/CardHeader";
import isAuthorized from "@/utilities/isAuthorized";
import React, { useMemo } from "react";
import TableSection from "./TableSection/TableSection";

function FaceTableCard() {
    useFetchFace();

    console.log("Face Table Card");

    return useMemo(
        () => (
            <Card className="col-span-12 shadow-xl">
                <CardHeader />

                <CardBody className="w-full pt-3 px-6 pb-6 grid grid-cols-12 gap-5 overflow-visible">
                    <TableSection />
                </CardBody>
            </Card>
        ),
        []
    );
}

export default FaceTableCard;
