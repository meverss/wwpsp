import { useState, useCallback, useMemo } from 'react'
import { nanoid } from 'nanoid'
import { FaCircleCheck, FaTriangleExclamation } from "react-icons/fa6"
import { IoInformationCircle } from "react-icons/io5"
import { PiGearFill } from "react-icons/pi"

let ids = []

// Single notification component
const NotificationItem = ({ id, type, title, message, duration, onClose })=> {
  let icon
  switch (type) {
    case "ok":
      icon = <FaCircleCheck className="ntf_icon" style={{ fontSize:'30px', color: 'green' }} />
      break
    case "err":
      icon = <FaTriangleExclamation className="ntf_icon" style={{ fontSize:'28px',color: 'red' }} />
      break
    case "inf":
      icon = <IoInformationCircle className="ntf_icon" style={{ fontSize:'40px',color: 'yellow', left: '3px' }} />
      break
    case "sys":
      icon =  <PiGearFill className="ntf_icon" style={{ fontSize:'30px',color: 'chocolate' }} />
      break
    default:
      icon = <IoInformationCircle className="ntf_icon" style={{ fontSize:'40px',color: 'yellow', left: '3pc' }} />
  }

  if(!ids.includes(id)) ids=[...ids, id] //ids.push(id)

  return (
	<>
    <div className={ids.includes(id) ? "ntf_box" : "ntf_box animate-show"} id={id}>
      <div className="ntf_msg">
      	<div className="ntf_bar">
      	  {icon}
      	  <h3 className="ntf_title">{title}</h3>
      	  <p className="ntf_close" onClick={onClose}>x</p>
        </div>
        <div className="ntf_text">
          <p className="ntf_message">{message}</p>
        </div>
      </div>
    </div>
    </>
  )
}

// Main hook
export const useNotify = ()=> {
  const [notifications, setNotifications] = useState([])

  const removeNotification = useCallback((id)=> {
	const msg = document.getElementById(id)
	if(msg){
	  msg.classList.add('animate-hide')
  	  setTimeout(()=> setNotifications(prev => prev.filter(n => n.id !== id) || prev), 300)
	}
  }, [])

  const showNotification = useCallback((type, message, options = {})=> {
    const id = nanoid()
    const title = options.title || 'Notification'
    const duration = options.duration || 5000
    
    setNotifications(prev => [
      ...prev, { id, type, title, message, duration }
    ])
    
    // Auto-delete after 'duration'
    setTimeout(()=> {
  	  if(document.getElementById(`${id}`)){
	  }
      setTimeout(()=> removeNotification(id, duration), 1000)
    }, duration)
  }, [removeNotification])
  
  
  // Container for ALL notifications
  const NotificationsContainer = useMemo(()=> {
    return ()=> (
      <section className="s_notifications" id="s_notifications" >
        {notifications.map(notification => (
          <NotificationItem
            key={notification.id}
            id={notification.id}
            type={notification.type}
            title={notification.title}
            message={notification.message}
            duration={notification.duration}
            onClose={()=> removeNotification(notification.id)}
          />
        ))}
      </section>
    )
  }, [notifications, removeNotification])

  return { showNotification, NotificationsContainer }
}