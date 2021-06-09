// const sliderEles    = document.getElementsByClassName('slider-container');
  // let sliderDataList  =[];
  // for(var index = 0; index < sliderEles.length; ++index)
  // {
  //     let scollViews  = sliderEles[index].getElementsByClassName('drag-scrollview');
  //     let leftArrows  = sliderEles[index].getElementsByClassName('arrowbutton-l');
  //     let rightArrows = sliderEles[index].getElementsByClassName('arrowbutton-r');
  //     let data        = {
  //       parentObject: sliderEles[index],
  //       scrollView: scrollViews.length  > 0 ? scrollViews[0] : undefined,
  //       arrowLeft: leftArrows.length    > 0 ? leftArrows[0] :undefined,
  //       arrowRight: rightArrows.length  > 0 ? rightArrows[0] :undefined,
  //     }
  //     sliderDataList.push(data);
  // }

  let pos           = { top: 0, left: 0, x: 0, y: 0 };
  const eles        = document.getElementsByClassName('drag-scrollview');
  let activeElement = undefined;

  const returnActiveElement = function(x, y){
    for(var index = 0; index < eles.length; ++index)
    {
      const rect = eles[index].getBoundingClientRect();
      if(x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom)
      {
        return eles[index];
      }
    }
    return undefined;
  }

  const mouseDownHandler = function(e) {
    activeElement = returnActiveElement(e.clientX, e.clientY);
    if(activeElement != undefined)
    {
      // Change the cursor and prevent user from selecting the text
      activeElement.style.cursor     = 'grabbing';
      activeElement.style.userSelect = 'none';
      pos = {
          // The current scroll 
          left: activeElement.scrollLeft,
          top: activeElement.scrollTop,
          // Get the current mouse position
          x: e.clientX,
          y: e.clientY,
      };
      document.addEventListener('mousemove', mouseMoveHandler);
      document.addEventListener('mouseup', mouseUpHandler);
    }
  };

  const mouseMoveHandler = function(e) {
    if(activeElement != undefined)
    {
      // How far the mouse has been moved
      const dx = e.clientX - pos.x;
      const dy = e.clientY - pos.y;

      // Scroll the element
      activeElement.scrollTop  = pos.top - dy;
      activeElement.scrollLeft = pos.left - dx;
    }
  };

  const mouseUpHandler = function() {
    if(activeElement != undefined)
    {
      activeElement.style.cursor = 'grab';
      activeElement.style.removeProperty('user-select');
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    }
  };
  
  document.addEventListener('mousedown', mouseDownHandler);
