import { useHashFragment } from './hooks/useHashFragment';
import { Octokit } from 'https://cdn.skypack.dev/@octokit/core';
import './App.css';
import { useEffect, useState } from 'react';
function App() {
  const [results, setResult] = useState([]);
  const octokit = new Octokit({
    auth: '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',
  });
  useHashFragment();
  useEffect(() => {
    octokit
      .request(
        'GET /repos/AzevedoDev/supreme-eureka/contents/data/results.json'
      )
      .then(({ data }) => data)
      .then((data) => {
        fetch(data.download_url)
          .then((res) => res.json())
          .then((data) => setResult(data));
      });
  }, []);
  return (
    <div className="bg-slate-400 flex flex-col items-center">
      <header className="App-header">
        <h1 className="">Supreme Eureka Front</h1>
      </header>
      <div className="lg:container max-w-full">
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
            return (
              <div
                id={`position-${position}`}
                key={Math.random()}
                className="lg:py-2 lg:px-2 px-1 py-1 bg-white rounded-lg my-4"
              >
                <div className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 overflow-x-auto w-full">
                  <h2
                    className="px-6 py-4 font-medium text-lg text-gray-900 dark:text-white whitespace-nowrap cursor-pointer"
                    onClick={() => {
                      const location = `${window.location.hostname}/#position-${position}`;
                      if (window.location.hostname === 'localhost') {
                        const locationLocalhost = `http://localhost:3000/#position-${position}`;
                        navigator.clipboard.writeText(locationLocalhost);
                      } else {
                        navigator.clipboard.writeText(location);
                      }
                    }}
                  >{`${position} - ${username}`}</h2>
                  <div className="flex w-full lg:justify-evenly lg:flex-row flex-col">
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
                <div className="overflow-x-auto lg:w-full">
                  <table className="text-sm text-left text-gray-500 dark:text-gray-400 overflow-hidden whitespace-nowrap w-full">
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
                            <td className="text-center">
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
              </div>
            );
          }
        )}
      </div>
    </div>
  );
}

export default App;
