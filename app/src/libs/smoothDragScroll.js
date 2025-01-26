export const smoothDragScroll = (element, direction)=> {

  // Touch scroll
  let touchstartX
  let touchstartY
  let touchendX
  let touchendY
  let touches
  
  // Global variables
  const gap = Number(getComputedStyle(element).gap.split('px')[0])
  const width = Number(getComputedStyle(element.firstChild).width.split('px')[0])
  const height = Number(getComputedStyle(element.firstChild).height.split('px')[0])
  const slideH = width + gap
  const slideV = height + gap

  // Create frame and make it scrollable
  const div = document.createElement("div")

  div.id = 'team_frame'
  div.style.position = 'absolute'
  div.style.width = '100%'
  div.style.height = '280px'
  div.style.left = '0'
  div.style.borderLeft = '10px solid var(--background-body)'
  div.style.borderRight = '10px solid var(--background-body)'
  div.style.zIndex = '99'
  
  element.appendChild(div)
  
  // Touch events  
  div.addEventListener('touchstart', (e)=> {
  e.preventDefault()
    touchstartX = e.changedTouches[0].screenX
    touchstartY = e.changedTouches[0].screenY
  }, false)

  div.addEventListener('touchend', (e)=> {
    touchendX = e.changedTouches[0].screenX
    touchendY = e.changedTouches[0].screenY
    handleGesture()
  }, false)

  div.addEventListener('touchcancel', (e)=> {
    touchendX = e.changedTouches[0].screenX
    touchendY = e.changedTouches[0].screenY
    handleGesture()
  }, false)

  element.addEventListener('touchstart', (e)=> {
	e.preventDefault()
    touchstartX = e.changedTouches[0].screenX
    touchstartY = e.changedTouches[0].screenY
  }, false)

  element.addEventListener('touchend', (e)=> {
    touchendX = e.changedTouches[0].screenX
    touchendY = e.changedTouches[0].screenY
    handleGesture()
  }, false)
  
  element.addEventListener('touchcancel', (e)=> {
    touchendX = e.changedTouches[0].screenX
    touchendY = e.changedTouches[0].screenY
    handleGesture()
  }, false)


  const reset = ()=> {
	return
  }
  
  
  const handleGesture = ()=> {
	const scrollV = ()=> {
	  element.parentElement.parentElement.scrollBy({top: -(Math.round(touchendY - touchstartY) * 3), behavior: 'smooth'})
	}
	
	switch(direction){
	  case 'horizontal':
		if(Math.abs(touchendY - touchstartY) >= 30) scrollV()
		if(Math.abs(touchendX - touchstartX) <= 10) return

  		if (touchendX < touchstartX) {
  		  setTimeout(()=>{
    		element.scrollTo({left: element.scrollLeft + slideH})
    		element.removeEventListener('touchstart', reset)
    		element.removeEventListener('touchend', reset)
  		  },10)
  		}

  		if (touchendX > touchstartX) {
  		  setTimeout(()=> {
    		element.scrollTo({left: element.scrollLeft - slideH})
    		element.removeEventListener('touchstart', reset)
    		element.removeEventListener('touchend', reset)
  		  },10)
  		}

		break
	  case 'vertical':
		if(Math.abs(touchendX - touchstartX) >= 20) return
		if(Math.abs(touchendY - touchstartY) <= 10) return

  		if (touchendY < touchstartY) {
    	  //element.scrollBy({top: -200})
  		}

  		if (touchendY > touchstartY) {
    	  //element.scrollBy({top: -200})
  		}

		break
	  }
	}


  // Mouse scroll
    let isDown = false
    let startX
    let scrollLeft

    element.addEventListener('mousedown', (e)=>{
  	  e.preventDefault()
  	  element.style.cursor = 'pointer'
      isDown = true
      startX = e.pageX - element.offsetLeft
      scrollLeft = element.scrollLeft
    })

    element.addEventListener('mouseleave', ()=>{
      isDown = false
    })

    element.addEventListener('mouseup', ()=>{
      isDown = false
    })

    element.addEventListener('mousemove', (e)=>{
	  if(!isDown) return
	  e.preventDefault()
	  const x = e.pageX - element.offsetLeft
	  const move = (x - startX) * 3
	  element.scrollLeft = scrollLeft - move
    })
}