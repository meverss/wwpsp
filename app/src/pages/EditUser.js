/* eslint-disable react-hooks/exhaustive-deps */
import axios from '../libs/axios.js'
import { useEffect, useState, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FaEye, FaEyeSlash } from "react-icons/fa6"
import { ValidateAll } from '../components/Validators.js'
import { serverContext } from '../App.js'
import { CompLoader } from '../components/CompLoader.js'

const CompEditUser = ({ getname, notify }) => {

  const server = useContext(serverContext)
  const URI = `${server}/users/`

  const [user, setUser] = useState('')
  const [prevUser, setPrevUser] = useState('')
  const [seluser, setSelUser] = useState('')
  const [selfullname, setSelFullName] = useState('')
  const [prevFullname, setPrevFullName] = useState('')
  const [authUser, setAuthUser] = useState('')
  const [admin, setAdmin] = useState(false)
  const [password, setPassword] = useState('')
  const [vpassword, setVPassword] = useState('')
  const [viewpassword, setViewPassword] = useState(<FaEye className='eye' />)
  const [viewpassword2, setViewPassword2] = useState(<FaEye className='eye' />)
  const [fullname, setFullname] = useState('')
  const [enabled, setEnabled] = useState('')
  const [prevEnabled, setPrevEnabled] = useState('')

  const navigate = useNavigate()
  const { id } = useParams()
  const pwdInput = document.getElementById('pwdInput')
  const pwdVInput = document.getElementById('pwdVInput')

  useEffect(() => {
    try {
      const verifyUser = async () => {
        const res = await axios.get(`${server}`)
        if (res.data.verified === true) {
          if (res.data.user === 'admin') {
            setAdmin(true)
          }
          getname(res.data.fullname)
          return
        } else {
          navigate('/login')
        }
      }

      verifyUser()
      getUserById()
      focus()

    } catch (error) {
      notify('err', <p>{error}</p>)
    }
  }, [])

  const getUserById = async () => {
    const stateSwitch = document.getElementById('userState')
    const stateLabel = document.getElementById('userStateLabel')

    try {
      const res = await axios.get(URI + id)
      setUser(res.data.user)
      setSelUser(res.data.user)
      setAuthUser(res.data.authUser)
      setFullname(res.data.fullname)
      setSelFullName(res.data.fullname)
      setEnabled(res.data.enabled)
      setPrevEnabled(res.data.enabled)
      setPrevUser(res.data.user)
      setPrevFullName(res.data.fullname)
      
      if (res.data.user === 'admin') {
        try {
          if (res.data.enabled === true) {
            stateSwitch.checked = true
            stateLabel.innerHTML = 'Activo'
          } else {
            stateSwitch.checked = false
            stateLabel.innerHTML = 'Inactivo'
          }
        } catch (error) {
          console.log(error)
        }
      } 
    } catch (error) {
      navigate(`/edit/${error.response.data.authId}`)
      window.location.reload(true)
    }
  }

  const focus = () => {
    const pwdInput = document.getElementById('pwdInput')
    if (pwdInput !== null) {
      pwdInput.focus()
    }
  }

  const checkState = () => {

    const stateSwitch = document.getElementById('userState')
    const stateLabel = document.getElementById('userStateLabel')

  if (stateSwitch !== null){

    if (enabled === true) {
      stateSwitch.checked = false
      stateLabel.innerHTML = 'Inactivo'
      setEnabled(false)
    } else {
      stateSwitch.checked = true
      stateLabel.innerHTML = 'Activo'
      setEnabled(true)
    }
  }
  }
  
  const showPassword = () => {
    const pwd = document.getElementById('pwdInput')
    if (pwd.type === 'password') {
      pwd.type = 'text'
      setViewPassword(<FaEyeSlash className='eye' />)
    } else {
      pwd.type = 'password'
      setViewPassword(<FaEye className='eye' />)
    }
  }

  const showVPassword = () => {
    const pwd = document.getElementById('pwdVInput')
    if (pwd.type === 'password') {
      pwd.type = 'text'
      setViewPassword2(<FaEyeSlash className='eye' />)
    } else {
      pwd.type = 'password'
      setViewPassword2(<FaEye className='eye' />)
    }
  }

  // Validate data
  ValidateAll('.form-control', seluser, selfullname)

  // Clear unsafe passwords
  if (pwdInput && pwdVInput) {
    const pwdFields = document.querySelectorAll('.pwdfield')

    pwdFields.forEach(field => {
      switch (field.id) {
        case 'pwdInput':
          field.addEventListener('focusout', (e) => {
            if (e.target.value === '') setPassword('')
          })
          break
        case 'pwdVInput':
          field.addEventListener('focusout', (e) => {
            if (e.target.value === '') setVPassword('')
          })
          break
        default:
      }
    })
  }

  const updateUser = async (e) => {
    e.preventDefault()

    const difUser = prevUser !== user
    const difEnabled = prevEnabled !== enabled
    const difFullname = prevFullname !== fullname

    if (password !== vpassword) {
      notify('inf', <p>Las contraseñas no coinciden</p>)
      pwdInput.value = ''
      pwdVInput.value = ''
      setPassword('')
      setVPassword('')
      pwdInput.focus()
    } else if ((difUser || difFullname || difEnabled) && (password === '' && vpassword === '')) {
      await axios.patch(URI + id + '/nopwd', { user, fullname, enabled })
      notify('ok', <p>Datos de <span style={{ fontWeight: 'bold' }}>{fullname.split(' ')[0]}</span> actualizados</p>)
      authUser === 'admin' ? navigate('/') : logOut()
    } else if ((!difUser && !difFullname && !difEnabled) && (password === '' && vpassword === '')) {
      notify('ok', <p>Sin cambios realizados</p>)
      authUser === 'admin' ? navigate('/') : logOut()
    } else if (password === vpassword) {
      await axios.patch(URI + id, { user, fullname, password, enabled })
      notify('ok', <p>Datos de <span style={{ fontWeight: 'bold' }}>{fullname.split(' ')[0]}</span> actualizados</p>)
      authUser === 'admin' ? navigate('/') : logOut()
    }
  }

  const logOut = async () => {
    try {
      localStorage.removeItem('token')
      localStorage.removeItem('Theme')
      window.location.reload(true)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      {!authUser ? <CompLoader /> :
        <div className='editBox '>
          <div className='container editUser shadow-sm'>
            <h1 className='sessionTitle fw-bold mb-3'>{admin & seluser !== 'admin' ? 'Editar datos del usuario' : 'Cambiar contraseña'}
            </h1>
            <br />
            <form id='editUser' onSubmit={updateUser}>
              <div className='input-group mb-3'>
                <span className='input-group-text' id='inputGroup-sizing-default'>Usuario</span>
                <input
                  id='userInput'
                  name='user'
                  className='form-control'
                  value={user}
                  onChange={(e) => setUser(e.target.value.toLowerCase())}
                  type='text'
                  disabled={user === 'admin' || !admin ? true : false}
                  data-frminfo='user'
                />
              </div>
              <div className='input-group mb-3'>
                <span className='input-group-text' id='inputGroup-sizing-default'>Nombre y Apellidos</span>
                <input
                  id='nameInput'
                  className='form-control'
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                  type='text'
                  disabled={user === 'admin' || !admin ? true : false}
                  data-frminfo='fullname'
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Contraseña</span>
                <input id='pwdInput' name='pwdInput'
                  type="password"
                  data-frminfo='password'
                  className="form-control pwdfield"
                  placeholder='********'
                  onChange={(e) => setPassword(e.target.value)} />
                <span className="input-group-text" id="showPwd" onClick={showPassword}>{viewpassword}</span>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text"> Confirmar&nbsp;</span>
                <input id='pwdVInput' name='pwdVInput'
                  type="password"
                  data-frminfo='password'
                  className="form-control pwdfield"
                  placeholder='********'
                  onChange={(e) => setVPassword(e.target.value)} />
                <span className="input-group-text" id="showPwd" onClick={showVPassword}>{viewpassword2}</span>
              </div>
              <div className='form-switch' hidden={user === 'admin' || !admin ? true : false} >
                <input className='form-check-input' id='userState' name='userState' type='checkbox' role='switch' onChange={checkState} disabled={admin ? false : true} checked={enabled ? true : false} /> &nbsp; &nbsp;
                <label className='form-check-label' id='userStateLabel' htmlFor='userState'>{enabled ? "Activo" : "Inactivo"}</label>
              </div>
              <br />
              <div className='formButtons'>
                <button
                  type='button' id='btnCancel' className='btn btn-secondary' onClick={admin ? () => navigate('/') : logOut}
                >
                  Cancelar
                </button>
                <button type='submit' id='btnSave' className='btn btn-success'>
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      }
    </>
  )
}

export default CompEditUser
