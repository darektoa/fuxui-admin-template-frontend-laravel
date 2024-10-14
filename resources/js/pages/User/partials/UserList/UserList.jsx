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
import ModalAddVoucher from '../ModalAddVoucher';
import ModalDelete from '../ModalDelete';
import ModalDetail from '../ModalDetail';
import ModalFilter from '../ModalFilter';
import ModalRestore from '../ModalRestore';

function UserList() {
    const { users } = usePage().props;
    const [show, setShow] = useState({
        addVoucher: null,
        delete: null,
        edit: null,
        filter: null,
        restore: null,
    });

    const [values, setValues] = useState({});

    useEffect(() => {
        (async () => {
            if (show.edit) {
                const response = await fetch(`/users/${show.edit?.user_id}`);
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

    const handleSubmit = (e) => {
        e.preventDefault();

        if (show.addVoucher) Inertia.post(`/affiliators/vouchers/${show.addVoucher?.user_id}/create`, values);
        if (show.edit) Inertia.patch(`/users/${show.edit?.user_id}`, values);
        if (show.restore) Inertia.patch(`/users/${show.restore?.user_id}/restore`);
        if (show.delete) Inertia.delete(`/users/${show.delete?.user_id}`, values);
    };

    return (
        <>
            <Card className="w-full p-5 xl:px-12 xl:py-4">
                <header className="flex w-full items-center py-6">
                    <div>
                        <h3 className="mb-1 text-xl font-bold leading-normal xl:text-2xl">Users</h3>
                        <p className="mb-0 text-sm text-gray-400 sm:text-base">List of all users</p>
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
                                <th className="px-2 py-1 text-left text-xs sm:px-4 sm:py-3 sm:text-base">Role</th>
                                <th
                                    colSpan="10"
                                    className="w-0 px-1 py-1 text-center text-xs sm:px-4 sm:py-3 sm:text-base"
                                >
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody className="[&>*:nth-child(odd)]:bg-gray-100/80">
                            {users?.items?.map((user, index) => (
                                <tr key={user.user_id}>
                                    <td className="px-2 py-1 text-left text-xs sm:px-4 sm:py-3 sm:text-base">
                                        {index + 1}
                                    </td>
                                    <td className="px-2 py-1 text-left text-xs sm:px-4 sm:py-3 sm:text-base">
                                        <p className="font-bold">
                                            {user?.name}
                                            <Visibility hidden={!(user?.is_email_verified)}>
                                                <Icon.CheckCircle className="inline mx-1 h-4 w-4 stroke-blue-500" />
                                            </Visibility>
                                        </p>
                                        <small>
                                            {`${user?.email} (${user?.username})`}
                                        </small>
                                    </td>
                                    <td className="px-2 py-1 text-left text-xs sm:px-4 sm:py-3 sm:text-base">
                                        <Component.Status code={user?.role?.id}>
                                            <p className="font-bold text-inherit">{user?.role?.name}</p>
                                            <small className="text-inherit">
                                                {new Date(user.updated_at).toLocaleString('id-ID')}
                                            </small>
                                        </Component.Status>
                                    </td>
                                    <td className="w-0 p-1 text-center text-xs sm:py-3 sm:text-base">
                                        <Button
                                            className="p-3"
                                            onClick={() => setShow((states) => ({
                                                ...states,
                                                edit: user,
                                            }))}
                                        >
                                            <Icon.Eye className="h-4 w-4 stroke-gray-500" />
                                        </Button>
                                    </td>
                                    <td className="w-0 p-1 text-center text-xs sm:py-3 sm:text-base">
                                        <Button
                                            className="p-3"
                                            hidden={user.deleted_at === null}
                                            onClick={() => setShow((states) => ({
                                                ...states,
                                                restore: user,
                                            }))}
                                        >
                                            <Icon.RefreshCw className="h-4 w-4 stroke-yellow-500" />
                                        </Button>
                                        <Button
                                            className="p-3"
                                            hidden={user.deleted_at !== null}
                                            onClick={() => setShow((states) => ({
                                                ...states,
                                                delete: user,
                                            }))}
                                        >
                                            <Icon.Trash className="h-4 w-4 stroke-red-500" />
                                        </Button>
                                    </td>
                                    <td className="w-0 p-1 text-center text-xs sm:py-3 sm:text-base">
                                        <Button
                                            className="p-3"
                                            onClick={() => setShow((states) => ({
                                                ...states,
                                                addVoucher: user,
                                            }))}
                                        >
                                            <Icon.Plus className="h-4 w-4 stroke-green-500" />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <footer className="flex w-full flex-col items-start xl:flex-row xl:items-baseline xl:text-left">
                    <p className="mb-4 w-full text-center text-xs text-gray-400 xl:mr-2 xl:w-auto">Request List</p>
                </footer>
            </Card>

            <ModalAddVoucher
                show={show.addVoucher}
                onSubmit={handleSubmit}
                onChange={handleChange}
                onClose={() => setShow((states) => ({
                    ...states,
                    addVoucher: false,
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

            <ModalDelete
                show={show.delete}
                onSubmit={handleSubmit}
                onClose={() => setShow((states) => ({
                    ...states,
                    delete: null,
                }))}
            />

            <ModalRestore
                show={show.restore}
                onSubmit={handleSubmit}
                onClose={() => setShow((states) => ({
                    ...states,
                    restore: null,
                }))}
            />
        </>
    );
}

export default UserList;
