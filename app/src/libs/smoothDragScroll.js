export const smoothDragScroll = (element)=> {

  // Touch scroll
  let touchstartX
  let touchstartY
  let touchendX
  let touchendY
    
  const gap = Number(getComputedStyle(element).gap.split('px')[0])
  const width = Number(getComputedStyle(element.firstChild).width.split('px')[0])
  const div = document.createElement("div")
  const sliderOffset = element.firstChild.offsetLeft
  
  div.id = 'team_card_reference'
  div.classList.add("team_card_reference")
  
  document.getElementById('s_our_team').appendChild(div)
  const slide = width + gap
  
  element.addEventListener('touchstart', (e)=> {
  e.preventDefault()
    touchstartX = e.changedTouches[0].screenX * 100
    //touchstartY = e.changedTouches[0].screenY
  }, false)

  element.addEventListener('touchend', (e)=> {
    touchendX = e.changedTouches[0].screenX * 100
    //touchendY = e.changedTouches[0].screenY
    handleGesture()
  }, false)

  const handleGesture = ()=> {
    if (touchendX < touchstartX) {
      element.scrollBy({left: slide})
      element.removeEventListener('touchstart', ()=> {alert('gjjd')})
//      element.removeEventListener('touchend', ()=> {return})
    }

    if (touchendX > touchstartX) {
      element.scrollBy({left: - slide})
      element.removeEventListener('touchstart', ()=> {return})
//      element.removeEventListener('touchend', ()=> {return})
    }

    if (touchendY < touchstartY) {
      //element.scrollBy({top: -200})
    }

    if (touchendY > touchstartY) {
      //element.scrollBy({top: -200})
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