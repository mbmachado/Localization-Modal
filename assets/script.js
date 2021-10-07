(() => {

  let selectedState;
  const isMobile = window.matchMedia('(max-width: 600px)').matches;
  const stateNameButtons = document.querySelectorAll('.state-name-btn');
  const stateMapButtons = document.querySelectorAll('.state-map-btn');

  stateNameButtons.forEach(element => {
    element.addEventListener('click', event => {
      event.preventDefault();

      const state = event.target.getAttribute('data-state');
      setSelectedState(state);
    });

    element.addEventListener('mouseover', toggleHoverOnMapBtn);
    element.addEventListener('mouseout', toggleHoverOnMapBtn);
  });

  stateMapButtons.forEach(element => {
    element.addEventListener('click', event => {
      event.preventDefault();

      const state = event.target.closest('.state-map-btn').getAttribute('data-state');
      setSelectedState(state);
    });
    
    element.addEventListener('mouseover', toggleHoverOnNameBtn);
    element.addEventListener('mouseout', toggleHoverOnNameBtn);
  });

  function toggleHoverOnNameBtn(e) {
    const state = e.target.closest('.state-map-btn').getAttribute('data-state');
    const element = document.getElementById(state + 'nameBtn');
    
    toggleHoverOnElement(element);
  }

  function toggleHoverOnElement(element) {
    const currentClasses = element.getAttribute('class');
    
    element.setAttribute(
      'class',
      currentClasses.includes('hover')
        ?  currentClasses.replace('hover', '').replace(/\s+/g, ' ').trim()
        : currentClasses + ' hover'
    );
  }

  function toggleHoverOnMapBtn(e) {
    const state = e.target.getAttribute('data-state');
    const element = document.getElementById(state + 'mapBtn');
    
    toggleHoverOnElement(element);
  }

  function setSelectedState(state) {
    if(selectedState && state !== selectedState) {
      const previousSelectedMapBtn = document.getElementById(selectedState + 'mapBtn');
      previousSelectedMapBtn.setAttribute(
        'class',
        previousSelectedMapBtn.getAttribute('class')
                              .replace('selected', '')
                              .replace(/\s+/g, ' ').trim()
      );

      const previousSelectedNameBtn = document.getElementById(selectedState + 'nameBtn');
      previousSelectedNameBtn.setAttribute(
        'class',
        previousSelectedNameBtn.getAttribute('class')
                              .replace('selected', '')
                              .replace(/\s+/g, ' ').trim()
      );
    }

    const selectedMapBtn = document.getElementById(state + 'mapBtn');
    selectedMapBtn.setAttribute('class', selectedMapBtn.getAttribute('class') + ' selected');

    const selectedNameBtn = document.getElementById(state + 'nameBtn');
    selectedNameBtn.setAttribute('class', selectedNameBtn.getAttribute('class') + ' selected');

    selectedState = state;
  }

})();