'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

export default function NavBar() {
  const { data: session, status } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    signOut({ callbackUrl: '/' });
  };

  const isLoading = status === 'loading';
  const isAuthenticated = status === 'authenticated';

  return (
    <nav className="bg-white text-black p-4 border-b-0 shadow-lg sticky top-0 z-40">
      <div className="flex justify-between items-center relative">
        {/* Logo */}
        <Link href="/" aria-label="Go to homepage">
          <div className="p-2 rounded-full cursor-pointer transition duration-200">
            <Image src="/assets/logo.png" alt="Football Stats logo" width={70} height={70} />
          </div>
        </Link>

        {/* Hamburger */}
        <button
          className="md:hidden p-2 rounded focus:outline-none z-50"
          onClick={() => setIsMenuOpen(true)}
        >
          <span className="text-2xl">☰</span>
        </button>

        <ul className="hidden md:flex items-center space-x-4">
          {!isLoading && (
            <>
              <li>
                <Link href="/about-us" className="">
                  About us
                </Link>
              </li>

              {isAuthenticated ? (
                <>
                  <li>
                    <Link href="/dashboard" className="">
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <button className="text-red-500 hover:cursor-pointer" onClick={handleLogout}>
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link href="/login" className="">
                      Log In
                    </Link>
                  </li>
                  <li>
                    <Link href="/register" className="">
                      Register
                    </Link>
                  </li>
                </>
              )}

              {/* <li>
                <Link href="/" aria-label="Change language">
                  <div className="p-2 rounded-full cursor-pointer transition duration-200">
                    <Image
                      src="/assets/globe-icon.svg"
                      alt="Language selector"
                      width={20}
                      height={20}
                    />
                  </div>
                </Link>
              </li> */}
            </>
          )}
        </ul>

        {/* Mobile Overlay Menu */}
        {isMenuOpen && (
          <div className="fixed top-0 right-0 w-[90%] h-screen bg-white z-50 shadow-lg">
            {/* Close button */}
            <div className="flex justify-end p-4">
              <button
                className="text-2xl text-gray-800 hover:text-black"
                onClick={() => setIsMenuOpen(false)}
                aria-label="Close menu"
              >
                ✖
              </button>
            </div>

            <div className="flex flex-col items-center space-y-6 px-6 mt-4">
              {!isLoading && (
                <>
                  <Link href="/about-us" onClick={() => setIsMenuOpen(false)}>
                    About us
                  </Link>

                  {isAuthenticated ? (
                    <>
                      <Link href="/dashboard" onClick={() => setIsMenuOpen(false)}>
                        Dashboard
                      </Link>
                      <button
                        className="text-red-500"
                        onClick={() => {
                          setIsMenuOpen(false);
                          handleLogout();
                        }}
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                        Log In
                      </Link>
                      <Link href="/register" onClick={() => setIsMenuOpen(false)}>
                        Register
                      </Link>
                    </>
                  )}

                  {/* <Link href="/" onClick={() => setIsMenuOpen(false)}>
                    <div className="flex items-center gap-2">
                      <Image
                        src="/assets/globe-icon.svg"
                        alt="Language selector"
                        width={20}
                        height={20}
                      />
                      <span>Language</span>
                    </div>
                  </Link> */}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
