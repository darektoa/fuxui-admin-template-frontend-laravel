import './style.css';
import {
    Facebook, Instagram, LinkedIn, Mail, Phone,
} from '@mui/icons-material';
import React from 'react';
import brand_logo from './.@/assets/images/brand-logo.png';

function App() {
    return (
        <footer className="footer-component container py-16 sm:py-16">
            <div className="mr-4 flex flex-col sm:mr-20">
                <p className="mb-2 text-base text-gray-500 sm:mb-4 sm:text-lg">Build by</p>
                <img
                    src={brand_logo}
                    alt="Xeratic Brand Logo"
                    width="132"
                    height="40"
                    className="h-7 w-auto sm:h-10"
                />
            </div>
            <nav className="ml-auto flex max-w-[50%] flex-col">
                <p className="mb-2 text-base text-gray-500 sm:mb-4 sm:text-lg">Get in touch:</p>
                <ul className="flex flex-wrap">
                    <li>
                        <a
                            href="https://www.linkedin.com/company/xeratic"
                            target="__blank"
                            className="h-6 w-6 p-2 text-gray-500"
                        >
                            <LinkedIn />
                        </a>
                    </li>
                    <li>
                        <a
                            href="https://www.instagram.com/xeratic.id"
                            target="__blank"
                            className="h-6 w-6 p-2 text-gray-500"
                        >
                            <Instagram />
                        </a>
                    </li>
                    <li>
                        <a
                            href="https://web.facebook.com/xeratic.id"
                            target="__blank"
                            className="h-6 w-6 p-2 text-gray-500"
                        >
                            <Facebook />
                        </a>
                    </li>
                    <li>
                        <a
                            href="tel:622129871636"
                            target="__blank"
                            className="h-6 w-6 p-2 text-gray-500"
                        >
                            <Phone />
                        </a>
                    </li>
                    <li>
                        <a
                            href="mailto:info@xeratic.com"
                            target="__blank"
                            className="h-6 w-6 p-2 text-gray-500"
                        >
                            <Mail />
                        </a>
                    </li>
                </ul>
            </nav>
        </footer>
    );
}

export default App;
