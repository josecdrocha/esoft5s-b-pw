(() => {
  /*
    timesVisited: {
      count: number,
      lastVisited: Date
    }
  */

  const getTimesVisited = () => {
    const storedData = localStorage.getItem('timesVisited');
    return storedData ? JSON.parse(storedData) : { count: 0, lastVisited: null };
  };

  const updateTimesVisited = (data) => {
    data.count++;
    data.lastVisited = new Intl.DateTimeFormat('pt-BR').format(new Date());
    localStorage.setItem('timesVisited', JSON.stringify(data));
    return data;
  };

  const displayTimesVisited = (data) => {
    const timesVisitedFooter = document.getElementById('times-visited');
    if (timesVisitedFooter) {
      timesVisitedFooter.textContent = "Esta página foi visitada ${data.count} vezes. A última visita foi: ${data.lastVisited}";
    }
  };

  let timesVisited = getTimesVisited();
  timesVisited = updateTimesVisited(timesVisited);
  displayTimesVisited(timesVisited);

})();