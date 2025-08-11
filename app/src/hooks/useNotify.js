import { useState, useRef } from 'react'
import { FaCircleCheck, FaTriangleExclamation } from "react-icons/fa6"
import { IoInformationCircle } from "react-icons/io5"
import { PiGearFill } from "react-icons/pi"

export const useNotify = ()=> {
  const [notifyIcon, setNotifyIcon] = useState('')
  const [notifyText, setNotifyText] = useState('')

  const ntf_popup = useRef()
  const ntf_box = useRef()
  const ntf_msg = useRef()
  const ntf_icon = useRef()
  const ntf_text = useRef()

  const showNotification = (notiType?, message?)=> {
	const setIcon = (icon)=> {
        setNotifyIcon(
          <div id="ntf_icon" className="ntf_icon">
            {icon}
          </div>
        )
	}

	const ok = <FaCircleCheck style={{ fontSize:'50px', color: 'green' }} />
	const error = <FaTriangleExclamation style={{ fontSize:'50px',color: 'red' }} />
	const info = <IoInformationCircle style={{ fontSize:'50px',color: 'yellow' }} />
	const system = <PiGearFill style={{ fontSize:'50px',color: 'chocolate' }} />

    switch (notiType) {
      case "ok":
        setIcon(ok)
        break
      case "err":
        setIcon(error)
        break
      case "inf":
        setIcon(info)
        break
      case "sys":
        setIcon(system)
        break
      default:
        setIcon(info)
        break
    }

    setNotifyText(<p>{message ? message : '<No notifications>'}</p>)
	ntf_box.current.style['display'] = 'flex'
	ntf_box.current.style['flexDirection'] = 'column'	
	setTimeout(()=> {
  	  ntf_box.current.style['transform'] = 'translate(-2%)'
    }, 300)
    setTimeout(() => {
      ntf_box.current.style['transform'] = 'translate(102%)'
  	  setTimeout(()=> {
  		ntf_box.current.style['display'] = 'none'
  	  },500)
    }, 5000)
  }
  
  return { ntf_popup, ntf_box, ntf_msg, ntf_icon, ntf_text, notifyIcon, notifyText, showNotification }
}