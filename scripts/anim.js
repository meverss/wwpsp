const notes = document.querySelectorAll(".box");

function triggerAnimation(entries) {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			if(entry.target.id == 's_contact_us'){
				contactForm.children.namedItem('name').focus();
			}
			entry.target.classList.remove("animate__animated", "animate__fadeOut", "hide");
			entry.target.classList.add("animate__animated", "animate__fadeIn", "show");
		} else {
			entry.target.classList.remove("animate__animated", "animate__fadeIn", "show");
			entry.target.classList.add("animate__animated", "animate__fadeOut", "hide");
		}
	});
}

const options = {
	root: null,
	rootMargin: "-150px",
	//threshold: .5
};

const obBoxes = new IntersectionObserver(triggerAnimation, options);

notes.forEach((note) => {
	obBoxes.observe(note);
});
