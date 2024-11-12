import { Route, Routes } from 'react-router-dom';
import Auth from '@/pages/Auth';
import ChangePassword from '@/pages/ChangePassword';
import Content from '@/pages/Content';
import Home from '@/pages/Home';
import Layout from '@/layouts';
import Log from '@/pages/Log';
import Maintenance from '@/pages/Maintenance';
import Profile from '@/pages/Profile';
import React from 'react';
import User from '@/pages/User';

function AppRoutes() {
    return (
        <Routes>

            {/*
                AUTHENTICATION LAYOUT
            */}
            <Route element={<Layout.Authentication />}>
                <Route path="/maintenance">
                    <Route index element={<Maintenance />} />
                </Route>

                <Route path="/forgot-password">
                    <Route index element={<Auth.ForgotPassword />} />
                </Route>

                <Route path="/reset-password">
                    <Route path=":token" element={<Auth.ResetPassword />} />
                </Route>

                <Route path="/sign-in" element={<Auth.SignIn />} />

                <Route path="/sign-up">
                    <Route index element={<Auth.SignUp />} />
                    <Route path="success" element={<Auth.SignUp.Success />} />
                </Route>
            </Route>


            {/*
                SIDEBAR LAYOUT
            */}
            <Route element={<Layout.Sidebar />}>
                <Route path="/home" element={<Home />} />

                <Route path="/contents">
                    <Route index element={<Content />} />
                    <Route path="type" element={<Content.Type />} />
                    <Route path=":contentId" element={<Content />} />
                </Route>

                <Route path="/logs">
                    <Route path="activities">
                        <Route index element={<Log.Activity />} />
                        <Route path=":id" element={<Log.Activity />} />
                    </Route>
                </Route>

                <Route path="/menus">
                    <Route index element={<User />} />
                    <Route path="create" element={<User />} />
                    <Route path=":id/edit" element={<User />} />

                    <Route path="permissions">
                        <Route index element={<User />} />
                        <Route path="create" element={<User />} />
                        <Route path=":id/edit" element={<User />} />

                        <Route path="types">
                            <Route index element={<User />} />
                            <Route path="create" element={<User />} />
                            <Route path=":id/edit" element={<User />} />
                        </Route>
                    </Route>
                </Route>

                <Route path="/profile">
                    <Route index element={<Profile />} />
                    <Route path="edit" element={<User />} />
                </Route>

                <Route path="/users">
                    <Route index element={<User />} />
                    <Route path="create" element={<User.Create />} />

                    <Route path="roles">
                        <Route index element={<User.Role />} />
                        <Route path="create" element={<User.Role.Create />} />
                        <Route path=":id/edit" element={<User.Role.Edit />} />
                    </Route>

                    <Route path=":id/edit" element={<User.Edit />} />
                </Route>

                <Route path="/changepassword">
                    <Route index element={<ChangePassword />} />
                </Route>
            </Route>
        </Routes>
    );
}

export default AppRoutes;
