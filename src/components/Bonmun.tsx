type Bonmun = {
  title:string,
  children: JSX.Element
}

const Bonmun = ({children, title}:any) => {
  return (
    <div id={title} className="pt-12 pb-6">
      <h1 className="mb-4 text-2xl font-extrabold tracking-tight leading-none text-black md:text-3xl lg:text-4xl">
        {title}
      </h1>
      {children} 
    </div>
  );
}

export default Bonmun;
