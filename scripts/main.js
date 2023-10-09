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
const my_website = encodeURIComponent(location.origin);
const my_title = encodeURIComponent('WWP SCREENING & PAINTING LLC.');
const url_facebook =
	"http://www.facebook.com/sharer.php?u=" +
	my_website +
	"&t=" + my_title;
const url_tweeter =
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

const dataForms = document.querySelectorAll('.form');
const frmField = document.querySelectorAll('.frm_text');
const btnSend = document.querySelectorAll('.form_btn');

const formContactName = document.getElementById("name");
const formContactEmail = document.getElementById("email");
const formContactSubject = document.getElementById("subj");
const formContactMessage = document.getElementById("message");

const formBudgetName = document.getElementById("br_name");
const formBudgetEmail = document.getElementById("br_email");
const formBudgetPhone = document.getElementById("br_phone");
const formBudgetMessage = document.getElementById("br_message");

const validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
const validPhone = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

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

				console
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
						e.placeholder = "Your phone in format 123-123-1234";
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

				}

			})
	}

})

// ---------------------

// const frm_contact = document.querySelector('.contact_form');
// const formContactName = document.getElementById("name");
// const formContactEemail = document.getElementById("email");
// const formContactMessage = document.getElementById("message");
// const f_btn = document.getElementById("btn_send");

// f_name.addEventListener("focusout", (e) => {
// 	if (f_name.value.length < 2) {
// 		f_btn.disabled = true;
// 		f_name.classList.add("wrong", "animate__animated", "animate__shakeX");
// 		f_name.value = "";
// 		f_name.placeholder = "More than one character, please";
// 		setTimeout((e) => {
// 			f_name.classList.remove("wrong", "animate__animated", "animate__shakeX");
// 		}, 1000);
// 		setTimeout((e) => {
// 			f_name.placeholder = "Who is contacting us?";
// 		}, 3500);
// 	}
// });

// f_email.addEventListener("focusout", (e) => {
// 	if (!valid_email.test(f_email.value)) {
// 		f_btn.disabled = true;
// 		f_email.classList.add("wrong", "animate__animated", "animate__shakeX");
// 		f_email.value = "";
// 		f_email.placeholder = "Enter a valid e-mail address";
// 		setTimeout((e) => {
// 			f_email.classList.remove("wrong", "animate__animated", "animate__shakeX");
// 		}, 1000);
// 		setTimeout((e) => {
// 			f_email.placeholder = "your@email.here";
// 		}, 3500);
// 	}
// });

// f_message.addEventListener("focus", (e) => {
// 	if (f_name.value != "" && f_email.value != "") {
// 		f_btn.disabled = false;
// 	}
// });

// Get data from the form, save a copy in a JSON and send the emmail


// frm_contact.addEventListener('submit', e => {
// 	e.preventDefault();

// 	const frmData = new FormData(e.target);
// 	const frmDataComplete = Object.fromEntries(frmData.entries());
// 	const name = frmData.get('name');
// 	const email = frmData.get('email');
// 	const subj = frmData.get('subj');
// 	const message = frmData.get('message');
// 	const contactMessage = { name, email, subj, message };

// 	frm_key.value = "6812b923-1859-4cd0-a7b2-7f246e481715";
// 	frm_url.value = location.origin;

// 	subject.innerHTML += `<input id="subject" type="hidden" name="subject" value="New message from ${f_name.value} on your website" ></input>`;

// 	if (f_message.value.length >= 4) {

// 		frm_contact.submit();
// 		setTimeout(() => {
// 			let fields = document.querySelectorAll(".frm_text");
// 			fields.forEach((field) => {
// 				field.value = "";
// 			});
// 		}, 2000);

// 	} else {
// 		f_message.classList.add("wrong", "animate__animated", "animate__shakeX");
// 		f_message.value = "";
// 		f_message.placeholder = "Please, write something!";
// 		setTimeout((e) => {
// 			f_message.classList.remove(
// 				"wrong",
// 				"animate__animated",
// 				"animate__shakeX"
// 			);
// 		}, 1000);
// 		setTimeout((e) => {
// 			f_message.placeholder = "Leave me your message";
// 		}, 3500);
// 	}

// });

// BUDGET REQUEST
const budgetIcon = document.getElementById('budget_icon');
const budgetIconFloat = document.getElementById('budget_float');
const budgetBtn = document.querySelectorAll('.budget_btn');
const budgetForm = document.getElementById('budget_form_box');
const budgetCloseBtn = document.getElementById('budget_close_btn');

function hideBudgetRequest() {
	budgetForm.classList.remove('animate__animated', 'animate__zoomIn');
	budgetForm.classList.add('animate__animated', 'animate__zoomOut');
	setTimeout(() => {
		budgetForm.classList.remove('animate__animated', 'animate__zoomOut');
		s_budget_form.style.display = 'none';
		document.body.style.overflow = 'auto';
		if (window.innerWidth < 1368) {
			budgetIconFloat.style.display = 'flex';
		}
	}, 200);
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
		budgetForm.classList.add('animate__animated', 'animate__zoomIn');
		setTimeout(() => {
			budgetForm.classList.remove('anitame__animated', 'animate__zoomIn');
		}, 1000);
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
	// switch (w) {
	// 	case (eval(w) > 1368):
	// 		console.log(w);
	// 		budgetIconFloat.style.display = 'none';
	// 		break;
	// 	case "w > 1155":
	// 		console.log(m_menu_btn.style)
	// 		m_menu_btn.style.display = "none";
	// 		break;
	// 	case "w <= 1155":
	// 		m_menu_btn.style.display = "flex";
	// 		budgetIconFloat.style.display = 'flex';
	// 		break;
	// }
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


// REVIEWS

fetch("https://wwpspdb.kiniun.tech/reviews?enabled=true&_sort=id&_order=desc")
	// fetch("./data/db.json")
	.then(data => data.json())
	.then(data => {
		// const budgets = data.budgets;
		// console.table(budgets);

		// const reviews = data.reviews;

		data.forEach(e => {
			// reviews.forEach(e => {

			const name = e.name;

			const email = e.email;
			const review = e.review;

			if (e.enabled == true) {
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

