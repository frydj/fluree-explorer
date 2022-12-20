(() => {
  // functions
  const logEach = (arr) => {
    for (const i in arr) {
      try {
        console.log(JSON.parse(arr[i].innerHTML));
      } catch (err) {
        console.log(err);
      }
    }
  };

  // add container to body
  const body = document.getElementsByTagName('body')[0];
  const head = document.getElementsByTagName('head')[0];

  let fluree_root = document.createElement('div');
  fluree_root.setAttribute('id', 'fluree-explorer-root');
  body.appendChild(fluree_root);

  let fluree_script = document.createElement('script');
  fluree_script.setAttribute('defer', 'defer');
  fluree_script.setAttribute('src', '/static/js/main.4b2133ec.js');
  fluree_script.setAttribute('type', 'module');

  head.appendChild(fluree_script);

  console.log(`
  fluree div should be added to DOM...
  fluree script should be added to DOM...
  `);

  // const fex_root = ReactDOM.createRoot(
  //   document.getElementById('fluree-explorer-root')
  // );
  // fex_root.render(
  //   <React.StrictMode>
  //     <Drawer />
  //   </React.StrictMode>
  // );

  // get JSON-LD element(s)
  let foundJson = document.querySelectorAll('[type="application/ld+json"]');
  logEach(foundJson);
})();
