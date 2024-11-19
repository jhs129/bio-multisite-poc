import Link from 'next/link';

const Header = () => {
    return (
        <header className="bg-primaryDark text-primaryLight py-5 text-center">
            <nav>
                <ul className="list-none p-0 flex justify-center mt-2">
                    <li>
                        <Link href="/">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link href="/about">
                            About
                        </Link>
                    </li>
                    <li>
                        <Link href="/contact">
                            Contact
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;