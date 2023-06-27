type SidebarButtonProps = {
  href: string,
  title: string,
}

const SidebarButton = (props: SidebarButtonProps) => {
  const {href, title} = props;
  return (
    <a href={href} className="flex items-center px-3 py-1 text-gray-900 dark:text-white hover:font-bold">
      <span className="ml-3 text-bold">{title}</span>
    </a>
  );
}

const Sidebar = () => {
  return (
    <aside id="Sidebar" className="fixed right-0 md:right-24 lg:right-12 xl:right-24 top-1/4 h-min my-4 transition-transform sm:translate-x-0 translate-x-full" aria-label="Sidebar">
      <div className="h-min overflow-y-auto">
          <ul className="space-y-2 font-medium">
            <li><SidebarButton href={"#사용법"} title={"사용법"} /></li>
            <li><SidebarButton href={"#명령어"} title={"명령어"} /></li>
            <li><SidebarButton href={"#노래명령어"} title={"노래명령어"} /></li>
            <li><SidebarButton href={"#개발환경"} title={"개발환경"} /></li>
          </ul>
      </div>
    </aside>
  );
}

export default Sidebar;