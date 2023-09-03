import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [urls, setUrls] = useState('');
  const [mergedNumbers, setMergedNumbers] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const handleUrlChange = (e) => {
    setUrls(e.target.value);
  };

  const fetchNumbers = () => {
    const urlArray = urls.split('\n').map((url) => url.trim());

    axios
      .get(`http://localhost:8008/numbers?${urlArray.map((url) => `url=${url}`).join('&')}`)
      .then((response) => {
        setMergedNumbers(response.data.numbers);
        setErrorMessage('');
      })
      .catch((error) => {
        setMergedNumbers([]);
        setErrorMessage('Error fetching numbers. Please check your URLs and try again.');
      });
  };

  return (
    <div>
      <h1>Number Management App</h1>
      <div>
        <textarea
          placeholder="Enter URLs (one per line)"
          rows="5"
          cols="50"
          value={urls}
          onChange={handleUrlChange}
        />
      </div>
      <button onClick={fetchNumbers}>Fetch Numbers</button>
      {errorMessage && <div>{errorMessage}</div>}
      <h2>Merged Numbers</h2>
      <ul>
        {mergedNumbers.map((number) => (
          <li key={number}>{number}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
