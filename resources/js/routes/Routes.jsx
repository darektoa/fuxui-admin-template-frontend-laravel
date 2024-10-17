import { Route, Routes } from 'react-router-dom';
import React from 'react';
import Affiliator from '@/pages/Affiliator';
import Auth from '@/pages/Auth';
import Home from '@/pages/Home';
import Layout from '@/layouts';
import Maintenance from '@/pages/Maintenance';
import Profile from '@/pages/Profile';
import User from '@/pages/User';
import ChangePassword from '@/pages/ChangePassword';

function AppRoutes() {
    return (
        <Routes>
            <Route element={<Layout.Authentication />}>
                <Route path="/maintenance">
                    <Route
                        index
                        element={<Maintenance />}
                    />
                </Route>

                <Route path="/forgot-password">
                    <Route
                        index
                        element={<Auth.ForgotPassword />}
                    />
                </Route>

                <Route path="/reset-password">
                    <Route
                        path=":token"
                        element={<Auth.ResetPassword />}
                    />
                </Route>

                <Route
                    path="/sign-in"
                    element={<Auth.SignIn />}
                />

                <Route path="/sign-up">
                    <Route
                        index
                        element={<Auth.SignUp />}
                    />
                    <Route
                        path="success"
                        element={<Auth.SignUp.Success />}
                    />
                </Route>
            </Route>

            <Route element={<Layout.Sidebar />}>
                <Route
                    path="/home"
                    element={<Home />}
                />

                <Route path="/affiliators">
                    <Route
                        index
                        element={<Affiliator />}
                    />
                    <Route
                        path="requests"
                        element={<Affiliator.Request />}
                    />
                    <Route
                        path="vouchers"
                        element={<Affiliator.Voucher />}
                    />
                    <Route
                        path="promoted-products"
                        element={<Affiliator.PromotedProduct />}
                    />
                </Route>

                <Route path="/profile">
                    <Route
                        index
                        element={<Profile />}
                    />
                </Route>

                <Route path="/users">
                    <Route
                        index
                        element={<User />}
                    />
                </Route>

                <Route path="/changepassword">
                    <Route
                        index
                        element={<ChangePassword />}
                    />
                </Route>
            </Route>
        </Routes>
    );
}

export default AppRoutes;
