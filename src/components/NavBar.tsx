import Image from "next/image";

type NavBarButtonProps = {
  href: string,
  title: string,
  img?: string
}

const NavBarButton = (props: NavBarButtonProps) => {
  const {href, title, img} = props;
  return (
    <a href={href} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
      <span className="ml-3 text-bold">{title}</span>
    </a>
  );
}

const NavBar = () => {
  return (
    <aside id="navbar" className="fixed h-min z-0 top-1/4 left-full h-screen sm:w-[200px] transition-transform max-sm:translate-x-0 -translate-x-full" aria-label="Navbar">
      <div className="h-min px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <li><NavBarButton href={"/"} title={"Home"} /></li>
            <li><NavBarButton href={"/mindulbot"} title={"MindulBot"} img={"/img/mindul.png"}/></li>
            <li><NavBarButton href={"/matilda"} title={"Matilda"} img={"/img/matilda.png"}/></li>
            <li><NavBarButton href={"/vi828583"} title={"vi-828583"} /></li>
            <li><NavBarButton href={"/slidepuzzle"} title={"Slide Puzzle"} /></li>
            <li><NavBarButton href={"/forstudy"} title={"Study"} /></li>
          </ul>
      </div>
    </aside>
  );
}

export default NavBar;