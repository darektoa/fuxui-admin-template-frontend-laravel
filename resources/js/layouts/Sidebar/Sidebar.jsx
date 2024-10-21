import './style.css';
import { NavLink, Outlet } from 'react-router-dom';
import { usePage } from '@inertiajs/react';
import React from 'react';
import Divider from '@/components/Divider';
import Header from '@/components/Header';
import imageBrandLogo from '@/assets/images/brand-logo.svg';
import Icon from '@/components/Icon';
import Visibility from '@/components/Visibility';
import Menu from '@/components/Menu';
import { useMatch } from 'react-router-dom';

function Sidebar() {
    const { user, menus } = usePage().props;

    console.log(menus);

    return (
        <section className="sidebar-layout">
            <nav className="sidebar-layout__nav scrollbar-thin">
                <figure className="sticky top-0 w-full bg-inherit px-4 py-7">
                    <img
                        src={imageBrandLogo}
                        alt="Brand Logo"
                        className="w-ful mx-auto object-contain mb-1"
                    />
                    <figcaption className="text-center text-sm">
                        Fuxui Dashboard
                    </figcaption>
                </figure>

                <Menu>
                    {menus.map((item, index) => (
                        <Menu.Item
                            key={'menu-' + index}
                            href={item?.uri}
                            isActive={Boolean(useMatch(item?.uri ?? ''))}
                            items={item?.menus?.map(menu => ({
                                children: menu?.name,
                                href: menu?.uri,
                                isActive: Boolean(useMatch(menu?.uri ?? '')),
                            }))}
                        >
                            <Icon.Activity className="size-5" />
                            {item?.name}
                        </Menu.Item>
                    ))}
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
            </section>
        </section>
    );
}

export default Sidebar;
