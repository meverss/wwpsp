import axios from '../libs/axios.js'
import { useState, useContext } from 'react'
import { useNavigate} from 'react-router-dom'
import { serverContext } from '../App.js'

export const useVerify = () => {
    const [id, setId] = useState('')
    const [authUser, setAuthUser] = useState('')
    const [authFullname, setAuthFullName] = useState('')
    const [admin, setAdmin] = useState(true)

    const server = useContext(serverContext)
    const navigate = useNavigate()

    const verify = async () => {
	try {
	    const res = await axios.get(`${server}`)
		if (res.data.verified === true) {
		    if (res.data.user !== 'admin') {
		        setAdmin(false)
		    }
		    setId(res.data.id)
		    setAuthUser(res.data.user)
		    setAuthFullName(res.data.fullname)
		} else {
		    navigate('/login')
		}
	} catch (error) {
	    console.log(error)
	}
    }

    verify()

    return { id, authUser, authFullname, admin }
}
