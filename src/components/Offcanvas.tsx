"use client"

import { Drawer } from "@material-tailwind/react";
import { useState } from "react";

type OffcanvasButtonProps = {
  href: string
  title: string
}

const OffcanvasButton = (props: OffcanvasButtonProps) => {
  const {href, title} = props;
  return (
    <a href={href} className="flex text-sm sm:text-lg md:text-2xl items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
      <span className="ml-3 text-bold">{title}</span>
    </a>
  );
}

const Offcanvas = () => {
  const [open, setOpen] = useState(false);
  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  return (
    <>
      <div className="fixed top-0 right-0 m-2 p-2 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" onClick={openDrawer} typeof="btn">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-10 h-10">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
      </div>
      <Drawer placement="right" open={open} onClose={closeDrawer} className="bg-blue-100">
        <div className="fixed top-0 m-2 p-2 text-sm text-gray-900 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" onClick={closeDrawer} typeof="btn">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-10 h-10">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <ul className="space-y-2 font-medium pt-24">
          <li><OffcanvasButton href={"/"} title={"Home"} /></li>
          <li><OffcanvasButton href={"/mindulbot"} title={"MindulBot"} /></li>
          <li><OffcanvasButton href={"/matilda"} title={"MATILDA"} /></li>
          <li><OffcanvasButton href={"/vi828583"} title={"VI-828583"} /></li>
          <li><OffcanvasButton href={"/slidepuzzle"} title={"Slide Puzzle"} /></li>
          <li><OffcanvasButton href={"/codingtest"} title={"Coding Test"} /></li>
        </ul>
      </Drawer>
    </>
  );
}

export default Offcanvas;