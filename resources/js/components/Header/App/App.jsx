import './style.css';
import React from 'react';
import Str from '@/utilities/StringHelper';

function App(props) {
    const { className, ...attrs } = props;

    return (
        <header
            {...attrs}
            className={Str.joinClassName('header-app-component', className)}
        >
            <nav className="flex h-10 w-full">
                <ul className="flex h-full w-full items-center text-base">
                    <li>
                        <a
                            href="#"
                            className="font-semibold text-primary-main"
                        >
                            {/* Application */}
                        </a>
                    </li>
                    {/* <li>
                        <a href="#" className="font-semibold text-gray-600">
                            Dashboard
                        </a>
                    </li> */}
                    <li className="ml-auto">
                        <ul className="menu lg:menu-horizontal">
                            <li>
                                <details>
                                    <summary>
                                        <button
                                            className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-accent text-sm font-bold !text-white bg-primary"
                                        >
                                            {/* <img src="" alt=" " /> */}
                                            A
                                        </button>
                                    </summary>
                                    <ul className="w-40 right-0 z-50">
                                        <li>
                                            <a className="text-red-600" href="/sign-out">
                                                Sign Out
                                            </a>
                                        </li>
                                    </ul>
                                </details>
                            </li>
                        </ul>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default App;
