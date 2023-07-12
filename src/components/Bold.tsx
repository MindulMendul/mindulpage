

type BoldProps = {
  children: string|JSX.Element|Array<string|JSX.Element>
}

const Bold = (props: BoldProps) => {
  const {children} = props;
  return (
    <span className="text-xl font-bold">
      {children}
    </span>
  );
}

export default Bold;