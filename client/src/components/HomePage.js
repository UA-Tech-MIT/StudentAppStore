import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      <h1>UA App Store</h1>

      <h2>Getting started</h2>
      <ul>
        <li>Review the documentation on <a href="https://github.com/yaatehr/mit-apps">Github</a> </li>
        <li>Remember to git checkout master, git pull, git checkout - to update your repo</li>
        <li>NOTE: please DO NOT COMMIT directly to master</li>
        <li>Make your own branch to work in with git checkout -b myBranchName</li>
      </ul>
    </div>
  );
};

export default HomePage;
