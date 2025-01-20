
export const disableSendButton = ()=> {
  const btnSend = document.querySelectorAll('.form_btn')
  if(btnSend){
	btnSend.forEach((btn) => {
	  btn.disabled = true
	})
  }
}

export const enableSendButton = ()=> {
  const btnSend = document.querySelectorAll('.form_btn')
  if(btnSend){
	btnSend.forEach((btn) => {
	  btn.disabled = false
	})
  }
}

export const validateAll = (user, fullname) => {
  const fields = document.querySelectorAll('.frm_text')
  const dataForms = document.querySelectorAll('.form')
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

  const validEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/
  const validPhone = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
  const validUser = /^[0-9a-zA-Z]{3,16}$/
  const validUserFullName = /^[A-Z a-z.áéíóúÁÉÍÓÚ]{3,100}$/
  const validPassword = /^(?=.*[0-9])(?=.*[!@#$£%^&*,.;:~])(?=.*[A-Z])[a-zA-Z0-9!@#$£%^&*,.;:~]{6,16}$/

  fields.forEach((e) => {
    const dataType = e.dataset.frminfo
    // if (e.value !== '') {
      switch (dataType) {
        case "user":
          e.addEventListener('focusout', () => {
            if (!validUser.test(e.value)) {
              e.classList.add("wrong", "animate__animated", "animate__shakeX")
              e.value = ""
              setTimeout(() => {
                e.classList.remove("wrong", "animate__animated", "animate__shakeX")
              }, 1000)
              setTimeout(() => {
                e.placeholder = "What's your name?"
              }, 3500)
            }
          })
          break
        case "fullname":
          e.addEventListener('focusout', () => {
            if (!validUserFullName.test(e.value) || e.value === '') {
              e.classList.add("wrong", "animate__animated", "animate__shakeX")
			  e.value = ""
              e.placeholder = "Please, provide us a name"
              setTimeout(() => {
                e.classList.remove("wrong", "animate__animated", "animate__shakeX")
              }, 1000)
              setTimeout(() => {
            	e.value = ""
                e.placeholder = "What's your name?"
              }, 3500)
            }
          })
          break
        case "password":
          e.addEventListener('focusout', () => {
            if ((!validPassword.test(e.value)) && (e.value !== '')) {
              e.classList.add("wrong", "animate__animated", "animate__shakeX")
			  e.type = "password"
              e.value = ""
              e.placeholder = "La contraseña no es segura"
              setTimeout(() => {
                e.classList.remove("wrong", "animate__animated", "animate__shakeX")
              }, 1000)
              setTimeout(() => {
                e.placeholder = '********'
              }, 3500)
            } else {
              return true
            }
          })
          break
        case "email":
          e.style['textTransform'] = 'lowercase'
          e.addEventListener('focusout', () => {
            if (!validEmail.test(e.value)) {
              e.classList.add("wrong", "animate__animated", "animate__shakeX")
              e.value = ""
              e.placeholder = "Enter a valid e-mail address"
              setTimeout(() => {
                e.classList.remove("wrong", "animate__animated", "animate__shakeX")
              }, 1000)
              setTimeout(() => {
                e.placeholder = "your@email.here"
              }, 3500)
            }
          })
          break
        case "phone":
          e.addEventListener('focusout', ()=> {
            if (!validPhone.test(e.value)) {
              e.classList.add("wrong", "animate__animated", "animate__shakeX")
              e.value = ""
              e.placeholder = "Enter a valid phone number"
              setTimeout(()=> {
                e.classList.remove("wrong", "animate__animated", "animate__shakeX")
              }, 1000)
              setTimeout(()=> {
                e.placeholder = "Where can we call you?"
              }, 3500)
            }
          })
          break
        case "message":
		  dataForms.forEach((form)=> {
			switch (form.id) {
			  case "contact_form":
				e.addEventListener('focus', ()=> {
				  if (formContactName.value !== "" && formContactEmail.value !== "") {
					enableSendButton()
				  } else {
					//disableSendButton()
				  }
				})
				break
			  case "budget_form":
				e.addEventListener('focus', ()=> {
				  if (formBudgetName.value !== "" && formBudgetEmail.value !== "" && formBudgetPhone.value != "") {
					enableSendButton()
				  }
				})
				break
			  case "review_form":
				e.addEventListener('keyup', ()=> {
				  if (formReviewName.value !== "" && formReviewEmail.value !== "" && e.value.length >= 5) {
					enableSendButton()
				  } else {
					disableSendButton()
				  }
				})
      		  default:
      		  }
      		  })
    // }
	}
  })
}