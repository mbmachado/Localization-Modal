(() => {

  let selectedState;
  const isMobile = window.matchMedia('(max-width: 768px)').matches;
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


  if(!isMobile) {
    stateMapButtons.forEach(element => {
      element.addEventListener('click', event => {
        event.preventDefault();
  
        const state = event.target.closest('.state-map-btn').getAttribute('data-state');
        setSelectedState(state);
      });
      
      element.addEventListener('mouseover', toggleHoverOnNameBtn);
      element.addEventListener('mouseout', toggleHoverOnNameBtn);
    });
  }

  document.getElementById('stateConfirmationBtn')
          .addEventListener('click', preventModalDismissing);

  document.getElementById('localizationModalCloseBtn')
          .addEventListener('click', preventModalDismissing);

  function toggleHoverOnNameBtn(event) {
    const state = event.target.closest('.state-map-btn').getAttribute('data-state');
    const element = document.getElementById(state + 'nameBtn');
    
    toggleHoverOnElement(element);
  }

  function toggleHoverOnElement(element) {
    const currentClasses = element.getAttribute('class');
    
    element.setAttribute(
      'class',
      currentClasses.includes('hover')
        ? currentClasses.replace(' hover', '')
        : currentClasses + ' hover'
    );
  }

  function toggleHoverOnMapBtn(event) {
    const state = event.target.getAttribute('data-state');
    const element = document.getElementById(state + 'mapBtn');
    
    toggleHoverOnElement(element);
  }

  function setSelectedState(state) {
    if(selectedState && state !== selectedState) {
      const previousSelectedMapBtn = document.getElementById(selectedState + 'mapBtn');
      previousSelectedMapBtn.setAttribute(
        'class',
        previousSelectedMapBtn.getAttribute('class')
                              .replaceAll(' selected', '')
      );

      const previousSelectedNameBtn = document.getElementById(selectedState + 'nameBtn');
      previousSelectedNameBtn.setAttribute(
        'class',
        previousSelectedNameBtn.getAttribute('class')
                               .replaceAll(' selected', '')
      );
    }

    const selectedMapBtn = document.getElementById(state + 'mapBtn');
    selectedMapBtn.setAttribute('class', selectedMapBtn.getAttribute('class') + ' selected');

    const selectedNameBtn = document.getElementById(state + 'nameBtn');
    selectedNameBtn.setAttribute('class', selectedNameBtn.getAttribute('class') + ' selected');

    selectedState = state;
    enableConfirmationBtn();
  }

  function enableConfirmationBtn() {
    document.getElementById('stateConfirmationBtn').removeAttribute('disabled');
  }

  function preventModalDismissing(event) {
    if(!selectedState) {
      event.stopImmediatePropagation();

      window.alert('É preciso selecionar um estado primeiro.');
    }
  }

})();