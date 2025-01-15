// Catch ESC key
export const getEscKey = (func)=> {
  window.addEventListener("keydown", (e)=> {
    if(e.key === 27 || e.key === "Escape" || e.key === "Esc"){
      func()
      window.removeEventListener("keydown", null)
    }
  })
}
