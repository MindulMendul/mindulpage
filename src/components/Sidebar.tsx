type SidebarProps = {
  children: string|JSX.Element|Array<string|JSX.Element>
}

const Sidebar = (props: SidebarProps) => {
  const {children} = props;
  return (
    <aside id="Sidebar" className="fixed right-0 sm:right-8 md:right-24 lg:right-36 xl:right-60 top-1/4 h-min my-4 transition-transform sm:translate-x-0 translate-x-full" aria-label="Sidebar">
      <div className="h-min overflow-y-auto">
        <ul className="space-y-2 font-medium">
          {(children instanceof Array)?children.map((e:any, i:number)=>(<li key={i}>{e}</li>)):children}
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;