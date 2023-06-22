"use client"

type NavBarButtonProps = {
  href: string,
  title: string,
  img?: string
}

const NavBarButton = (props: NavBarButtonProps) => {
  const {href, title, img} = props;
  return (
    <li>
      <a href={href} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
        {img?<img src={img} width="40px"/>:undefined}
        <span className="ml-3 text-bold">{title}</span>
      </a>
    </li>
  );
}

const NavBar = () => {
  return (
    <aside id="default-sidebar" className="w-96 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
      <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <NavBarButton href={"/"} title={"Home"} />
            <NavBarButton href={"/mindulbot"} title={"MindulBot"} img={"/img/mindul.png"}/>
            <NavBarButton href={"/matilda"} title={"Matilda"} img={"/img/matilda.png"}/>
            <NavBarButton href={"/vi828583"} title={"vi-828583"} />
            <NavBarButton href={"/slidepuzzle"} title={"Slide Puzzle"} />
            <NavBarButton href={"/forstudy"} title={"Study"} />
          </ul>
      </div>
    </aside>
  );
}

export default NavBar;