type BonmunProps = {
  title:string
  children: string|JSX.Element|Array<string|JSX.Element>
}

const Bonmun = (props: BonmunProps) => {
  const {children, title} = props;
  return (
    <div id={title} className="pt-12 pb-6">
      <h1 className="mb-4 text-2xl font-extrabold tracking-tight leading-none text-black md:text-3xl lg:text-4xl">
        {title}
      </h1>
      <p>
        {children}
      </p> 
    </div>
  );
}

export default Bonmun;
