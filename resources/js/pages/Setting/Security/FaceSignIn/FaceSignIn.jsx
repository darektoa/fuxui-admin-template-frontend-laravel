import "./style.css";
import { parseDate } from "@internationalized/date";
import { useEventHandler, usePageLoaded } from "./_hooks";
import { useForm } from "react-hook-form";
import { usePage } from "@inertiajs/react";
import { useShallow } from "zustand/shallow";
import deleteFaceFetcher from "./_functions/deleteFaceFetcher";
import Modal from "@/components/Modal";
import Partial from "./_partials";
import React, { useCallback, useMemo } from "react";
import usePageStore from "./_stores";
import useSWRMutation from "swr/mutation";

function FaceSignIn() {
    usePageLoaded();

    const { CSRF_TOKEN } = usePage().props;
    const { data, error, trigger } = useSWRMutation("/settings/security/face-sign-in", deleteFaceFetcher)
    const { deleteConfirmOnClose } = useEventHandler();
    const { control, handleSubmit, setValue } = useForm();
    const { filter, show } = usePageStore(
        useShallow((state) => ({
            filter: state.table.filter,
            show: state.table.show,
        }))
    );

    const deleteOnSubmit = useCallback((e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("_token", CSRF_TOKEN);
        
        trigger({
            body: formData,
            id: show?.deleteConfirmModal?.id,
        });
    }, [show?.deleteConfirmModal]);

    console.log('Face Sign-In Page');

    return useMemo(() => (
        <main className="grid grid-cols-12 w-full gap-6 py-6">
            <Partial.Breadcrumbs />

            <Partial.FaceTableCard />

            <Modal.DeleteConfirm
                isOpen={show.deleteConfirmModal}
                onClose={deleteConfirmOnClose}
                placement="top-center"
                onSubmit={deleteOnSubmit}
                content={
                    <>
                        This action will delete{" "}
                        <span className="font-bold">
                            {show?.deleteConfirmModal?.name}
                        </span>{" "}
                        permanently! Are you sure?
                    </>
                }
            />
        </main>
    ), [control, filter, show]);
}

export default FaceSignIn;
