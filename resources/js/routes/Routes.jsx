import { Route, Routes } from "react-router";
import Auth from "@/pages/Auth";
import ChangePassword from "@/pages/ChangePassword";
import Content from "@/pages/Content";
import Home from "@/pages/Home";
import Layout from "@/layouts";
import Log from "@/pages/Log";
import Maintenance from "@/pages/Maintenance";
import Menu from "@/pages/Menu";
import Profile from "@/pages/Profile";
import React from "react";
import Setting from "@/pages/Setting";
import User from "@/pages/User";

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

                <Route path="/sign-in">
                    <Route index element={<Auth.SignIn />} />
                    <Route path="face" element={<Auth.SignIn.Face />} />
                </Route>

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

                    <Route path="types">
                        <Route index element={<Content.Type />} />
                        <Route path="create" element={<Content.Type />} />
                        <Route
                            path=":contentId/edit"
                            element={<Content.Type.Edit />}
                        />
                    </Route>

                    <Route path=":contentId" element={<Content />} />
                </Route>

                <Route path="/logs">
                    <Route path="activities">
                        <Route index element={<Log.Activity />} />
                        <Route path=":id" element={<Log.Activity />} />
                    </Route>
                </Route>

                <Route path="/menus">
                    <Route index element={<Menu />} />
                    <Route path="create" element={<Menu />} />

                    <Route path="permissions">
                        <Route index element={<Menu.Permission />} />
                        <Route path="create" element={<Menu.Permission />} />

                        <Route path="types">
                            <Route index element={<Menu.Permission.Type />} />
                            <Route
                                path="create"
                                element={<Menu.Permission.Type />}
                            />
                            <Route
                                path=":typeId/edit"
                                element={<Menu.Permission.Type.Edit />}
                            />
                        </Route>

                        <Route
                            path=":permissionId/edit"
                            element={<Menu.Permission.Edit />}
                        />
                    </Route>

                    <Route path=":menuId" element={<Menu />} />
                </Route>

                <Route path="/profile">
                    <Route index element={<Profile />} />
                    <Route path="edit" element={<Profile />} />
                </Route>

                <Route path="/settings">
                    <Route index element={<Setting />} />

                    <Route path="security">
                        <Route index element={<Setting.Security />} />

                        <Route path="face-sign-in">
                            <Route
                                index
                                element={<Setting.Security.FaceSignIn />}
                            />
                            <Route
                                path="create"
                                element={<Setting.Security.FaceSignIn.Create />}
                            />
                            <Route
                                path=":faceId/edit"
                                element={<Setting.Security.FaceSignIn />}
                            />
                        </Route>
                    </Route>
                </Route>

                <Route path="/users">
                    <Route index element={<User />} />
                    <Route path="create" element={<User.Create />} />

                    <Route path="roles">
                        <Route index element={<User.Role />} />
                        <Route path="create" element={<User.Role.Create />} />
                        <Route
                            path=":roleId/edit"
                            element={<User.Role.Edit />}
                        />
                    </Route>

                    <Route path=":userId/edit" element={<User.Edit />} />
                </Route>

                <Route path="/changepassword">
                    <Route index element={<ChangePassword />} />
                </Route>
            </Route>
        </Routes>
    );
}

export default AppRoutes;
