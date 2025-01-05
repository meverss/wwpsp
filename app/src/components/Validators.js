export const ValidateAll = (formField, user, fullname) => {
  const fields = document.querySelectorAll(`${formField}`)
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
              e.placeholder = "Proporcione un usuario válido"
              setTimeout(() => {
                e.classList.remove("wrong", "animate__animated", "animate__shakeX")
              }, 1000)
              setTimeout(() => {
                e.value = user
                e.placeholder = ''
              }, 3500)
            }
          })
          break
        case "fullname":
          e.addEventListener('focusout', () => {
            if (!validUserFullName.test(e.value)) {
              e.classList.add("wrong", "animate__animated", "animate__shakeX")
              e.value = ""
              e.placeholder = "Proporcione un nombre válido"
              setTimeout(() => {
                e.classList.remove("wrong", "animate__animated", "animate__shakeX")
              }, 1000)
              setTimeout(() => {
                e.value = fullname
                e.placeholder = ''
              }, 3500)
            }
          })
          break
        case "password":
          e.addEventListener('focusout', () => {
            if ((!validPassword.test(e.value)) && (e.value !== '')) {
              e.classList.add("wrong", "animate__animated", "animate__shakeX")
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
              e.style['textTransform'] = 'none'
              e.placeholder = "Enter a valid e-mail address"
              setTimeout(() => {
                e.classList.remove("wrong", "animate__animated", "animate__shakeX")
              }, 1000)
              setTimeout(() => {
                e.style['textTransform'] = 'lowercase'
                e.placeholder = "your@email.here"
              }, 3500)
            }
          })
          break
        case "phone":
          e.addEventListener('focusout', () => {
            if (!validPhone.test(e.value)) {
              e.classList.add("wrong", "animate__animated", "animate__shakeX")
              e.value = ""
              e.placeholder = "Enter a valid phone number"
              setTimeout(() => {
                e.classList.remove("wrong", "animate__animated", "animate__shakeX")
              }, 1000)
              setTimeout(() => {
                e.placeholder = "Where can we call you?"
              }, 3500)
            }
          })
          break
        default:
      }
    // }

  })
}