function renderSplash () {
  const appEl = document.getElementById('app');
  appEl.innerHTML = `
  <style>
    #splash-container {
      text-align: center;
      font-family: 'Roboto', sans-serif;
    }
  </style>
  <div id="splash-container">
    <h1>my-table</h1>
    <p>loading...</p>
  </div>`;
}

export { renderSplash };
