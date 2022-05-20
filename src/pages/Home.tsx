import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export function Home() {
  const url = "https://quote-garden.herokuapp.com/api/v3/quotes/random";
  //   const [quotes, setQuotes] = useState<Quote[]>([]);
  const [randomQuoteText, setRandomQuoteText] = useState<string>();
  const [randomQuoteAuthor, setRandomQuoteAuthor] = useState<string>();
  const [randomQuoteGenre, setRandomQuoteGenre] = useState<string>();
  const [defaultAuthorNameStyle, setDefaultAuthorNameStyle] = useState(
    "text-base text-gray-700 w-full h-full font-bold"
  );

  async function getRandomQuote() {
    const response = await fetch(url);
    const random_quote = await response.json();
    setRandomQuoteText(random_quote.data[0].quoteText);
    setRandomQuoteAuthor(random_quote.data[0].quoteAuthor);
    setRandomQuoteGenre(random_quote.data[0].quoteGenre);
  }

  useEffect(() => {
    getRandomQuote();
  }, []);

  function handleHover() {
    setDefaultAuthorNameStyle("text-base text-white w-full h-full font-bold");
  }

  function handleMouseLeave() {
    setDefaultAuthorNameStyle(
      "text-base text-gray-700 w-full h-full font-bold"
    );
  }

  return (
    <div className="">
      <div className="flex justify-end">
        <div className="flex justify-center items-center my-10 mx-36">
          <button className="mr-2" onClick={() => getRandomQuote()}>
            random
          </button>
          <span className="material-icons text-base">autorenew</span>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="flex flex-col w-1/2 justify-center items-center">
          <div className="flex w-full py-10 px-20 border-l-4 border-yellow-300">
            <p className="text-xl w-2/3">“{randomQuoteText}”</p>
          </div>
          <div
            className="w-4/5 p-10 mt-10 hover:bg-zinc-800 hover:cursor-pointer hover:text-white"
            onMouseOver={handleHover}
            onMouseLeave={handleMouseLeave}
          >
            <Link to={`/author/${randomQuoteAuthor}`}>
              <div className="flex justify-between ">
                <div className="flex flex-col">
                  <span className={defaultAuthorNameStyle}>
                    {randomQuoteAuthor}
                  </span>
                  <span className="text-xs text-gray-400 mt-2">
                    {randomQuoteGenre}
                  </span>
                </div>
                <span className="material-icons text-white">arrow_forward</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
