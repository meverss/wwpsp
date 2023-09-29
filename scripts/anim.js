const notes = document.querySelectorAll('.box');

function triggerAnimation(entries){
  entries.forEach(entry =>{
    if(entry.isIntersecting){
        entry.target.classList.add('show', 'animate__animated', 'animate__fadeIn');
        obBoxes.unobserve(entry.target);
        setTimeout(function(){entry.target.classList.remove('animate__animated', 'animate__fadeIn');}, 1500);
    }
  })  
}

function playVideo(entries){
    if (entries[0].isIntersecting){
        video.classList.add('animate__animated', 'animate__bounceIn');
        video.play();
        obVideo.unobserve(video);
    } else {
        video.classList.remove('animate__animated', 'animate__bounceIn');
        video.pause();
    }
}

const options={
    root: null,
    rootMargin: '-180px',
    //threshold: .2
}

const obBoxes = new IntersectionObserver(triggerAnimation, options);

notes.forEach(note =>{
    obBoxes.observe(note);
})

