import "./App.css";
import moment from "moment";
import { useEffect, useState } from "react";
import RepoList from "./component/RepoList";

function App() {
  const [repos, setRepos] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [perPage, setPerPage] = useState(30);
  const [page, setPage] = useState(1);
  const [period, setPeriod] = useState("1 month");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const sinceDate = moment().subtract(period, "days").format("YYYY-MM-DD");
    const url = `https://api.github.com/search/repositories?q=created:>${sinceDate}&sort=stars&order=desc&page=1&per_page=${perPage}`;
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        setRepos(data.items);
        setTotalCount(data.total_count);
        setPage(1);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [perPage, period]);

  function loadMore() {
    const nextPage = page + 1;
    const sinceDate = moment().subtract(period, "days").format("YYYY-MM-DD");
    const url = `https://api.github.com/search/repositories?q=created:>${sinceDate}&sort=stars&order=desc&page=${nextPage}&per_page=${perPage}`;
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        setRepos([...repos, ...data.items]);
        setPage(nextPage);
        setTotalCount(data.total_count);
      })
      .catch((error) => {
        setError(error.message);
      });
  }

  function handlePeriodChange(event) {
    setPeriod(event.target.value);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Github Trending Repositories</h1>
        <p>
          Showing {repos.length} of {totalCount} repositories created in the
          last {period} days.
        </p>
        <label>
          Period:
          <select value={period} onChange={handlePeriodChange}>
            <option value="7">1 week</option>
            <option value="14">2 weeks</option>
            <option value="30">1 month</option>
          </select>
        </label>
        {error && <p>Error: {error}</p>}
        <RepoList repo={repos} />
        {loading && <p>Loading...</p>}
        {!loading && totalCount > repos.length && (
          <button onClick={loadMore}>Load more</button>
        )}
      </header>
    </div>
  );
}

export default App;
