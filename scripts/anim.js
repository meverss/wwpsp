const notes = document.querySelectorAll(".box");

function triggerAnimation(entries) {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			entry.target.classList.remove("animate__animated", "animate__fadeOut", "hide");
			entry.target.classList.add("animate__animated", "animate__fadeIn", "show");
			// obBoxes.unobserve(entry.target);
		} else {
			entry.target.classList.remove("animate__animated", "animate__fadeIn", "show");
			entry.target.classList.add("animate__animated", "animate__fadeOut", "hide");
		}
	});
}

// function playVideo(entries) {
// 	if (entries[0].isIntersecting) {
// 		video.classList.add("animate__animated", "animate__fadeIn");
// 		video.play();
// 		obVideo.unobserve(video);
// 	} else {
// 		video.classList.remove("animate__animated", "animate__fadeIn");
// 		video.pause();
// 	}
// }

const options = {
	root: null,
	rootMargin: "-150px",
	//threshold: .5
};

const obBoxes = new IntersectionObserver(triggerAnimation, options);

notes.forEach((note) => {
	obBoxes.observe(note);
});
