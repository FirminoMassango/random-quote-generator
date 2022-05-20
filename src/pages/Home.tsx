import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { QuoteType } from "../helper/QuoteType";
import Footer from "../components/Footer";
import Quote from "../components/Quote";

export function Home() {
  const url = "https://quote-garden.herokuapp.com/api/v3/quotes/random";
  const [quotes, setQuotes] = useState<QuoteType[]>([]);
  const [defaultAuthorNameStyle, setDefaultAuthorNameStyle] = useState(
    "text-base text-gray-700 w-full h-full font-bold"
  );

  async function getRandomQuote() {
    const response = await fetch(url);
    const random_quote = await response.json();
    setQuotes(random_quote.data);
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
        {quotes.map((quote) => {
          return (
            <div className="flex flex-col w-4/5 md:w-1/2 justify-center items-center">
              <Quote quote={quote.quoteText} />
              <div
                className="w-4/5 p-10 mt-10 hover:bg-zinc-800 hover:cursor-pointer hover:text-white"
                onMouseOver={handleHover}
                onMouseLeave={handleMouseLeave}
              >
                <Link to={`/author/${quote.quoteAuthor}`}>
                  <div className="flex justify-between ">
                    <div className="flex flex-col">
                      <span className={defaultAuthorNameStyle}>
                        {quote.quoteAuthor}
                      </span>
                      <span className="text-xs text-gray-400 mt-2">
                        {quote.quoteGenre}
                      </span>
                    </div>
                    <span className="material-icons text-white">
                      arrow_forward
                    </span>
                  </div>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex justify-center">
        <Footer />
      </div>
    </div>
  );
}
