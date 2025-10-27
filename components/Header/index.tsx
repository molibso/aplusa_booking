"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";

import ThemeToggler from "./ThemeToggler";
import menuData from "./menuData";

const Header = () => {
  const [navigationOpen, setNavigationOpen] = useState(false);
  const [dropdownToggler, setDropdownToggler] = useState(false);
  const [stickyMenu, setStickyMenu] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // Sticky menu
  const handleStickyMenu = () => {
    if (window.scrollY >= 80) {
      setStickyMenu(true);
    } else {
      setStickyMenu(false);
    }
  };

  // Check session storage for admin statuss
  useEffect(() => {
    const admin = sessionStorage.getItem("admin");
    if (admin === "true") {
      setIsAdmin(true);
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.clear();
    window.location.href = "/";
  };
    useEffect(() => {
    window.addEventListener("scroll", handleStickyMenu);
    return () => {
      window.removeEventListener("scroll", handleStickyMenu);
    };
  }, []);

  return (
    <header
    id="header-section"
      className={`fixed left-0 top-0 z-99999 w-full py-7 ${
        stickyMenu
          ? "bg-white !py-4 shadow transition duration-100 dark:bg-black"
          : ""
      }`}
    >
      <div className="relative mx-auto max-w-c-1390 items-center justify-between px-4 md:px-8 xl:flex 2xl:px-0"               
      > 
        <div className="flex w-full items-center justify-between xl:w-1/4">
        <a href="/">
       <Image
         src="/images/logo/logo-dark.png"         alt="logo"
         width={220}
         height={120}
         className="object-contain"
        />
     </a>
        
          {/* Hamburger Toggle BTN */}
          <button
            aria-label="hamburger Toggler"
            className="block xl:hidden"
            onClick={() => setNavigationOpen(!navigationOpen)}
          >
            <span className="relative block h-5.5 w-5.5 cursor-pointer">
              <span className="absolute right-0 block h-full w-full">
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 rounded-sm bg-black delay-[0] duration-200 ease-in-out dark:bg-white ${
                    !navigationOpen ? "!w-full delay-300" : "w-0"
                  }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 rounded-sm bg-black delay-150 duration-200 ease-in-out dark:bg-white ${
                    !navigationOpen ? "delay-400 !w-full" : "w-0"
                  }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 rounded-sm bg-black delay-200 duration-200 ease-in-out dark:bg-white ${
                    !navigationOpen ? "!w-full delay-500" : "w-0"
                  }`}
                ></span>
              </span>
              <span className="du-block absolute right-0 h-full w-full rotate-45">
                <span
                  className={`absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-black delay-300 duration-200 ease-in-out dark:bg-white ${
                    !navigationOpen ? "!h-0 delay-[0]" : "h-full"
                  }`}
                ></span>
                <span
                  className={`delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-black duration-200 ease-in-out dark:bg-white ${
                    !navigationOpen ? "!h-0 delay-200" : "h-0.5"
                  }`}
                ></span>
              </span>
            </span>
          </button>
          {/* Hamburger Toggle BTN */}
        </div>

        {/* Nav Menu Start */}
        <div
          className={`invisible h-0 w-full items-center justify-between xl:visible xl:flex xl:h-auto xl:w-full ${
            navigationOpen &&
            "navbar !visible mt-4 h-auto max-h-[400px] rounded-md bg-white p-7.5 shadow-solid-5 dark:bg-blacksection xl:h-auto xl:p-0 xl:shadow-none xl:dark:bg-transparent"
          }`}
        >
          {/* Navigation Menu Items */}
          <nav className="flex flex-col xl:flex-row xl:items-center xl:space-x-6">
            {menuData.map((menuItem) => (
              <Link
                key={menuItem.id}
                href={menuItem.path || "#"}
                className={`text-base font-medium text-black hover:text-primary dark:text-white dark:hover:text-primary whitespace-nowrap ${
                  navigationOpen ? "mb-4 xl:mb-0" : ""
                }`}
                onClick={() => setNavigationOpen(false)}
              >
                {menuItem.title}
              </Link>
            ))}
          </nav>

          <div className="mt-7 flex w-full items-center justify-end xl:mt-0">
            <Image
              src="/images/AplusA.jpg"
              alt="A+A Logo"
              width={260}
              height={95}
              className="ml-auto h-8 w-auto object-contain sm:h-10 md:h-12 lg:h-14 xl:h-20"
              priority
            />
          </div>
        </div>
      </div>
    </header>
  );
};

// w-full delay-300

export default Header;
