import results from './results-1648956529971.json';
function App() {
  console.table(results);
  return (
    <div className="App">
      <header className="App-header">
        <h1>Supreme Eureka Front</h1>
      </header>
      <div className="App-body">
        {results.map(({ position, username, rating, matches }) => {
          return (
            <div key={position}>
              <h2>{`${position} - ${username}`}</h2>
              <p>Rating: {rating}</p>
              <ul>
                {matches.map(
                  ({ opponent, opponentDeck, result, type, replay }) => {
                    return (
                      <li>
                        <p>{opponent}</p>
                        <p>{opponentDeck}</p>
                        <p>{result}</p>
                        <p>{type}</p>
                        <a href={replay}>replay</a>
                      </li>
                    );
                  }
                )}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
