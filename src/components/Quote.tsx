function Quote(props: any) {
  return (
    <div className="flex w-full py-10 px-5 md:px-20 border-l-4 border-yellow-300">
      <p className="text-xl w-full">“{props.quote}”</p>
    </div>
  );
}

export default Quote;
