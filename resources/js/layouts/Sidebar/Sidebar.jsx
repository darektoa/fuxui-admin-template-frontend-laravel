import './style.css';
import { Outlet } from 'react-router-dom';
import { matchPath, useLocation } from 'react-router-dom';
import { useDisclosure } from '@nextui-org/react';
import { useFavicon, useWebTitle } from '@/hooks';
import { usePage } from '@inertiajs/react';
import Divider from '@/components/Divider';
import Header from '@/components/Header';
import Menu from '@/components/Menu';
import Modal from "@/components/Modal";
import React, { useEffect } from 'react';
import Visibility from '@/components/Visibility';

function Sidebar() {
    const { appContents, errors, flash, user, menus } = usePage().props;
    const { pathname } = useLocation();
    const modalSuccess = useDisclosure();
    const modalFailed = useDisclosure();
    const errorMessage = Object.values(errors || {})[0];

    useWebTitle(appContents['appWebTitle']?.value);
    useFavicon(appContents['appFavicon']?.value);

    const isActive = (path, pathname) => (
        path &&
        matchPath(path, pathname)
    )

    useEffect(() => {
        if(Boolean(errorMessage)) modalFailed.onOpen();
        if(Boolean(flash?.success)) modalSuccess.onOpen();
    }, [errors, flash?.success]);

    return (
        <section className="sidebar-layout">
            <nav className="sidebar-layout__nav scrollbar-thin">
                <figure className="sticky top-0 w-full bg-inherit px-4 py-7">
                    <img
                        src={appContents['appLogo']?.value}
                        alt="Brand Logo"
                        className="w-full max-h-16 mx-auto object-contain mb-1"
                    />
                    <figcaption className="text-center  text-sm">
                        {appContents['appName']?.value}
                    </figcaption>
                </figure>

                <Divider />

                <Menu>
                    <Menu.Folders
                        data={menus}
                        filter={(item) => item?.uri == null}
                        isActive={(item) => isActive(item?.uri, pathname)}
                        itemFilter={(item) => item?.uri != null}
                        reload={true}
                        attributeMaps={{
                            children: 'name',
                            data: 'menus',
                            items: 'menus',
                        }}
                        itemAttributeMaps={{
                            children: 'name',
                            href: 'uri',
                        }}
                    />
                </Menu>

                <small className="mt-auto w-full pt-12 text-center text-xs text-gray-400">
                    Version: 1.0.0-Alpha
                </small>
            </nav>

            <section className="content">
                <Header.App className="mb-1 px-6" />

                <div className="content__body">
                    <Outlet />
                </div>

                <footer className="w-full mt-auto bg-white py-4 px-8">
                    <p className="text-sm text-center text-gray-400">
                        Copyright &copy; 2024. All Rights Reserved.
                    </p>
                </footer>
            </section>

            <Modal.Failed
                isOpen={modalFailed.isOpen}
                onOpenChange={modalFailed.onOpenChange}
                placement="top-center"
                content={errorMessage}
            />

            <Modal.Success
                isOpen={modalSuccess.isOpen}
                onOpenChange={modalSuccess.onOpenChange}
                placement="top-center"
                content={flash?.success}
            />
        </section>
    );
}

export default Sidebar;
