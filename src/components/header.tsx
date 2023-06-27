type HeaderProps = {
  title:string
  dir?:string
}

export const Header = (props:HeaderProps) => {
  const {dir, title}=props;
  return (
    <section className={`bg-blue-300 bg-blend-multiply ${dir?`${dir} bg-center sm:bg-[100px] lg:bg-[200px] xl:bg-[300px] bg-contain bg-no-repeat`:``}`}>
      <div className={`py-12 px-4 mx-0 max-w-screen text-center ${dir? `sm:mx-24 lg:mx-48 xl:mx-96 sm:text-right`:``}`}>
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white lg:text-5xl">
          {title}
        </h1>
      </div>
    </section>
  );
}

export default Header;