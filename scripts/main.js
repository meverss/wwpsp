// GLOBAL VARIABLES

const dataForms = document.querySelectorAll('.form');
const frmField = document.querySelectorAll('.frm_text');
const frmMessage = document.querySelectorAll('.frm_message');
const btnSend = document.querySelectorAll('.form_btn');

const contactForm = document.getElementById('contact_form');
const formContactName = document.getElementById("name");
const formContactEmail = document.getElementById("email");
const formContactSubject = document.getElementById("subj");
const formContactMessage = document.getElementById("message");

const budgetForm = document.getElementById('budget_form');
const formBudgetName = document.getElementById("br_name");
const formBudgetEmail = document.getElementById("br_email");
const formBudgetPhone = document.getElementById("br_phone");
const formBudgetMessage = document.getElementById("br_message");

const reviewForm = document.getElementById('review_form');
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

const dbsite = () => {
	if (location.hostname.includes('192.168.')) {
		return `http://${location.hostname}:3000/`;
	} else {
		return `https://wwpspdb.kiniun.tech/`;
	}
}

const mySite = () => {
	if (!location.hostname.includes('192.168.')) {
		return `https://${location.host}`;
	} else {
		return `http://${location.host}`;
	}
}

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

// CATCH ESCAPE KEY

const getEscKey = (func) => {
	window.addEventListener("keydown", (event) => {
		let k = event.key;
		if (k == 27 || k == "Escape" || k == "Esc") {
			func();
			window.removeEventListener("keydown", null);
		}
	});
}

// SHOW WEBSITE AFTER LOADED

let show_page = async () => {
	page_content.style.opacity = "1";
	loader_container.classList.add('animate__animated', 'animate__fadeOut');
	document.body.style.overflow = "auto";
	setTimeout(function () {		
		loader_container.style.display = 'none';
	}, 1000)
}

// SACROLL TO SECTIONS

function scroll_to_section(section) {
	let element = document.getElementById(section);
	let position = element.offsetTop;
	window.scrollTo(0, position - 100);
}

function scroll_to_section_m(section_m) {
	const element = document.getElementById(section_m);
	const position = element.offsetTop;
	if (window.innerWidth < 850) {
		switch (section_m) {
			case "s_m_about_us":
				if (window.innerWidth >= 768) {
					window.scrollTo(0, position - 50);
					break;
				} else {
					window.scrollTo(0, position);
					break;
				}
			case "s_m_services":
				if (window.innerWidth >= 768) {
					window.scrollTo(0, position - 80);
					break;
				} else {
					window.scrollTo(0, position);
					break;
				}
			case "s_m_reviews":
				if (window.innerWidth >= 768) {
					window.scrollTo(0, position - 50);
					break;
				} else {
					window.scrollTo(0, position);
					break;
				}
			case "s_m_our_team":
				window.scrollTo(0, position);
				break;
			case "s_m_contact_us":
				window.scrollTo(0, position - 275);
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
	setTimeout(() => {
		m_menu_container.style["display"] = "none";
	}, 200);
}

let menu = document.querySelectorAll(".menu_item");
let alt_menu = document.querySelectorAll(".m_menu_item");

menu.forEach((obj) => {
	let sec = obj.id;
	let section = 's_' + obj.id;
	if (obj.id != 'portfolio') {
		if (obj.classList[1] != "m_menu_item") {
			if (obj.id != "") {
				obj.addEventListener("click", function () {
					scroll_to_section("s_" + sec);
				});
			}
		}
	} else {
		obj.addEventListener('click', () => {
			window.open('./pages/portfolio.html', '_top', '');
		})
	}
});

alt_menu.forEach((obj1) => {
	let sec = obj1.id;

	if (!location.href.includes('portfolio')) {
		if (obj1.id != 'm_portfolio') {
			if (obj1 != "s_m_menu_open_btn") {
				obj1.addEventListener("click", function () {
					scroll_to_section_m("s_" + sec);
				});
			}
		} else if (obj1.id == 'm_portfolio') {
			obj1.addEventListener('click', () => {
				window.open('./pages/portfolio.html', '_top', '');
			})
		}
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
		window.open(eval(link), "", "width=530, height=600, toolbar=0, status=0, top=200, left=700");
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
			e.style['textTransform'] = 'lowercase';
			e.addEventListener('focusout', () => {
				if (!validEmail.test(e.value)) {
					disableSendButton();
					e.classList.add("wrong", "animate__animated", "animate__shakeX");
					e.value = "";
					e.style['textTransform'] = 'none';
					e.placeholder = "Enter a valid e-mail address";
					setTimeout(() => {
						e.classList.remove("wrong", "animate__animated", "animate__shakeX");
					}, 1000);
					setTimeout(() => {
						e.style['textTransform'] = 'lowercase';
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
		if (window.innerWidth < 1365) {
			budgetIconFloat.style.display = 'flex';
		}
	}, 300);
}


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
		budgetForm.children.namedItem('name').focus();

		budgetCloseBtn.addEventListener('click', () => {
			hideBudgetRequest();
			budgetCloseBtn.removeEventListener('click', null);
		})

		getEscKey(hideBudgetRequest);

	})
})


// SHOW/HIDE ALTERANTIVE MENU

const btnMenu = document.getElementById('m_menu_btn');

btnMenu.addEventListener("click", showmenu);

function showmenu() {
	let btn = document.getElementById('m_menu_btn').innerText;

	fix_m_menu();

	const hideMenu = () => {
		m_menu_btn.innerHTML = '󰍜';
		m_menu.style["transform"] = "translate(100%)";
		setTimeout(() => {
			m_menu_container.style["display"] = "none";
			m_menu_container.removeEventListener('click', null);
		}, 200);
	}

	switch (btn) {
		case '󰍜':
			m_menu_container.style["display"] = "flex";
			setTimeout(() => {
				m_menu_btn.innerHTML = '';
				m_menu.style["transform"] = "translate(0%)";
			}, 10);
			break;
		case '':
			hideMenu();
			break;
	}

	m_menu_container.addEventListener('click', hideMenu);

	getEscKey(hideMenu);

}

// Calc M-Menu top and fix position

window.addEventListener("resize", () => {
	const w = window.innerWidth;
	if (eval(w) > 1365) {
		budgetIconFloat.style.display = 'none';
	} else if (eval(w) <= 1365) {
		budgetIconFloat.style.display = 'flex';
	} else if (eval(w) > 1155) {
		m_menu_btn.style.display = "none";
	} else if (eval(w) < 1155) {
		m_menu_btn.style.display = "flex";
		budgetIconFloat.style.display = 'flex';
	}
});

function fix_m_menu() {
	if (!location.href.includes('portfolio')) {
		const header_h = document.getElementById('header_top').getBoundingClientRect().height;
		const menu_bar_h = document.getElementById('menu_bar').getBoundingClientRect().height;
		if (header_h == '100') {
			m_menu.style['top'] = header_h + menu_bar_h + 'px';
			m_menu_container.style['top'] = header_h + menu_bar_h + 'px';
		} else {
			m_menu.style['top'] = header_h + 20 + 'px';
			m_menu_container.style['top'] = header_h + 20 + 'px';
		}
	}
}

window.addEventListener('resize', fix_m_menu);
fix_m_menu();

// COOKIES

const cookies = document.getElementById('cookies');
const cookiesBanner = document.getElementById('cookies_banner');
const cookiesOK = document.getElementById('cookies_ok');

function openCookies() {
	const origin = location.hostname;
	switch (origin) {
		case "wwpspllc.kiniun.tech":
			window.open(
				`https://${location.hostname}/pages/cookies.html`,
				"",
				"width=720, height=480, toolbar=0, status=0, top=300, left=600"
			);
			break
		default:
			window.open(
				`http://${location.host}/pages/cookies.html`,
				"",
				"width=720, height=480, toolbar=0, status=0, top=300, left=600"
			);
			break
	}
}

cookiesBanner.innerHTML =
	`We use cookies with the only purpose to analyze our website traffic. If you want to know more about it, you can read our <a href="javascript:openCookies();">cookies policy</a>`;

// Acept cookies //
cookiesOK.addEventListener("click", (e) => {
	cookies.classList.add("animate__animated", "animate__bounceOutDown");
});

// NOTIFICATIONS

function showNoti(notiType, message) {
	switch (notiType) {
		case "ok":
			notiType = /*html*/ `<div id="ntf_icon" class="ntf_icon" id="ntf_icon"><i style="color: green" class='far fa-circle-check'></i></div>`;
			break;
		case "err":
			notiType = /*html*/ `<div id="ntf_icon" class="ntf_icon" id="ntf_icon"><i style="color: red" class='fas fa-exclamation-triangle'></i></div>`;
			break;
		case "inf":
			notiType = /*html*/ `<div id="ntf_icon" class="ntf_icon" id="ntf_icon"><i style="color: yellow" class='fas fa-exclamation-circle'></i></div>`;
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
		resp = await fetch(`${dbsite()}reviews?enabled=true&_sort=id&_order=desc`)
			.then(data => data.json())
			.then(data => {

				data.forEach(e => {
					const name = e.name;
					const review = e.review;
					const enabled = e.enabled;

					if (enabled == true) {
						reviews_box.innerHTML += /*html*/`
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
							</div>`
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
	reviewForm.children.namedItem('name').focus();
	setTimeout(() => {
		reviewFormBox.classList.remove('animate__animated', 'animate__zoomIn');
	}, 1000);

	reviewCloseBtn.addEventListener('click', () => {
		hideSubmitReview();
		reviewCloseBtn.removeEventListener('click', null);
	})

	getEscKey(hideSubmitReview);

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
					subject.innerHTML = /*html*/ `<input id="contactSubject" type="hidden" name="subject" value="New MESSAGE from ${formContactName.value} on WWP SCREENING & PAINTING LLC" >`;
					break;
				case "reviewSubject":
					subject.innerHTML = /*html*/ `<input id="reviewSubject" type="hidden" name="subject" value="New REVIEW from ${formReviewName.value} on WWP SCREENING & PAINTING LLC" >`;
					break;
				case "budgetSubject":
					subject.innerHTML = /*html*/ `<input id="budgetSubject" type="hidden" name="subject" value="New BUDGET REQUEST from ${formBudgetName.value}" >`;
					break;
			}
		})

		const postData = async () => {
			switch (e.target.id) {
				case "contact_form":
					const newContactData = getContactData();
					try {
						resp = await fetch(`${dbsite()}messages`, {
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
						resp = await fetch(`${dbsite()}budgets`, {
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
						resp = await fetch(`${dbsite()}reviews`, {
							method: 'POST',
							headers: { 'Content-Type': 'application/json' },
							body: JSON.stringify(newReviewData)
						});

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

// PORTFOLIO

if (location.href.includes('portfolio.html')) {

	const menu = document.getElementById('menu');
	const social = document.getElementById('social');
	const mMenuBtn = document.getElementById('m_menu_btn');
	const reviewsBox = document.getElementById('s_reviews');
	const loaderContainer = document.getElementById('loader_container');
	const loaderText = document.getElementById('loader_text');
	const mediaTag = document.querySelectorAll('.media_tag');
	const picturesTag = document.getElementById('pictures_tag');
	const videosTag = document.getElementById('videos_tag');
	const picturesBox = document.getElementById('pictures_box');
	const videosBox = document.getElementById('videos_box');
	const picturesLabel = document.getElementById('picturesLabel');
	const videosLabel = document.getElementById('videosLabel');

	menu.style['justifyContent'] = 'left';
	menu.style['marginLeft'] = '380px';
	social.style['justifyContent'] = 'right';
	social.style['display'] = 'flex';
	social.style['marginRight'] = '20px';
	social.style['width'] = '25%';
	mMenuBtn.style['display'] = 'none';
	reviewsBox.style['display'] = 'none'
	loaderContainer.style['backgroundColor'] = 'rgb(20,20,20,0.95)'
	loaderText.style['color'] = '#eee';

	const fixMenu = () => {
		if (window.innerWidth <= 1445) {
			menu.style['marginLeft'] = '20px';
			menu.style['justifyContent'] = 'left';
			menu.style['display'] = 'flex';
		} else {
			menu.style['marginLeft'] = '380px';
		}
	}

	menu.children.namedItem('home').addEventListener('click', () => {
		window.open('../index.html', '_self', '');
		loaderContainer.style['backgroundColor'] = 'rgb(20,20,20,0.95)'
	})

	window.addEventListener('resize', () => {
		fixMenu();
	})

	fixMenu();

	mediaTag.forEach(media => {
		media.addEventListener('click', () => {
			switch (media.id) {
				case "pictures_tag":
					media.style['z-index'] = '2';
					media.style['backgroundColor'] = '#085c97';
					media.style['color'] = '#eee';
					picturesLabel.style['color'] = '#ddd';
					videosLabel.style['color'] = '#222';
					videosTag.style['backgroundColor'] = '#ddd';
					videosTag.style['z-index'] = '1';
					picturesBox.style['display'] = 'flex';
					videosBox.style['display'] = 'none';
					break;
				case "videos_tag":
					media.style['z-index'] = '2';
					media.style['backgroundColor'] = '#085c97';
					media.style['color'] = '#eee';
					videosLabel.style['color'] = '#ddd';
					picturesLabel.style['color'] = '#222';
					picturesTag.style['backgroundColor'] = '#ddd';
					picturesTag.style['z-index'] = '1';
					videosBox.style['display'] = 'flex';
					picturesBox.style['display'] = 'none';
					break;

			}
		})
	})

	// Fetching database

	const showGallery = async () => {
		resp = await fetch(`${dbsite()}portfolio/`)
			.then(data => data.json())
			.then(data => {
				const pictures = data.pictures;
				const videos = data.videos;
				pictures.forEach(collection => {
					const pictures = document.getElementById('pictures');
					let album = collection.album;
					let images = collection.images;
					let path = collection.path;
					let date = collection.date;
					let id = collection.id;

					const buildGalleries = async () => {
						build = () => {
							pictures.innerHTML += /*html*/`
							<div class="gallery_box">
								<div class="img_thumbnail" id="img_thumbnail_${id}">
								</div>
								<ul>
									<li><span style="font-weight: bold">Album:</span> ${album} </li>
									<li><span style="font-weight: bold">Date:</span> ${date} </li>
									<li><span style="font-weight: bold">Images:</span> ${images} </li>
								</ul>
								<div class="p_social" id="p_social">
									<p class="social_item" id="p_facebook_${id}" title="Share on Facebook" data-href="https://wwpspllc.kiniun.tech/index.html" data-layout="button_count"><i class='fab fa-facebook-f'></i>
									</p>
									<p class="social_item" id="p_twitter_${id}" title="Share on Twitter"><i class='fab fa-twitter'></i>
									</p>
								</div>
							</div>
							`;
							const imgThumb = document.getElementById(`img_thumbnail_${id}`);
							for (let i = images; i >= 1; i--) {
								imgThumb.innerHTML += /*html*/`
								<a href="${path}/${i}.webp" data-lightbox='gallery_wwp${id}' data-title='Team WWP#${id}' class="e_services_img">
									<img id="image_${id}_${i}" class="image" src="${path}/${i}.webp" alt="wwp${id}-${i}" style="z-index: ${101 + i}">
								</a>
								`;
							}
						}
						build();
					}
					buildGalleries();
				})

				videos.forEach(video => {
					const videos = document.getElementById('videos');
					let name = video.name;
					let path = video.path;
					let duration = video.duration;
					let date = video.date;
					let id = video.id;

					const buildVideoGallery = async () => {
						videos.innerHTML += /*html*/`
						<div class="vgallery_box" id="vgallery_box">
						<div class="video_thumbnail" id="video_thumbnail_${id}">
						<img class="image video_frame" id="video_frame_${id}" src="../media/images/video_frame.webp" alt="frame" data-src="${path}">
						<video class="video"  src="${path}" alt="${name}" muted>
						</div>
						<ul>
						<li><span style="font-weight: bold">Name:</span> ${name} </li>
						<li><span style="font-weight: bold">Date:</span> ${date} </li>
						<li><span style="font-weight: bold">Duration:</span> ${duration} </li>
						</ul>
						</div>
						`;

					}
					buildVideoGallery();
				})
				const videoFrames = document.querySelectorAll('.video_frame');
				const videoPopup = document.querySelector('.video_popup');
				const videoPopupPlayer = document.querySelector('#video_popup_player');
				const closeVideo = document.getElementById('close_video');
				videoFrames.forEach(frame => {
					frame.addEventListener('click', () => {
						reviewFormBox.classList.add('animate__animated', 'animate__zoomIn');
						reviewForm.children.namedItem('name').focus();

						videoPopup.style.display = 'block';
						videoPopupPlayer.classList.add('animate__animated', 'animate__fadeIn');
						videoPopupPlayer.src = frame.dataset['src'];
					})
				})

				closeVideo.addEventListener('click', () => {
					videoPopupPlayer.classList.add('animate__animated', 'animate__fadeOut');
					videoPopupPlayer.pause();
					videoPopup.style.display = 'none';
					setTimeout(() => {
						videoPopupPlayer.classList.remove('animate__animated', 'animate__fadeIn', 'animate__fadeOut');
					}, 1000);
				})
			})

	}
	showGallery();
}


// CACHE
