type HeaderProps ={
  dir:string,
  title:string
}

export const Header = (props:HeaderProps) => {
  const {dir, title}=props;
  return (
    <section className={`bg-[100px] lg:bg-[400px] bg-contain bg-no-repeat ${dir} bg-blue-300 bg-blend-multiply`}>
      <div className="px-4 mx-24 lg:mx-96 max-w-screen-xl text-right py-12">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">
        {title}
        </h1>
      </div>
    </section>
  );
}

export default Header;