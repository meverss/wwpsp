/* eslint-disable react-hooks/exhaustive-deps */
import axios from '../libs/axios.js'
import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { ValidateAll } from '../components/Validators.js'
import { serverContext } from '../App'
import CompNoAuth from './CompNoAuth.js'

const CompCreateUser = ({ getname, notify }) => {

  const server = useContext(serverContext)
  const URI = `${server}/users/`

  const [user, setUser] = useState('')
  const [id, setId] = useState('')
  const [admin, setAdmin] = useState(true)
  const [password, setPassword] = useState('')
  const [vpassword, setVPassword] = useState('')
  const [fullname, setFullname] = useState('')
  const [available, setAvailable] = useState([])

  const pwdInput = document.getElementById('pwdInput')
  const pwdVInput = document.getElementById('pwdVInput')

  const navigate = useNavigate()

  useEffect(() => {
    try {
      const verifyUser = async () => {
        const res = await axios.get(`${server}`)
        if (res.data.verified === true) {
          if (res.data.user !== 'admin') {
            setAdmin(false)
          }
          setId(res.data.id)
          getname(res.data.fullname)
          return
        } else {
          navigate('/login')
        }
      }
      verifyUser()
    } catch (error) {
      console.log(error)
    }

    checkUser()
  }, [getname, navigate])

  const checkUser = async () => {
    try {
      await axios.get(URI)
    } catch (error) {
    }
  }

  const searchAvailable = async (filter) => {
    try {
      const res = await axios.get(URI + `search/available?user=${filter}`)
      setAvailable(res.data.available)
    } catch (error) {
      console.log(error)
    }
  }

  // Validate data
  ValidateAll('.form-control', null, null)

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


  const save = async (e) => {
    try {
      e.preventDefault()
      if (available === false) {
        notify('inf', <p>El usuario <span style={{ fontWeight: 'bold' }}>{user}</span> ya existe</p>)
      } else if (user === '' || fullname === '' || password === '') {
        notify('inf', <p>Debe proporcionar todos los datos</p>)
      } else if (password !== vpassword) {
        notify('inf', <p>Las contraseñas no coinciden</p>)
      } else {
        await axios.post(URI, { user, password, fullname })
        notify('ok', <p>Agregado el usuario <span style={{ fontWeight: 'bold' }}>{fullname.split(' ')[0]}</span></p>)
        navigate('/')
      }
    } catch (error) {
      notify('err', <p>{error}</p>)
    }
  }
  
  return (
    <>
      {
        admin ?
          <div className='createBox'>
            <div className='container createUser shadow-sm'>
              <h1 className='sessionTitle fw-bold mb-3'>Crear nuevo Usuario</h1>
              <br />
              <form onSubmit={save}>
                <div className='input-group mb-3'>
                  <span className='input-group-text' id='inputGroup-sizing-default'>Usuario</span>
                  <input
                    className='form-control pwdfield'
                    value={user}
                    onChange={(e) => setUser(e.target.value.toLowerCase())}
                    onKeyUp={(e) => searchAvailable(e.target.value.toLowerCase())}
                    type='text'
                    data-frminfo='user'
                  />
                </div>
                <div className='input-group mb-3'>
                  <span className='input-group-text' id='inputGroup-sizing-default'>Nombre y Apellidos</span>
                  <input
                    className='form-control pwdfield'
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                    type='text'
                    data-frminfo='fullname'
                  />
                </div>
                <div className='input-group mb-3'>
                  <span className='input-group-text' id='inputPasswd'>Contraseña</span>
                  <input id='pwdInput'
                    className='form-control pwdfield'
                    value={password}
                    placeholder='********'
                    onChange={(e) => setPassword(e.target.value)}
                    type='password'
                    data-frminfo='password'
                  />
                </div>
                <div className='input-group mb-3'>
                  <span className='input-group-text' id='inputVPasswd'>Verificación</span>
                  <input id='pwdVInput'
                    className='form-control pwdfield'
                    value={vpassword}
                    placeholder='********'
                    onChange={(e) => { setVPassword(e.target.value) }}
                    type='password'
                    data-frminfo='password'
                  />
                </div>

                <br />
                <div className='formButtons'>
                  <button
                    type='button' className='btn btn-secondary' onClick={() => navigate('/') }
                  >
                    Cancelar
                  </button>
                  <button type='submit' className='btn btn-success'>
                    Guardar
                  </button>
                </div>
              </form>
            </div>
          </div>
          :
	<CompNoAuth />
      }
    </>
  )
}

export default CompCreateUser
