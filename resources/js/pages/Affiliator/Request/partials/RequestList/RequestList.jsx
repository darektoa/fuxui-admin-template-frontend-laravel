import './style.css';
import { Inertia } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import Button from '@/components/Button';
import Card from '@/components/Card';
import Divider from '@/components/Divider';
import Icon from '@/components/Icon';
import Visibility from '@/components/Visibility';
import Component from '../../components';
import ModalApprove from '../ModalApprove';
import ModalDetail from '../ModalDetail';
import ModalFilter from '../ModalFilter';
import ModalSync from '../ModalSync';
import ModalReject from '../ModalReject';

function RequestList() {
    const { requests, user } = usePage().props;
    const [show, setShow] = useState({
        approve: null,
        create: null,
        edit: null,
        filter: null,
        reject: null,
        sync: null,
    });

    const [values, setValues] = useState({
        voucherPrefix: '',
        organizationName: '',
        organizationType: '',
        reason: '',
        statusReason: '',
    });

    useEffect(() => {
        (async () => {
            if (show.edit) {
                const response = await fetch(`/affiliators/requests/${show.edit?.user_id}`);
                const resJSON = await response.json();
                const data = await resJSON?.data;
                setValues(data);
            } else if (show.edit == null) {
                setValues({});
            }
        })();
    }, [show]);

    const handleChange = (e) => {
        const key = e.target.name;
        const value = e.target?.files?.[0] || e.target.value;
        setValues((values) => ({
            ...values,
            [key]: value,
        }));
    };

    const handleSync = (e, userId) => {
        e.preventDefault();
        Inertia.put(`/affiliators/vouchers/${userId}/sync`);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (show.approve) Inertia.patch(`/affiliators/requests/${show.approve?.user_id}/approve`, values);
        if (show.create) Inertia.post('/affiliators/requests', values);
        if (show.edit) Inertia.patch(`/affiliators/requests/${show.edit?.id}`, values);
        if (show.reject) Inertia.patch(`/affiliators/requests/${show.reject?.user_id}/reject`, values);
    };

    return (
        <>
            <Card className="w-full p-5 xl:px-12 xl:py-4">
                <header className="flex w-full items-center py-6">
                    <div>
                        <h3 className="mb-1 text-xl font-bold leading-normal xl:text-2xl">Affiliator Requests</h3>
                        <p className="mb-0 text-sm text-gray-400 sm:text-base">List of requests to become affiliator</p>
                    </div>
                    <Component.Search className="mx-auto" />
                    <Button
                        className="ml-auto border border-gray-200 bg-white p-2 shadow-none"
                        onClick={() => setShow((states) => ({
                            ...states,
                            filter: true,
                        }))}
                    >
                        <Icon.Filter className="h-5 w-5" />
                    </Button>
                </header>
                <Divider className="mb-6" />
                <div className="scrollbar-thin mb-4 h-[600px] w-full overflow-auto xl:mb-8 xl:min-h-[25rem]">
                    <table className="w-full">
                        <thead>
                            <tr className="sticky top-0 bg-white">
                                <th className="w-0 px-1">#</th>
                                <th className="px-2 py-1 text-left text-xs sm:px-4 sm:py-3 sm:text-base">Name</th>
                                <th className="px-2 py-1 text-left text-xs sm:px-4 sm:py-3 sm:text-base">Status</th>
                                <th
                                    colSpan="10"
                                    className="w-0 px-1 py-1 text-center text-xs sm:px-4 sm:py-3 sm:text-base"
                                >
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody className="[&>*:nth-child(odd)]:bg-gray-100/80">
                            {requests?.items?.map((request, index) => (
                                <tr key={request.user_id}>
                                    <td className="px-2 py-1 text-left text-xs sm:px-4 sm:py-3 sm:text-base">
                                        {index + 1}
                                    </td>
                                    <td className="px-2 py-1 text-left text-xs sm:px-4 sm:py-3 sm:text-base">
                                        <p className="font-bold">{request?.name}</p>
                                        <small>{request?.email}</small>
                                    </td>
                                    <td className="px-2 py-1 text-left text-xs sm:px-4 sm:py-3 sm:text-base">
                                        <Component.Status code={request.status.id}>
                                            <p className="font-bold text-inherit">{request.status.name}</p>
                                            <small className="text-inherit">
                                                {new Date(request.updated_at).toLocaleString('id-ID')}
                                            </small>
                                        </Component.Status>
                                    </td>
                                    <td className="w-0 p-1 text-center text-xs sm:py-3 sm:text-base">
                                        <Button
                                            className="p-3"
                                            onClick={() => setShow((states) => ({
                                                ...states,
                                                edit: request,
                                            }))}
                                        >
                                            <Icon.Eye className="h-4 w-4 stroke-gray-500" />
                                        </Button>
                                    </td>
                                    <Visibility hidden={user.role.id === 3}>
                                        <td className="w-0 p-1 text-center text-xs sm:py-3 sm:text-base">
                                            <Button
                                                className="p-3"
                                                hidden={request.status.id > 1}
                                                onClick={() => setShow((states) => ({
                                                    ...states,
                                                    approve: request,
                                                }))}
                                            >
                                                <Icon.Check className="h-4 w-4 stroke-green-500" />
                                            </Button>
                                        </td>
                                        <td className="w-0 p-1 text-center text-xs sm:py-3 sm:text-base">
                                            <Button
                                                className="p-3"
                                                hidden={request.status.id > 1}
                                                onClick={() => setShow((states) => ({
                                                    ...states,
                                                    reject: request,
                                                }))}
                                            >
                                                <Icon.Cross className="h-4 w-4 stroke-red-500" />
                                            </Button>
                                        </td>
                                    </Visibility>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <footer className="flex w-full flex-col items-start xl:flex-row xl:items-baseline xl:text-left">
                    <p className="mb-4 w-full text-center text-xs text-gray-400 xl:mr-2 xl:w-auto">Request List</p>
                </footer>
            </Card>

            <ModalApprove
                show={show.approve}
                data={show.approve}
                onSubmit={handleSubmit}
                onChange={handleChange}
                wrapperClassName="p-5 items-start overflow-auto lg:items-center"
                onClose={() => setShow((states) => ({
                    ...states,
                    approve: null,
                }))}
            />

            <ModalDetail
                show={show.edit}
                data={values}
                onSubmit={handleSubmit}
                onChange={handleChange}
                onClose={() => setShow((states) => ({
                    ...states,
                    edit: null,
                }))}
            />

            <ModalFilter
                show={show.filter}
                onClose={() => setShow((states) => ({
                    ...states,
                    filter: null,
                }))}
            />

            <ModalSync
                show={show.sync}
                onSubmit={(e) => handleSync(e, show.sync?.user?.id)}
                onClose={() => setShow((states) => ({
                    ...states,
                    sync: null,
                }))}
            />

            <ModalReject
                show={show.reject}
                data={show.reject}
                onSubmit={handleSubmit}
                onChange={handleChange}
                wrapperClassName="p-5 items-start overflow-auto lg:items-center"
                onClose={() => setShow((states) => ({
                    ...states,
                    reject: null,
                }))}
            />
        </>
    );
}

export default RequestList;
