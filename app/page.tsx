"use client";
// import { useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";

const quotes = [
  {
    quote: `"Because that’s what Hermione does.\n When in doubt, she goes to the library."`,
    by: "— Ron Weasley (Harry Potter)",
  },
  {
    quote: `"A mind needs books as a sword needs a whetstone,\n if it is to keep its edge."`,
    by: "— Tyrion Lannister (A Game of Thrones)",
  },
  {
    quote: `"A book is a dangerous thing.\n When you open one, you're letting your mind be taken over."`,
    by: "— Bene Gesserit (Dune)",
  },
];

export default function Home() {
  // const { data: session } = useSession();
  const [query, setQuery] = useState<string>("");

  const handleSearch = () => {
    redirect(`/books?search=${query}`);
  };

  const [fadeProp, setFadeProp] = useState<{ fade: string }>({
    fade: "fade-in",
  });
  const [currQuote, setCurrQuote] = useState<{
    quote: string;
    by: string;
    currIndex: number;
  }>({
    quote: quotes[0].quote,
    by: quotes[0].by,
    currIndex: 0,
  });

  useEffect(() => {
    const timeout = setTimeout(
      () => {
        if (fadeProp.fade === "fade-in") {
          setFadeProp({ fade: "fade-out" });
        } else {
          setFadeProp({ fade: "fade-in" });
          setCurrQuote((prev) => {
            const nextIndex = (prev.currIndex + 1) % quotes.length;
            return {
              quote: quotes[nextIndex].quote,
              by: quotes[nextIndex].by,
              currIndex: nextIndex,
            };
          });
        }
      },
      fadeProp.fade === "fade-in" ? 5000 : 1000 // 5s to stay, 1s to transition
    );

    return () => clearTimeout(timeout);
  }, [fadeProp]);

  return (
    <>
      <div className="flex flex-col h-[calc(100vh-80px)] lg:hidden">
        <div className="flex-1">
          <Image
            src={
              "https://i.pinimg.com/736x/42/50/48/425048d0efb3fe9e38dc2f503c6a70e2.jpg"
            }
            alt="home-img"
            width={500}
            height={500}
            className="h-48 w-full object-cover"
          />
        </div>
        <div className="flex flex-col flex-2 h-full justify-evenly">
          <div className={` py-2 px-4 ${fadeProp.fade}`}>
            <h1 className={`text-lg text-center font-semibold`}>
              {currQuote.quote}
            </h1>
            <h1 className="text-md text-right">{currQuote.by}</h1>
          </div>
          <div className="flex justify-center items-center">
            <input
              type="text"
              placeholder="Search Books..."
              className="px-2 py-1 rounded-l-md border-4 border-text !outline-none"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <button
              className="px-2 py-1 bg-text text-background rounded-r-md flex items-center"
              onClick={handleSearch}
            >
              <IoSearchOutline size={32} />
            </button>
          </div>
        </div>
      </div>
      <div className="py-10 px-36 hidden lg:block">
        <div className="flex justify-between gap-x-4">
          <div className="flex flex-col justify-evenly w-[60%]">
            <div className={` ${fadeProp.fade}`}>
              <h1 className={`text-2xl font-semibold`}>
                {currQuote.quote.split("\n").map((line, index) => (
                  <span key={index}>
                    {line}
                    <br />
                  </span>
                ))}
              </h1>
              <h1 className="text-lg text-right mt-2">{currQuote.by}</h1>
            </div>
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Search Books..."
                className="px-4 py-2 rounded-l-md border-4 border-text !outline-none"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
              <button
                className="px-4 py-2 bg-text text-background rounded-r-md flex items-center"
                onClick={handleSearch}
              >
                <IoSearchOutline size={32} />
              </button>
            </div>
          </div>
          <div>
            <Image
              src={
                "https://i.pinimg.com/736x/40/7d/20/407d2000fbb3bd88322ec8d73f731116.jpg"
              }
              alt="home-img"
              height={500}
              width={500}
              className="rounded-2xl w-96 object-cover"
            />
          </div>
        </div>
      </div>
    </>
  );
}
