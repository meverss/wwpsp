/* eslint-disable react-hooks/exhaustive-deps */
import axios from '../libs/axios.js'
import notfound from '../images/404.webp'
import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { serverContext } from '../App'
import { CompLoader } from '../components/CompLoader'

const token = localStorage.getItem("token")
const CompPageNotFound = () => {

  const server = useContext(serverContext)

  const [id, setId] = useState('')
  const [user, setUser] = useState('')  
  const navigate = useNavigate()

  useEffect(() => {
    const verifyUser = async () => {
      const res = await axios.get(`${server}`)
      if (res.data.verified === true) {
        setId(res.data.id)
        setUser(res.data.user)
        return
      } else {
        navigate('/login')
      }
    }
    verifyUser()
  }, [])


  return (
    <>
      {!id ? <CompLoader /> : null}
      <div className='unauthCont'>
        <div className='unauthImage '>
          <a href={user === 'admin' ? '/' : `/edit/${id}`} ><img className='animate__animated animate__fadeIn' src={notfound} alt='Page not found'></img></a>
          <br />
        </div>
        <span className='notFoundText' style={{
          fontSize: window.innerWidth <= 420 ? '20px' : '36px'
        }}>
          <p>PÁGINA NO ENCONTRADA</p>
        </span>
      </div>

    </>
  )
}

export default CompPageNotFound
