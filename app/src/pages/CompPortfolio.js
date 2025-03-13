/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios'
import { CompMenu } from '../components/CompMenu.js'
import { useState, useEffect, useRef, useContext } from 'react'
import { serverContext } from '../App.js'
import { formatDate } from '../libs/formatDate.js'
import { FaRegImages } from "react-icons/fa6"
import { GiPhotoCamera, GiFilmSpool } from "react-icons/gi"
import { IoMdCloseCircleOutline, IoMdCloseCircle } from "react-icons/io"
import { ImPrevious, ImNext } from "react-icons/im"
import { RxDotFilled } from "react-icons/rx"

const CompPortfolio = ({ ss, mediaServer, notify })=> {
  const server = useContext(serverContext)
  const URI = `${server}/albums/`
  
  const [albums, setAlbums] = useState()
  const [videos, setVideos] = useState()
  const [activeImage, setActiveImage] = useState()
  const [isZoomed, setIsZoomed] = useState(false)
  const [activeTag, setActiveTag] = useState('images_tag')
  const [selectedAlbum, setSelectedAlbum] = useState('')
  const [imagesToView, setImagesToView] = useState(0)
  const [videoToPlay, setVideoToPlay] = useState()
  
  let albumsThumbnails = document.querySelectorAll('.album_thumbnail')
  
  const imagesTag = useRef()
  const videosTag = useRef()
  const imageViewer = useRef()
  const videoPlayer = useRef()
  
  useEffect(()=> {
	getAlbums()
  },[])

  const getAlbums = async ()=> {
	try {
	  const images = await axios.get(URI + 'images')
	  setAlbums(images.data)
	  const videos = await axios.get(URI + 'videos')
	  setVideos(videos.data)
	} catch (err) {
	  notify('err', err)
	}
  }

  useEffect(() => {
	const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
	const handler = ()=> getAlbums()
  
	systemTheme.addEventListener('change', handler)
	return ()=> systemTheme.removeEventListener('change', handler)
  }, [])
  
  useEffect(()=>{
	const medias = document.querySelectorAll('.media')

	if(medias.length > 0){
	  let delay = 0
	  medias.forEach((media)=> {
		media.style.animationDelay = `${delay}s`
		delay += 0.1
	  })
	}
  },[albums, videos])
  
  const handleAlbumHover = (albumId, lastIndex, e) => {
	setSelectedAlbum(albumId)
	const getRandomRotation = () => {
  	  const sign = Math.random() > 0.5 ? 1 : -1
  	  return sign * Math.floor(Math.random() * 12)
	}

	let ang1 = getRandomRotation()
	let ang2 = Math.sign(ang1) === -1 ? Math.ceil(Math.random() * 12) : Math.ceil(Math.random() * 12) * -1
	let ang3 = getRandomRotation()

	const elements = e.currentTarget.children
	elements[lastIndex].style.transform = `rotate(${ang1}deg) scale(1.25)`
	elements[lastIndex - 1].style.transform = `rotate(${ang2}deg) scale(1.25)`
	elements[lastIndex - 2].style.transform = `rotate(${!(ang3 !== ang2 && !ang3 !== ang1) ? ang2 - 3 : ang3}deg) scale(1.25)`
  }

  const handleAlbumLeave = (lastIndex, e) => {
	setSelectedAlbum('')
	const elements = e.currentTarget.children
	elements[lastIndex].style.transform = 'rotate(0deg) scale(1)'
	elements[lastIndex - 1].style.transform = 'rotate(0deg) scale(1)'
	elements[lastIndex - 2].style.transform = 'rotate(0deg) scale(1)'
  }

  useEffect(()=> {
	const imagesTagElement = imagesTag.current
	const videosTagElement = videosTag.current

	const toggleTags = (active, inactive)=> {
  	  active.classList.remove('tag_inactive')
  	  active.classList.add('tag_active')
  	  active.firstElementChild.style.color = '#eee'
  	  inactive.classList.remove('tag_active')
  	  inactive.classList.add('tag_inactive')
  	  inactive.firstElementChild.style.color = '#777'
	}

	if(activeTag === 'images_tag'){
  	  toggleTags(imagesTagElement, videosTagElement)
  	  document.querySelector('.images_box').style.display = 'flex'
  	  document.querySelector('.videos_box').style.display = 'none'
	} else if(activeTag === 'videos_tag') {
  	  toggleTags(videosTagElement, imagesTagElement)
  	  document.querySelector('.videos_box').style.display = 'flex'
  	  document.querySelector('.images_box').style.display = 'none'
	}
  }, [activeTag])
  
  // Image Albums
  const openAlbum = (e, album)=> {
	const imageViewer = document.querySelector('.imageViewer')

	if(selectedAlbum === album.id){
	  setImagesToView(album.medias)
	  imageViewer.style.display = 'flex'

	  setTimeout(()=> {
	  	const scrollingBox = document.getElementById('image_scrolling_box')
		const firstCard = document.querySelector('#image_card_2')
		const imagesCards = document.querySelectorAll('.image_card_div')
		const parentRectLeft = Math.ceil(scrollingBox.getBoundingClientRect().left)
		const closeBtn = document.querySelector('.closeButton')

		scrollingBox.scrollTo({left: 0})

  		
		const getShownCard = ()=> {
  		  closeBtn.style.right = `${parentRectLeft + 20}px`

		  imagesCards.forEach((card)=> {
			const cardRectLeft = Math.ceil(card.getBoundingClientRect().left)
			
			if( cardRectLeft >= parentRectLeft - 100 && cardRectLeft <= parentRectLeft + 200){
			  setActiveImage(Number(card.id.split('_')[2]))
			  card.style.transform = 'scale(1)'
			  card.style.filter = 'grayScale(0%)'
			} else {
			  card.style.transform = 'scale(0.7)'
			  card.style.filter = 'grayScale(100%)'
			}
		  })
		}
		getShownCard()

		scrollingBox.addEventListener('scroll', ()=> {
		  getShownCard()
		  return scrollingBox.removeEventListener('scroll', ()=>  getShownCard())
		})
	  }, 10)
	}
  }
  
  const closeAlbum = ()=> {
	const imageViewer = document.querySelector('.imageViewer')	
	const imagescrollingBox = document.querySelector('.image_scrolling_box')

	imageViewer.style.animation = 'fadeOut 0.3s forwards'
	setTimeout(()=> {
	  imageViewer.style.display = 'none'
	  imageViewer.style.animation = 'fadeIn 0.3s forwards'
	  setImagesToView([])
	}, 500)
  }
  
  const zoomImage = (e)=> {
	const cardDiv = e.target.parentElement
	const scrollingBox = document.querySelector('.image_scrolling_box')
	const scrollingIndicator = document.querySelector('.scrolling_indicator')
	const closeBtn = document.querySelector('.closeButton')
	
	if(!isZoomed){
	  scrollingBox.style.overflowX = 'hidden'
	  scrollingIndicator.style.display = 'none'
	  closeBtn.style.display = 'none'
	  cardDiv.style.transform = 'scale(1.1)'
	  scrollingBox.style.width = '100%'
	} else {
	  scrollingBox.style.overflowX = 'scroll'
	  scrollingIndicator.style.display = 'flex'
	  closeBtn.style.display = 'flex'
	  cardDiv.style.transform = 'scale(1)'
	  scrollingBox.style.width = '80%'
	}
	setIsZoomed((prev)=> !prev)
  }

  useEffect(()=> {
	const videosFiles = document.querySelectorAll('.video')

	if(videosFiles.length){
	  videosFiles.forEach((video, index)=> {
		let nextVideo = document.getElementById(`video_${index + 2}`)
	  	
		video.addEventListener('pause', ()=> {
		  const showPoster = ()=> {
			video.poster = '../media/images/video_file_6.png'
			video.currentTime = 0
		  }
		  showPoster()
		  return video.removeEventListener('pause', ()=> showPoster())
		})
	  	
		video.addEventListener('loadedmetadata', () => {
		  video.addEventListener('timeupdate', () => {
			const currentTime = Math.floor(video.currentTime)
			if(currentTime === 5){
			  video.pause()
			  nextVideo?.play()
			}
			return video.removeEventListener('timeupdate', null)
		  })
		  return video.removeEventListener('loadedmetadata', null)
		})
	  })
	}
  },[videos])
  
  const playVideo = (video)=> {
	const media = document.getElementById(video)
	if(media.paused || media.ended){
	  media.play()
	} else {
	  media.pause()
	}
  }

  return (
    <>
  	  <CompMenu ss={ss} />
  	  <div className="main">
		<section className="s_portfolio" id="s_portfolio">
		  <h2 className="portfolio_title" id="portfolio_title">Portfolio</h2><br />
		  <div className="portfolio_box" id="portfolio_box">
			<div className="media_tags" id="media_tags">
			  <div className="images_tag media_tag" id="images_tag" ref={imagesTag}
				onClick={()=> setActiveTag('images_tag')}>
				<h3 id="imagesLabel"><GiPhotoCamera className="tagIcon" />&nbsp;Images</h3>
			  </div>
			  <div className="videos_tag media_tag" id="videos_tag" ref={videosTag}
				onClick={()=> setActiveTag('videos_tag')}>
				<h3 id="videosLabel"><GiFilmSpool className="tagIcon" />&nbsp;Videos</h3>
			  </div>
			</div>
			<div className="images_box box" id="images_box" style={{justifyContent: !albums ? 'center' : 'space-between'}}>
		  { !albums ?
			<span className="no_images"><GiPhotoCamera /></span>
			:
			albums && albums.map((album) => {
			  const lastIndex = album.medias.length - 1
			  return (
  				<div
    			  key={album.id}
    			  id={`images_album_${album.name}`}
    			  className="images_album media animate__animated animate__fadeIn"
    			  onMouseEnter={(e)=> handleAlbumHover(album.id, lastIndex, e)}
    			  onMouseLeave={(e)=> handleAlbumLeave(lastIndex, e)}>
    			  {album && album.medias.map((image, index) => (
      				<div
        			  key={`${album.id}-${image.name}`}
        			  id={`Album_${album.name}_Image_${index + 1}`}
        			  className={`album_thumbnail ${index >= lastIndex - 2 ? 'stacked' : ''}`}
        			  onClick={(e)=> openAlbum(e, album)} >
        			  <img
          				id={`Image_${index + 1}`}
          				src={`${mediaServer}/media/images/portfolio/${image.album}/${image.name}`}
          				alt={image.name} />
      				  </div>
    				  ))}
  					</div>
					)
				  })}
				</div>
				
			{/* Images viewer*/}
			<div className="imageViewer" id="imageViewer" ref={imageViewer}>
			  <div className="RedLine"></div>
			  <div className="image_scrolling_back">
				<span className="closeButton"><IoMdCloseCircleOutline 
				  onClick={closeAlbum}/>
				</span>
				<div id="image_scrolling_box" className="image_scrolling_box">
				  { imagesToView && imagesToView.map((image, index)=> (
					<div id={`image_card_${index + 1}`} className="image_card_div" key={image.id}>
					  <img
          				id={`image_${index + 1}`}
          				classNsme="image_card"
          				onClick={(e)=> zoomImage(e)}					  
          				src={`${mediaServer}/media/images/portfolio/${image.album}/${image.name}`} />
					</div>
				  ))}
				</div>
				<div id="scrolling_indicator" className="scrolling_indicator" >
				  { imagesToView && imagesToView.map((image, index)=> (
					<p className={`scrollingDot ${activeImage === index + 1 ? 'scrollingDotActive' : null}`}><RxDotFilled /></p>
				  ))}
				</div>
			  </div>
			</div>
		
			{/* video box */}
			<div className="videos_box box" id="videos_box" style={{justifyContent: !videos ? 'center' : 'space-between'}}>
			  { !videos ?
				<span className="no_videos"><GiFilmSpool /></span>
				:
				videos[0].medias.map((video, index)=> (
				  <>
				  <div className="video_thumbnail media animate__animated animate__fadeIn" id={video.id} key={video.id}>
					<video className="video" id={`video_${index + 1}`} alt={`video_${index + 1}`} muted autoplay={index === 0 ? 'true' : null}
					src={`${mediaServer}/media/videos/${video.name}`}
					poster='../media/images/video_file_1.png' />
					<img className="video_frame" id="video_frame_${id}" src="../media/images/video_frame.webp" alt="frame" data-src="${path}" 
					onClick={()=> playVideo(`video_${index + 1}`)}/>
				  </div>
				  </>
				))
				}
			</div>
			{/* Video player */}
			<div className="videoPlayer" id="videoPlayer" ref={videoPlayer}>
			  {/* video player here*/}
			</div>
		  </div>
		</section>
	  </div>
    </>
  )
}

export default CompPortfolio