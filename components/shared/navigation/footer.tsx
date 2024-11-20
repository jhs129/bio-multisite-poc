import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-primaryDark text-primaryLight py-5 text-center">
            <div className="max-w-6xl mx-auto px-4">
                <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
                <nav>
                    <ul className="list-none p-0 flex justify-center mt-2">
                        <li className="mx-2"><a href="/about" className="hover:underline">About</a></li>
                        <li className="mx-2"><a href="/contact" className="hover:underline">Contact</a></li>
                        <li className="mx-2"><a href="/privacy" className="hover:underline">Privacy Policy</a></li>
                    </ul>
                </nav>
            </div>
        </footer>
    );
};

export default Footer;
