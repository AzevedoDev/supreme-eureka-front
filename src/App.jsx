import results from './results.json';
import { useRef, useEffect } from 'react';
import './App.css';
function App() {
  const refDuel = useRef();
  useEffect(() => {
    function goToDuel() {
      if (refDuel.current) {
        refDuel.current.scrollIntoView({ behavior: 'smooth' });
      }
    }
    if (window.location.hash.includes('#position')) {
      goToDuel();
    }
  }, []);
  return (
    <div className="w-full h-auto bg-slate-400 flex flex-col items-center">
      <header className="App-header">
        <h1 className="">Supreme Eureka Front</h1>
      </header>
      <div>
        {results.map(
          ({
            position,
            username,
            rating,
            matches,
            wins,
            loses,
            lastUpdate,
          }) => {
            const totalMatches = Number(wins) + Number(loses);
            const winPercentage = (Number(wins) / totalMatches) * 100;
            refDuel.current = `#position-${position}`;
            return (
              <div
                ref={refDuel}
                id={`position-${position}`}
                key={Math.random()}
                className="py-2 px-2 bg-white rounded-lg my-4"
              >
                <div className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <h2
                    className="px-6 py-4 font-medium text-lg text-gray-900 dark:text-white whitespace-nowrap cursor-pointer"
                    onClick={() => {
                      const location = `${window.location.hostname}/#position-${position}`;
                      navigator.clipboard.writeText(location);
                    }}
                  >{`${position} - ${username}`}</h2>
                  <div className="flex w-full justify-evenly">
                    <p className="px-6 font-medium text-lg text-gray-900 dark:text-white">
                      Rating: {rating}
                    </p>
                    <p className="px-6 font-medium text-lg text-gray-900 dark:text-white">
                      Win rate: {winPercentage.toFixed(1)}%
                    </p>
                    <p className="px-6 font-medium text-lg text-gray-900 dark:text-white">
                      Wins: {wins}
                    </p>
                    <p className="px-6 font-medium text-lg text-gray-900 dark:text-white">
                      Loses: {loses}
                    </p>
                    <p className="px-6 font-medium text-lg text-gray-900 dark:text-white">
                      Last Update: {new Date(lastUpdate).toLocaleDateString()}
                    </p>
                  </div>
                  <p className="px-6 py-4 font-medium text-lg text-gray-900 dark:text-white flex justify-center">
                    Replays
                  </p>
                </div>
                <table className="w-full table- text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr className="content-center">
                      <th scope="col" className="px-6 py-3">
                        Opponent
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Player Deck
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Opponent Deck
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Duration
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Result
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Game Type
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Replay
                      </th>
                    </tr>
                  </thead>
                  {matches.map(
                    (
                      {
                        opponent,
                        opponentDeck,
                        result,
                        type,
                        replay,
                        date,
                        duration,
                        playerDeck,
                      },
                      index
                    ) => {
                      return (
                        <tbody
                          key={index}
                          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                        >
                          <td
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap "
                          >
                            {opponent}
                          </td>
                          <td className="px-6 py-4">{playerDeck}</td>
                          <td className="px-6 py-4">{opponentDeck}</td>
                          <td className="px-6 py-4">{duration}</td>
                          <td
                            className={`px-6 py-4 ${
                              result === 'LOST'
                                ? 'text-red-500'
                                : 'text-green-400'
                            }`}
                          >
                            {result}
                          </td>
                          <td className="px-6 py-4">{type}</td>
                          <td className="px-6 py-4">{date}</td>
                          <td>
                            <a
                              href={replay}
                              className="bg-slate-600 border-1 text-white w-48 h-12 p-2 rounded-full hover:bg-slate-700"
                              target={'_blank'}
                            >
                              Go to duel
                            </a>
                          </td>
                        </tbody>
                      );
                    }
                  )}
                </table>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
}

export default App;
