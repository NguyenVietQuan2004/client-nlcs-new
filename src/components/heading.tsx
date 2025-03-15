interface HeadingProps {
  title: string;
  description: string;
}

function Heading({ title, description }: HeadingProps) {
  return (
    <div className="flex flex-col mr-1 ">
      <h2 className="font-bold text-2xl mb-1">{title}</h2>
      <div>{description}</div>
    </div>
  );
}

export default Heading;
