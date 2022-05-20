import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Quote } from "../components/QuoteType";

export function Author() {
  const url =
    "https://quote-garden.herokuapp.com/api/v3/quotes?author=Bill Gates";
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [defaultAuthorNameStyle, setDefaultAuthorNameStyle] = useState(
    "text-base text-gray-700 w-full h-full font-bold"
  );

  const { authorName } = useParams();

  async function getAuthorQuotes() {
    const response = await fetch(url);
    const random_quote = await response.json();
    setQuotes(random_quote.data);
  }

  useEffect(() => {
    getAuthorQuotes();
  }, []);

  return (
    <div className="">
      <div className="flex justify-end">
        <div className="flex justify-center items-center my-10 mx-36">
          <button className="mr-2">random</button>
          <span className="material-icons text-base">autorenew</span>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center">
        <span className="mb-16 font-bold text-xl">Bill Gates {authorName}</span>
        {quotes.map((quote) => {
          return (
            <div className="w-full flex justify-center mb-10">
              <div className="flex flex-col w-2/5 justify-center items-center">
                <div className="flex w-full py-10 px-16 border-l-4 border-yellow-300">
                  <p className="text-xl w-full">“{quote.quoteText}”</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
