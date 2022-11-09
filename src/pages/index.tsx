import { type NextPage } from "next";

import { useEffect, useState } from "react";

const Home: NextPage = () => {
  const [color, setColor] = useState<string[]>([
    "#000000",
    "#000000",
    "#000000",
  ]);

  const [result, setResult] = useState<Result | undefined>(undefined);
  const [divColor, setDivColor] = useState<string | undefined>("#000000");

  enum Result {
    Correct,
    Wrong,
  }

  const hexGenerator = () => {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
  };

  const handleClick = (hex: string | undefined) => {
    if (hex === divColor) {
      setColor([hexGenerator(), hexGenerator(), hexGenerator()]);
      setDivColor(color[Math.floor(Math.random() * 3)]);
      setResult(Result.Correct);
    } else {
      setResult(Result.Wrong);
    }
  };

  useEffect(() => {
    setColor([hexGenerator(), hexGenerator(), hexGenerator()]);
  }, []);

  useEffect(() => {
    setDivColor(color[Math.floor(Math.random() * 3)]);
  }, [color]);

  return (
    <>
      <main className="container mx-auto flex min-h-screen flex-col items-center justify-center p-4">
        <h1 className="text-4xl font-bold">Guess the color</h1>
        <div
          className={`m-4 h-40 w-40 rounded-lg`}
          style={{ background: divColor }}
        ></div>
        <div className="flex flex-row">
          {color.map((hex) => (
            <>
              <button
                className="mx-5 rounded border bg-blue-200 p-3"
                onClick={() => handleClick(hex)}
              >
                {hex}
              </button>
            </>
          ))}
        </div>
        {result === Result.Correct && (
          <p className="text-green-500">Correct!</p>
        )}
        {result === Result.Wrong && (
          <p className="text-red-500">Incorrect! Guess again.</p>
        )}
      </main>
    </>
  );
};

export default Home;
