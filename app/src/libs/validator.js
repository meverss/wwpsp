
export const disableSendButton = (button)=> {
  const btn = document.querySelector(`#${button}`)
  if(btn){
	btn.disabled = true
  }
}

export const enableSendButton = (button)=> {
  const btn = document.querySelector(`#${button}`)
  if(btn){
	btn.disabled = false
  }
}

export const validateAll = (user, fullname) => {
  const fields = document.querySelectorAll('.frm_text')
  const dataForms = document.querySelectorAll('.form')
  const formContactName = document.getElementById("name")
  const formContactEmail = document.getElementById("email")

  const formBudgetName = document.getElementById("br_name")
  const formBudgetEmail = document.getElementById("br_email")
  const formBudgetPhone = document.getElementById("br_phone")

  const formReviewName = document.getElementById("rv_name")
  const formReviewEmail = document.getElementById("rv_email")

  const validEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/
  const validPhone = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
  const validUser = /^[0-9a-zA-Z]{3,16}$/
  const validUserFullName = /^[A-Z a-z.áéíóúÁÉÍÓÚ]{3,100}$/
  const validPassword = /^(?=.*[0-9])(?=.*[!@#$£%^&*,.;:~])(?=.*[A-Z])[a-zA-Z0-9!@#$£%^&*,.;:~]{6,16}$/

  fields.forEach((e) => {
    const dataType = e.dataset.frminfo
      switch (dataType) {
        case "user":
      	  e.type = 'text'
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
        case "name" || "fullname":
      	  e.type = 'text'
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
		  e.type = "password"
          e.addEventListener('focusout', () => {
            if ((!validPassword.test(e.value)) && (e.value !== '')) {
              e.classList.add("wrong", "animate__animated", "animate__shakeX")
              e.value = ""
              e.placeholder = "That password is not secure"
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
          e.type="email"
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
      	  e.type = 'tel'
      	  e.maxLength = 14
          e.addEventListener('focusout', ()=> {
            if (!validPhone.test(e.value)) {
              e.classList.add("wrong", "animate__animated", "animate__shakeX")
              e.value = ""
              e.placeholder = "Enter a valid phone number"
              setTimeout(()=> {
                e.classList.remove("wrong", "animate__animated", "animate__shakeX")
              }, 1000)
              setTimeout(()=> {
                e.placeholder = "Where can we call you to?"
              }, 3500)
            }
          })

		  e.addEventListener("keyup", () => {
			let val = e.value.replace(/\D/g, "") // Elimina todo excepto números
			const isInternatilnal = val.startsWith("+")

			// Format: +1 (555) 123-4567
			if (isInternatilnal) {
  			  val = val.substring(1) // Quita el "+" para el formateo
  			  val = "+" + val.replace(/(\d{1})(\d{3})(\d{3})(\d{4})/, "$1 ($2) $3-$4")
			} else {
  			  val = val.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3")
			}
			e.value = val
		  })
          break
        case "message":
		  dataForms.forEach((form)=> {
			switch (form.id) {
			  case "contact_form":
				e.addEventListener('keyup', ()=> {
				  if (formContactName.value !== "" && formContactEmail.value !== "" && e.value.length >= 5) {
					enableSendButton('ct_btn_send')
				  } else {
					disableSendButton('ct_btn_send')
				  }
				})
				break
			  case "budget_form":
				e.addEventListener('keyup', ()=> {
				  if (formBudgetName.value !== "" && formBudgetEmail.value !== "" && formBudgetPhone.value !== "" && e.value.length >= 5) {
					enableSendButton('br_btn_send')
				  } else {
					disableSendButton('br_btn_send')		
				  }
				})
				break
			  case "review_form":
				e.addEventListener('keyup', ()=> {
				  if (formReviewName.value !== "" && formReviewEmail.value !== "" && e.value.length >= 5) {
					enableSendButton('rv_btn_send')
				  } else {
					disableSendButton('rv_btn_send')
				  }
				})
				break
			  default:
				return
      		}
      	  })
      	  break
      	  default:
      		e.type = 'text'
		}
  })
}