type SidebarButtonProps = {
  title: string
}

const SidebarButton = (props: SidebarButtonProps) => {
  const {title} = props;
  return (
    <a href={`#${title}`} className="flex items-center px-3 py-1 text-gray-900 dark:text-white hover:font-bold">
      <span className="text-bold">{title}</span>
    </a>
  );
}

export default SidebarButton;