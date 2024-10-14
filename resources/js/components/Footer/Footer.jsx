import './style.css';
import React from 'react';
import brand_logo from '@/assets/images/brand-logo.png';

function Footer() {
    return (
        <footer className="footer-component container py-20">
            <img
                src={brand_logo}
                alt="Xeratic Brand Logo"
                width="132"
                height="40"
                className="mr-20 h-10"
            />
            <div className="flex w-full max-w-3xl justify-between text-base">
                <nav className="flex flex-col">
                    <h3 className="mb-8 font-bold">Menu</h3>
                    <ul className="flex flex-col">
                        <li className="mb-6">
                            <a
                                href="#"
                                className="text-gray-500"
                            >
                                Home
                            </a>
                        </li>
                        <li className="mb-6">
                            <a
                                href="#"
                                className="text-gray-500"
                            >
                                Service
                            </a>
                        </li>
                        <li className="mb-6">
                            <a
                                href="#"
                                className="text-gray-500"
                            >
                                Work
                            </a>
                        </li>
                        <li className="mb-6">
                            <a
                                href="#"
                                className="text-gray-500"
                            >
                                About
                            </a>
                        </li>
                    </ul>
                </nav>
                <nav className="flex flex-col">
                    <h3 className="mb-8 font-bold">Case Study</h3>
                    <ul className="flex flex-col">
                        <li className="mb-6">
                            <a
                                href="#"
                                className="text-gray-500"
                            >
                                Retail
                            </a>
                        </li>
                        <li className="mb-6">
                            <a
                                href="#"
                                className="text-gray-500"
                            >
                                Finance
                            </a>
                        </li>
                    </ul>
                </nav>
                <nav className="flex flex-col">
                    <h3 className="mb-8 font-bold">About</h3>
                    <ul className="flex flex-col">
                        <li className="mb-6">
                            <a
                                href="#"
                                className="text-gray-500"
                            >
                                About
                            </a>
                        </li>
                        <li className="mb-6">
                            <a
                                href="#"
                                className="text-gray-500"
                            >
                                Services
                            </a>
                        </li>
                        <li className="mb-6">
                            <a
                                href="#"
                                className="text-gray-500"
                            >
                                Career
                            </a>
                        </li>
                        <li className="mb-6">
                            <a
                                href="#"
                                className="text-gray-500"
                            >
                                Contact Us
                            </a>
                        </li>
                        <li className="mb-6">
                            <a
                                href="#"
                                className="text-gray-500"
                            >
                                Blogs
                            </a>
                        </li>
                    </ul>
                </nav>
                <nav className="flex flex-col">
                    <h3 className="mb-8 font-bold">Links</h3>
                    <ul className="flex flex-col">
                        <li className="mb-6">
                            <a
                                href="#"
                                className="text-gray-500"
                            >
                                Retail
                            </a>
                        </li>
                        <li className="mb-6">
                            <a
                                href="#"
                                className="text-gray-500"
                            >
                                Finance
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </footer>
    );
}

export default Footer;
