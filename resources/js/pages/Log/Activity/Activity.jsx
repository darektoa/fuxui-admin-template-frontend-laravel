import "./style.css";
import {
    Button,
    Input,
    useDisclosure,
} from "@nextui-org/react";
import { FeatherIcon } from "@/components/Icon";
import { router, usePage } from "@inertiajs/react";
import Partial from "./_partials";
import React, { useMemo, useState } from "react";
import useForm from "@/hooks/useForm";

function Activitity() {
    const modalFilter = useDisclosure();
    const { CSRF_TOKEN, activities } = usePage().props;
    const [show, setShow] = useState({
        delete: null,
        restore: null,
        filter: null,
        Search: null,
    });

    const { values, setValues, handleChange } = useForm({
        startDate: null,
        endDate: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (show.restore) router.patch(`/users/activities/${show.restore?.id}/restore`);
        else if (show.delete) router.delete(`/users/activities/${show.delete?.id}`);
        else router.get(`?startDate=${values.startDate}&endDate=${values.endDate}`);
    };

    return (
        <main className="grid grid-cols-12 w-full gap-6 py-6">
            <Partial.Breadcrumbs />

            <div className="col-span-12 flex gap-4">
                <Button
                    isIconOnly
                    color="primary"
                    variant="flat"
                    className="p-1"
                    onClick={() => {
                        modalFilter.onOpen();
                    }}
                >
                    <FeatherIcon.Filter className="size-5" />
                </Button>
                {/* <Input
                    isClearable
                    className="w-full sm:max-w-xs"
                    placeholder="Search here . . ."
                    startContent={<FeatherIcon.Search className="size-5 shrink-0" />}
                    value={values.search}
                    onValueChange={handleChange}
                /> */}
            </div>

            <Partial.ActivityTable />

            <Partial.ModalFilter
                isOpen={modalFilter.isOpen}
                onOpenChange={modalFilter.onOpenChange}
                placement="top-center"
                values={values}
                setValues={setValues}
                onChange={handleChange}
                onSubmit={handleSubmit}
            />
        </main>
    );
}

export default Activitity;
