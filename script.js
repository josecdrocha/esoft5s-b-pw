(() => {
    const getTimesVisited = () => {
      const timesVisitedJSON = localStorage.getItem('timesVisited');
      return timesVisitedJSON ? JSON.parse(timesVisitedJSON) : {
        count: 0,
        lastVisited: null,
      };
    };
  
    const updateTimesVisited = () => {
      let timesVisited = getTimesVisited();
      timesVisited.count++;
      timesVisited.lastVisited = new Intl.DateTimeFormat('pt-BR').format(new Date());
      localStorage.setItem('timesVisited', JSON.stringify(timesVisited));
      return timesVisited;
    };
  
    const displayTimesVisited = () => {
      const timesVisited = updateTimesVisited();
      const timesVisitedFooter = document.getElementById('times-visited');
      timesVisitedFooter.textContent = `Esta página foi visitada ${timesVisited.count} vezes. A última visita foi: ${timesVisited.lastVisited}`;
    };
  
    displayTimesVisited();
  })();
  