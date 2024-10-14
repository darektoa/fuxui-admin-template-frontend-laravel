import './style.css';
import { NavLink, Outlet } from 'react-router-dom';
import { usePage } from '@inertiajs/react';
import React from 'react';
import Divider from '@/components/Divider';
import Header from '@/components/Header';
// import imageBrandLogo from '@/assets/images/brand-logo.webp';
import Icon from '@/components/Icon';
import Visibility from '@/components/Visibility';

function Sidebar() {
    const { user } = usePage().props;

    return (
        <section className="sidebar-layout">
            <nav className="sidebar-layout__nav scrollbar-thin">
                <figure className="sticky top-0 w-full bg-inherit px-4 py-7">
                    {/* <img
                        src={imageBrandLogo}
                        alt="Brand Logo"
                        className="w-ful mx-auto object-contain"
                    /> */}
                    <figcaption className="text-center text-xs">DQLab Affiliator</figcaption>
                </figure>

                <ul className="sidebar-layout__nav__menu">
                    <li>
                        <NavLink
                            reloadDocument
                            to="/"
                            className="sidebar-layout__nav__menu__item"
                        >
                            <Icon.Home className="mr-3" />
                            <span className="text-sm font-semibold">Dashboard</span>
                        </NavLink>
                    </li>
                    <Visibility hidden={user.role.id === 3}>
                        <li>
                            <NavLink
                                reloadDocument
                                to="/affiliators/requests?orderBy=Latest"
                                className="sidebar-layout__nav__menu__item"
                            >
                                <Icon.Clock className="mr-3" />
                                <span className="text-sm font-semibold">Affiiliator Request</span>
                            </NavLink>
                        </li>
                    </Visibility>
                    <li>
                        <NavLink
                            reloadDocument
                            to="/affiliators/vouchers"
                            className="sidebar-layout__nav__menu__item"
                        >
                            <Icon.Tag className="mr-3" />
                            <span className="text-sm font-semibold">Vouchers</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            reloadDocument
                            to="/affiliators/promoted-products"
                            className="sidebar-layout__nav__menu__item"
                        >
                            <Icon.Link className="mr-3 rotate-90" />
                            <span className="text-sm font-semibold">Promoted Products</span>
                        </NavLink>
                    </li>
                    <Visibility hidden={user.role.id !== 2}>
                        <li>
                            <NavLink
                                reloadDocument
                                to="/users"
                                className="sidebar-layout__nav__menu__item"
                            >
                                <Icon.Users className="mr-3" />
                                <span className="text-sm font-semibold">Users</span>
                            </NavLink>
                        </li>
                    </Visibility>
                </ul>

                <Divider className="my-6 border-gray-800/10" />

                <ul className="sidebar-layout__nav__menu">
                    <Visibility hidden={user.role.id === 2}>
                        <li>
                            <NavLink
                                reloadDocument
                                to="/profile"
                                className="sidebar-layout__nav__menu__item"
                            >
                                <Icon.User className="mr-3" />
                                <span className="text-sm font-semibold">Profile</span>
                            </NavLink>
                        </li>
                    </Visibility>
                    <li>
                        <NavLink
                            reloadDocument
                            to="/changepassword"
                            className="sidebar-layout__nav__menu__item"
                        >
                            <Icon.Key className="mr-3" />
                            <span className="text-sm font-semibold">Change Password</span>
                        </NavLink>
                    </li>
                </ul>

                <Divider className="my-6 border-gray-800/10" />

                <ul className="sidebar-layout__nav__menu">
                    <li>
                        <NavLink
                            reloadDocument
                            to="/sign-out"
                            className="sidebar-layout__nav__menu__item"
                        >
                            <Icon.Logout className="mr-3 stroke-red-600" />
                            <span className="text-sm font-semibold text-red-600">Sign Out</span>
                        </NavLink>
                    </li>
                </ul>

                <small className="mt-auto w-full pt-12 text-center text-xs text-gray-400">Version: 3.10.6</small>
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
