import './style.css';
import { NavLink, Outlet } from 'react-router-dom';
import { matchPath, useMatch, useLocation } from 'react-router-dom';
import { useFavicon, useWebTitle } from '@/hooks';
import { usePage } from '@inertiajs/react';
import Divider from '@/components/Divider';
import Header from '@/components/Header';
import Icon from '@/components/Icon';
import imageBrandLogo from '@/assets/images/brand-logo.svg';
import Menu from '@/components/Menu';
import React, { useEffect } from 'react';
import Visibility from '@/components/Visibility';

function Sidebar() {
    const { appContents, user, menus } = usePage().props;
    const { pathname } = useLocation();

    useWebTitle(appContents['appWebTitle']?.value);
    useFavicon(appContents['appFavicon']?.value);
    console.log(appContents)

    const isActive = (path, pathname) => (
        path &&
        matchPath(path, pathname)
    )

    return (
        <section className="sidebar-layout">
            <nav className="sidebar-layout__nav scrollbar-thin">
                <figure className="sticky top-0 w-full bg-inherit px-4 py-7">
                    <img
                        src={appContents['appLogo']?.value}
                        alt="Brand Logo"
                        className="w-ful mx-auto object-contain mb-1"
                    />
                    <figcaption className="text-center text-sm">
                        {appContents['appName']?.value}
                    </figcaption>
                </figure>

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
                    <p className="text-sm text-center text-gray-400">Copyright &copy; 2024. All Rights Reserved.</p>
                </footer>
            </section>
        </section>
    );
}

export default Sidebar;
