// GLOBAL VARIABLES

const contactForm = document.getElementById('contact_form');
const budgetForm = document.getElementById('budget_form');
const reviewForm = document.getElementById('review_form');

const dataForms = document.querySelectorAll('.form');
const frmField = document.querySelectorAll('.frm_text');
const frmMessage = document.querySelectorAll('.frm_message');
const btnSend = document.querySelectorAll('.form_btn');

const formContactName = document.getElementById("name");
const formContactEmail = document.getElementById("email");
const formContactSubject = document.getElementById("subj");
const formContactMessage = document.getElementById("message");

const formBudgetName = document.getElementById("br_name");
const formBudgetEmail = document.getElementById("br_email");
const formBudgetPhone = document.getElementById("br_phone");
const formBudgetMessage = document.getElementById("br_message");

const formReviewName = document.getElementById("rv_name");
const formReviewEmail = document.getElementById("rv_email");
const formReviewMessage = document.getElementById("rv_message");

const validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
const validPhone = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

const noti = document.getElementById('s_notifications');
const notiIcon = document.getElementById('ntf_icon');
const notiText = document.getElementById('ntf_text');

const headerHeight = document.getElementById('header_top').getBoundingClientRect().height;
const menuBarHeight = document.getElementById('menu_bar').getBoundingClientRect().height;

// SETTING CUSTOM DATE
const timestamp = Date.now();
const today = new Date(timestamp);
const yyyy = today.getFullYear();
let mm = today.getMonth() + 1; // Months start at 0!
let dd = today.getDate(); // prints the day of the month (1-31)
let hh = today.getHours(); // prints the hour (0-23)
let min = today.getMinutes(); // prints the minute (0-59)
let sec = today.getSeconds(); // prints the second (0-59)
if (dd < 10) dd = '0' + dd;
if (mm < 10) mm = '0' + mm;
if (hh < 10) hh = '0' + hh;
if (min < 10) min = '0' + min;
if (sec < 10) sec = '0' + sec;
const formattedDate = dd + '-' + mm + '-' + yyyy + '.' + hh + ':' + min + ':' + sec;

// SHOW WEBSITE AFTER LOADED

function show_page() {
	page_content.style.opacity = "1";
	page_loader.classList.add('animate__animated', 'animate__fadeOut');
	document.body.style.overflow = "auto";
	setTimeout(function () {
		page_loader.style.display = 'none';
	}, 1000)
}


// SACROLL TO SECTIONS

function scroll_to_section(section) {
	let element = document.getElementById(section);
	let position = element.offsetTop;
	window.scrollTo(0, position - 100);
}

function scroll_to_section_m(section_m) {
	let element = document.getElementById(section_m);
	let position = element.offsetTop;
	if (window.innerWidth < 850) {
		switch (section_m) {
			case "s_m_about_us":
				if (window.innerWidth >= 768) {
					window.scrollTo(0, position - 50);
					break;
				} else {
					window.scrollTo(0, position + 20);
					break;
				}
			case "s_m_services":
				if (window.innerWidth >= 768) {
					window.scrollTo(0, position - 80);
					break;
				} else {
					window.scrollTo(0, position + 10);
					break;
				}
			case "s_m_reviews":
				if (window.innerWidth >= 768) {
					window.scrollTo(0, position - 50);
					break;
				} else {
					window.scrollTo(0, position + 40);
					break;
				}
			case "s_m_our_team":
				window.scrollTo(0, position + 50);
				break;
			case "s_m_contact_us":
				window.scrollTo(0, position - 260);
				break;
			default:
				window.scrollTo(0, position - 50);
				break;
		}
	} else {
		window.scrollTo(0, position - 80);
	}
	m_menu_btn.innerHTML = '󰍜';
	m_menu.style["transform"] = "translate(100%)";

}

let menu = document.querySelectorAll(".menu_item");
let alt_menu = document.querySelectorAll(".m_menu_item");

menu.forEach((obj) => {
	let sec = obj.id;
	let section = 's_' + obj.id;
	if (obj.classList[1] != "m_menu_item") {
		if (obj.id != "") {
			obj.addEventListener("click", function () {
				scroll_to_section("s_" + sec);
			});
		}
	}
});

alt_menu.forEach((obj1) => {
	let sec = obj1.id;

	if (obj1 != "s_m_menu_open_btn") {
		obj1.addEventListener("click", function () {
			scroll_to_section_m("s_" + sec);
		});
	}
});

//COPYRIGHT

const fecha = new Date();
const copyright = "Copyright ©" + fecha.getFullYear() + " WWP SCREENING & PAINTING LLC.";
footer.innerHTML = copyright;

// SHARE ON SOCIAL MEDIA

const social_n = document.querySelectorAll(".social_item");
const my_website = encodeURIComponent(location.href);
const my_title = encodeURIComponent('WWP SCREENING & PAINTING LLC.');
const url_facebook =
	"http://www.facebook.com/sharer.php?u=" +
	my_website +
	"&t=" + my_title;
const url_twitter =
	"https://twitter.com/intent/tweet?url=" +
	my_website +
	"&text = " + my_title;
const url_telegram =
	"https://telegram.me/share/url?url=" +
	my_website +
	"&text = " + my_title;
const url_linkedin =
	"https://www.linkedin.com/shareArticle?mini=true&url=" + my_website;

social_n.forEach((item) => {
	item.addEventListener("click", function () {
		link = "url_" + item.id;
		window.open(eval(link), "", "width=720, height=480, toolbar=0, status=0, top=300, left=600");
	});
});

// FORM VALIDATION

function disableSendButton() {
	btnSend.forEach((btn) => {
		btn.disabled = true;
	})
}

function enableSendButton() {
	btnSend.forEach((btn) => {
		btn.disabled = false;
	})
}

disableSendButton();

// Form fields data-type

const fields = document.querySelectorAll(".frm_text");

fields.forEach((field) => {
	switch (field.id) {
		case "email":
			field.type = "email";
			break;
		case "email":
			field.type = "email";
			break;
		default:
			field.type = "text";
			break;
	}
});

frmField.forEach((e) => {

	const dataType = e.dataset.frminfo;

	switch (dataType) {
		case "name":
			e.addEventListener('focusout', () => {
				if (e.value.length < 2) {
					disableSendButton();
					e.classList.add("wrong", "animate__animated", "animate__shakeX");
					e.value = "";
					e.placeholder = "More than one character, please";
					setTimeout(() => {
						e.classList.remove("wrong", "animate__animated", "animate__shakeX");
					}, 1000);
					setTimeout(() => {
						e.placeholder = "Who is contacting us?";
					}, 3500);
				}

			})
			break;
		case "email":
			e.addEventListener('focusout', () => {
				if (!validEmail.test(e.value)) {
					disableSendButton();
					e.classList.add("wrong", "animate__animated", "animate__shakeX");
					e.value = "";
					e.placeholder = "Enter a valid e-mail address";
					setTimeout(() => {
						e.classList.remove("wrong", "animate__animated", "animate__shakeX");
					}, 1000);
					setTimeout(() => {
						e.placeholder = "your@email.here";
					}, 3500);
				}
			})
			break;
		case "phone":
			e.addEventListener('focusout', () => {
				if (!validPhone.test(e.value)) {
					disableSendButton();
					e.classList.add("wrong", "animate__animated", "animate__shakeX");
					e.value = "";
					e.placeholder = "Enter a valid phone number";
					setTimeout(() => {
						e.classList.remove("wrong", "animate__animated", "animate__shakeX");
					}, 1000);
					setTimeout(() => {
						e.placeholder = "Where can we call you?";
					}, 3500);
				}
			})
			break;
		case "message":
			dataForms.forEach((form) => {
				switch (form.id) {
					case "contact_form":
						e.addEventListener('focus', () => {
							if (formContactName.value != "" && formContactEmail.value != "") {
								enableSendButton();
							}
						})
						break;
					case "budget_form":
						e.addEventListener('focus', () => {
							if (formBudgetName.value != "" && formBudgetEmail.value != "" && formBudgetPhone.value != "") {
								enableSendButton();
							}
						})
						break;
					case "review_form":
						e.addEventListener('focus', () => {
							if (formReviewName.value != "" && formReviewEmail.value != "") {
								enableSendButton();
							}
						})
						break;

				}

			})
	}

})

// BUDGET REQUEST

const budgetIcon = document.getElementById('budget_icon');
const budgetIconFloat = document.getElementById('budget_float');
const budgetBtn = document.querySelectorAll('.budget_btn');
const budgetFormBox = document.getElementById('budget_form_box');
const budgetFormBack = document.getElementById('budget_form_back');
const budgetCloseBtn = document.getElementById('budget_close_btn');

function hideBudgetRequest() {
	budgetFormBox.classList.add('animate__animated', 'animate__zoomOut');
	budgetFormBack.classList.add('animate__animated', 'animate__fadeOut');

	setTimeout(() => {
		budgetFormBox.classList.remove('animate__animated', 'animate__zoomOut');
		budgetFormBox.classList.remove('animate__animated', 'animate__zoomIn');
		budgetFormBack.classList.remove('animate__animated', 'animate__fadeOut');
		s_budget_form.style.display = 'none';
		document.body.style.overflow = 'auto';
		formBudgetName.value = ""; formBudgetEmail.value = ""; formBudgetPhone.value = "";
		if (window.innerWidth < 1368) {
			budgetIconFloat.style.display = 'flex';
		}
	}, 300);
}

budgetCloseBtn.addEventListener('click', () => {
	hideBudgetRequest();
})

window.addEventListener("keydown", function (event) {
	let k = event.key;
	if (k == 27 || k == "Escape" || k == "Esc") {
		hideBudgetRequest();
	}
});


setInterval(() => {
	budgetIcon.classList.add('animate__animated', 'animate__tada');
	budgetIconFloat.classList.add('animate__animated', 'animate__tada');
	setTimeout(() => {
		budgetIcon.classList.remove('animate__animated', 'animate__tada');
		budgetIconFloat.classList.remove('animate__animated', 'animate__tada');
	}, 3000);
}, 20000);

budgetBtn.forEach(btn => {
	btn.addEventListener('click', () => {
		s_budget_form.style.display = 'flex';
		document.body.style.overflow = 'hidden';
		budgetIconFloat.style.display = 'none';
		disableSendButton();
		budgetFormBox.classList.add('animate__animated', 'animate__zoomIn');
	})
})


// SHOW/HIDE ALTERANTIVE MENU

const btnMenu = document.getElementById('m_menu_btn');

btnMenu.addEventListener("click", showmenu);

function showmenu() {
	let btn = document.getElementById('m_menu_btn').innerText;

	fix_m_menu();

	switch (btn) {
		case '󰍜':
			m_menu_btn.innerHTML = '';
			m_menu.style["transform"] = "translate(0%)";
			break;
		case '':
			m_menu_btn.innerHTML = '󰍜';
			m_menu.style["transform"] = "translate(100%)";
			break;
	}
}

// Calc M-Menu top and fix position

window.addEventListener("resize", () => {
	const w = window.innerWidth;
	if (eval(w) > 1368) {
		budgetIconFloat.style.display = 'none';
	} else if (eval(w) < 1368) {
		budgetIconFloat.style.display = 'flex';
	} else if (eval(w) > 1155) {
		m_menu_btn.style.display = "none";
	} else if (eval(w) < 1155) {
		m_menu_btn.style.display = "flex";
		budgetIconFloat.style.display = 'flex';
	}
});

function fix_m_menu() {
	const header_h = document.getElementById('header_top').getBoundingClientRect().height;
	const menu_bar_h = document.getElementById('menu_bar').getBoundingClientRect().height;
	if (header_h == '100') {
		m_menu.style['top'] = header_h + menu_bar_h + 'px';
	} else {
		m_menu.style['top'] = header_h + 20 + 'px';
	}
}

window.addEventListener('resize', fix_m_menu);

// COOKIES

// const headers = new Headers();
// headers.append('Set-Cookie', 'key=value; path=/; domain=http://192.168.241.14:5500; Secure; SameSite=Strict');

// NOTIFICATIONS

// noti.style['top'] = headerHeight + menuBarHeight + 'px';

function showNoti(notiType, message) {
	switch (notiType) {
		case "ok":
			notiType = `<div id="ntf_icon" class="ntf_icon" id="ntf_icon"><i style="color: green" class='far fa-circle-check'></i></div`;
			break;
		case "err":
			notiType = `<div id="ntf_icon" class="ntf_icon" id="ntf_icon"><i style="color: red" class='fas fa-exclamation-triangle'></i></div`;
			break;
		case "inf":
			notiType = `<div id="ntf_icon" class="ntf_icon" id="ntf_icon"><i style="color: yellow" class='fas fa-exclamation-circle'></i></div`;
			break;
	}

	notiIcon.innerHTML = notiType;
	notiText.innerHTML = message;
	noti.style['transform'] = 'translate(-3%)';
	setTimeout(() => {
		noti.style['transform'] = 'translate(102%)';
	}, 5000);
}

// setTimeout(() => {
// 	showNoti('inf','This is only a test')
// }, 5000);


// REVIEWS

const newReviewBtn = document.getElementById('new_review');
const reviewFormBox = document.getElementById('review_form_box');
const reviewCloseBtn = document.getElementById('review_close_btn');

const showReviews = async () => {
	try {
		resp = await fetch(`https://wwpspdb.kiniun.tech/reviews?enabled=true&_sort=id&_order=desc`)
			.then(data => data.json())
			.then(data => {

				data.forEach(e => {
					const name = e.name;
					const review = e.review;
					const enabled = e.enabled;

					if (enabled == true) {
						reviews_box.innerHTML += `
			<div class="review_card" id="review_card" >
				<div class="review_card_img">
					<i class='fas fa-quote-left fa-4x'></i>
				</div>
				<hr>
				<div class="review_card_text" >
					<h3>${name}</h3>
					<p class="review_text" id="review_text">
						${review}
					</p>
				</div>
			</div>
			`
					}
				})
			})

	} catch (error) {
		showNoti('err', "Error trying to connect to database server");
		setTimeout(() => {
			showReviews();
		}, 60000);
	}

}

showReviews();

newReviewBtn.addEventListener('click', () => {
	s_review_form.style.display = 'flex';
	document.body.style.overflow = 'hidden';
	budgetIconFloat.style.display = 'none';
	disableSendButton();
	reviewFormBox.classList.add('animate__animated', 'animate__zoomIn');
	setTimeout(() => {
		reviewFormBox.classList.remove('animate__animated', 'animate__zoomIn');
	}, 1000);

})

function hideSubmitReview() {
	reviewFormBox.classList.remove('animate__animated', 'animate__zoomIn');
	reviewFormBox.classList.add('animate__animated', 'animate__zoomOut');
	setTimeout(() => {
		reviewFormBox.classList.remove('animate__animated', 'animate__zoomOut');
		s_review_form.style.display = 'none';
		document.body.style.overflow = 'auto';
		formReviewName.value = ""; formReviewEmail.value = ""; formReviewMessage.value = "";
		if (window.innerWidth < 1368) {
			budgetIconFloat.style.display = 'flex';
		}
	}, 200);
}

reviewCloseBtn.addEventListener('click', () => {
	hideSubmitReview();
})

window.addEventListener("keydown", function (event) {
	let k = event.key;
	if (k == 27 || k == "Escape" || k == "Esc") {
		hideSubmitReview();
	}
});


// FORMS SUBMIT

const frmKey = document.querySelectorAll('.frmKey');
const frmRedirect = document.querySelectorAll('.frmRedirect');
const frmSubject = document.querySelectorAll('.frmSubject');

frmKey.forEach(key => {
	key.value = "6812b923-1859-4cd0-a7b2-7f246e481715";
})

frmRedirect.forEach(redirect => {
	redirect.value = location.href;
})

const getContactData = () => {
	const frmData = new FormData(contactForm);
	// const frmDataComplete = Object.fromEntries(frmData.entries());
	const name = frmData.get('name');
	const email = frmData.get('email');
	const subj = frmData.get('subj');
	const message = frmData.get('message');
	const date = formattedDate;
	const contactData = { name, email, subj, message, date };
	return contactData;
}

const getBudgetData = () => {
	const frmData = new FormData(budgetForm);
	// const frmDataComplete = Object.fromEntries(frmData.entries());
	const name = frmData.get('name');
	const email = frmData.get('email');
	const phone = frmData.get('phone');
	const request = frmData.get('message');
	const date = formattedDate;
	const budgetData = { name, email, phone, request, date };
	return budgetData;
}

const getReviewData = () => {
	const frmData = new FormData(reviewForm);
	// 	const frmDataComplete = Object.fromEntries(frmData.entries());
	const name = frmData.get('name');
	const email = frmData.get('email');
	const review = frmData.get('message');
	const enabled = false;
	const date = formattedDate;
	const reviewData = { name, email, review, date, enabled };
	return reviewData;
}

dataForms.forEach(form => {

	form.addEventListener('submit', (e) => {
		e.preventDefault();
		let msg = e.target.children.namedItem('message');

		frmSubject.forEach(subject => {
			switch (subject.id) {
				case "contactSubject":
					subject.innerHTML = `<input id="contactSubject" type="hidden" name="subject" value="New MESSAGE from ${formContactName.value} on WWP SCREENING & PAINTING LLC" ></input>`;
					break;
				case "reviewSubject":
					subject.innerHTML = `<input id="reviewSubject" type="hidden" name="subject" value="New REVIEW from ${formReviewName.value} on WWP SCREENING & PAINTING LLC" ></input>`;
					break;
				case "budgetSubject":
					subject.innerHTML = `<input id="budgetSubject" type="hidden" name="subject" value="New BUDGET REQUEST from ${formBudgetName.value}" ></input>`;
					break;
			}
		})

		const postData = async () => {
			switch (e.target.id) {
				case "contact_form":
					const newContactData = getContactData();
					try {
						resp = await fetch("https://wwpspdb.kiniun.tech/messages", {
							method: 'POST',
							headers: { 'Content-Type': 'application/json' },
							body: JSON.stringify(newContactData)
						});

						if (resp.ok) {
							showNoti('ok', 'Your message has been sent successfully');
						}

					} catch (error) {
						showNoti('err', "Error trying to connect to database server");
					}
					break;
				case "budget_form":
					const newBudgetData = getBudgetData();
					try {
						resp = await fetch("https://wwpspdb.kiniun.tech/budgets", {
							method: 'POST',
							headers: { 'Content-Type': 'application/json' },
							body: JSON.stringify(newBudgetData)
						});

						if (resp.ok) {
							showNoti('ok', 'Budget request sent successfully');
						}

					} catch (error) {
						showNoti('err', "Error trying to connect to database server");
					}
					break;
				case "review_form":
					const newReviewData = getReviewData();
					try {
						resp = await fetch("https://wwpspdb.kiniun.tech/reviews", {
							method: 'POST',
							headers: { 'Content-Type': 'application/json' },
							body: JSON.stringify(newReviewData)
						});

						// Enable/Disable a review

						// const reg = 4
						// resp = await fetch(`https://wwpspdb.kiniun.tech/reviews/${reg}`, {
						// 	method: 'PATCH',
						// 	headers: { 'Content-Type': 'application/json' },
						// 	body: JSON.stringify({ "enabled" : true })
						// });


						if (resp.ok) {
							showNoti('ok', 'Your review has been sent successfully');
							reviews_box.innerHTML = '';
							showReviews();
						}

					} catch (error) {
						showNoti('err', "Error trying to connect to database server");
					}
					break;
			}
		}

		// Validate all and Submit

		if (msg.value.length >= 4) {
			postData();
			setTimeout(() => {
				let fields = document.querySelectorAll(".frm_text");
				e.target.submit();
				fields.forEach((field) => {
					field.value = "";
				});
			}, 5000);
		} else {
			msg.classList.add("wrong", "animate__animated", "animate__shakeX");
			msg.value = "";
			msg.placeholder = "Message is too short. Please, tell us more.";
			setTimeout(() => {
				msg.classList.remove(
					"wrong",
					"animate__animated",
					"animate__shakeX"
				);
			}, 1000);
			setTimeout(() => {
				if (e.target.id == 'review_form') {
					msg.placeholder = "What's your opinion about our service?";
				} else if (e.target.id == 'budget_form') {
					msg.placeholder = "Please, let us know what you need.";
				} else {
					msg.placeholder = "Leave us your message";
				}
			}, 3500);
		}
	})
})

