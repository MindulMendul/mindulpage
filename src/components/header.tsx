type HeaderProps ={
  dir:string,
  title:string
}

export const Header = (props:HeaderProps) => {
  const {dir, title}=props;
  return (
    <section className={`max-sm:bg-[20px] sm:bg-[100px] lg:bg-[200px] xl:bg-[300px] bg-contain bg-no-repeat ${dir} bg-blue-300 bg-blend-multiply`}>
      <div className="px-4 max-sm:mx-0 mx-24 lg:mx-48 xl:mx-96 max-w-screen-xl max-md:text-center text-right py-12">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white lg:text-5xl">
          {title}
        </h1>
      </div>
    </section>
  );
}

export default Header;