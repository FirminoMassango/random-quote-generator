import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { QuoteType } from "../helper/QuoteType";
import Footer from "../components/Footer";
import Quote from "../components/Quote";

export function Author() {
  const [quotes, setQuotes] = useState<QuoteType[]>([]);
  const { authorName } = useParams();
  const url = `https://quote-garden.herokuapp.com/api/v3/quotes?author=${authorName}`;

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
        <span className="mb-16 font-bold text-xl">{authorName}</span>
        {quotes.map((quote) => {
          return (
            <div key={quote._id} className="w-full flex justify-center mb-10">
              <div className="flex flex-col w-4/5 md:w-1/2 justify-center items-center">
                <Quote quote={quote.quoteText} />
              </div>
            </div>
          );
        })}
        <Footer />
      </div>
    </div>
  );
}
