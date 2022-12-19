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

  let roott = document.createElement('div');
  roott.setAttribute('id', 'roott');
  roott.innerHTML = 'hello whirl';

  body.appendChild(roott);

  // get JSON-LD element(s)
  let foundJson = document.querySelectorAll('[type="application/ld+json"]');
  logEach(foundJson);
})();
