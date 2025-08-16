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

const CompPortfolio = ({ ss, mediaServer, showNotification, reviews })=> {
  const server = useContext(serverContext)
  const URI = `${server}/albums/`
  
  const [albums, setAlbums] = useState()
  const [videos, setVideos] = useState()
  const [isPreview, setIsPreview] = useState(true)
  const [activeImage, setActiveImage] = useState()
  const [isZoomed, setIsZoomed] = useState(false)
  const [activeTag, setActiveTag] = useState('images_tag')
  const [selectedAlbum, setSelectedAlbum] = useState('')
  const [imagesToView, setImagesToView] = useState([])
  const [videoToPlay, setVideoToPlay] = useState('')
  
  let albumsThumbnails = document.querySelectorAll('.album_thumbnail')
  let images = []
  let imagesLoaded = -1
  
  const imagesTag = useRef()
  const videosTag = useRef()
  const imageViewer = useRef()
  const videoPlayer = useRef()
  
  useEffect(()=> {
	getAlbums()
  },[])

  const getAlbums = async ()=> {
	try{
	  const images = await axios.get(URI + 'images')
	  const videos = await axios.get(URI + 'videos')
	  setAlbums(images.data)
	  setVideos(videos.data)
	} catch( err){
	  showNotification('err', 'Sorry, something went wrong retriving media', {title: 'Error'})
	}
  }

  // Show page
  const pageContent = useRef()
  const loaderContainer = document.querySelectorAll('.loader_container')//useRef('')
  
  const showPage = ()=> {
	pageContent.current.style.opacity = "1"
	document.body.style.overflowY = "scroll"
	loaderContainer.forEach((lc)=> {
	  lc.style.display = 'none'
	})
  }

  useEffect(() => {
	const imageLoaded = ()=> {
  	  const gsp = document.querySelector('.gossip')
  	  const loaderPercentBar = document.querySelector('.loaderPercentBar')
  	  imagesLoaded ++

  	  let loadingPercent = `${Math.ceil(imagesLoaded / images.length * 100)}%`
  	  loaderPercentBar.style.width = loadingPercent
  	  //gsp.innerText = `${imagesLoaded} | L: ${images.length} | ${loadingPercent}`
	  setTimeout(()=> {
  		loaderPercentBar.style.width = '100%'
  		setTimeout(()=> {
  		  showPage()
  		},2000)
	  },10000)
	}

	if((albums?.length > 0) && (videos?.length > 0)) imagesLoaded += 1

	const checkLoadedMedia = ()=> {
	  images = document.querySelectorAll('img')	
	  images.forEach((image)=>{
  		if(image.complete) imageLoaded()
	  })
	}

	document.addEventListener("DOMContentLoaded", checkLoadedMedia())
    if(imagesLoaded === images.length){
    setTimeout(()=> {
  	  showPage()
    },2000)
  }
  },[images])

  // Theme switch  
  useEffect(() => {
	const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
	const handler = ()=> getAlbums()
  
	systemTheme.addEventListener('change', handler)
	return ()=> systemTheme.removeEventListener('change', handler)
  }, [])
  
  const setMediaCardDelay = (mediaType)=> {
	const medias = document.querySelectorAll(mediaType)

	if(medias.length > 0){
	  let delay = 0
	  medias.forEach((media)=> {
		media.style.animationDelay = `${delay}s`
		delay += 0.1
	  })
	}
  }
  
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

  // Switch media tags
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
	  setMediaCardDelay('.mediaImagesAlbum')
  	  toggleTags(imagesTagElement, videosTagElement)
  	  document.querySelector('.images_box').style.display = 'flex'
  	  document.querySelector('.videos_box').style.display = 'none'
	} else if(activeTag === 'videos_tag') {
	  setMediaCardDelay('.mediaVideo')
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
	
	setIsZoomed((prev)=> !prev)
	if(!isZoomed){
	  scrollingBox.style.overflowX = 'hidden'
	  scrollingIndicator.style.display = 'none'
	  closeBtn.style.display = 'none'
	  scrollingBox.style.width = '100%'
	  cardDiv.style.transform = 'scale(1.05)'
	} else {
	  scrollingBox.style.overflowX = 'scroll'
	  scrollingBox.style.width = '80%'
	  cardDiv.style.transform = 'scale(1)'
	  setTimeout(()=> {
		closeBtn.style.display = 'flex'
		scrollingIndicator.style.display = 'flex'
	  },100)
	}
  }

  useEffect(()=> {
	const videosFiles = document.querySelectorAll('.video')

	if(videosFiles.length){
	  if(isPreview){
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
	}
  },[videos])
  
  const videoPlayerWindow = (opt)=> {
	const videoPlayer = document.querySelector('.videoPlayer')
	const video = document.querySelector('.videoPlaying')

	if(opt === videoToPlay){
	  setIsPreview(false)
	  videoPlayer.style.display = 'flex'
	  video.muted = false
	  video.play()
	} else if(opt === 'close'){
	  videoPlayer.style.animation = 'fadeOut 0.3s forwards'
	  setTimeout(()=> {
		setIsPreview(true)
		setVideoToPlay()
		videoPlayer.style.display = 'none'
		videoPlayer.style.animation = 'fadeIn 0.3s forwards'
	  }, 500)
	}
  }

  return (
    <>
  	  <CompMenu ss={ss} />
  	  <div className="main" ref={pageContent}>
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
    			  className="images_album mediaImagesAlbum animFadeIn"
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
          				loading="lazy"
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
          				loading="lazy"
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
				  <div className="video_thumbnail mediaVideo animFadeIn" id={video.id} key={video.id}>
					<video className="video" id={`video_${index + 1}`} alt={`video_${index + 1}`} muted autoplay={index === 0 ? 'true' : null}
					src={`${mediaServer}/media/videos/${video.name}`} />
					<img className="video_frame" id="video_frame_${id}" src="../media/images/video_frame.webp" alt="frame" data-src="${path}" 
					onMouseEnter={()=> setVideoToPlay(video.name)}
					onMouseLeave={()=> setVideoToPlay()}
					onClick={()=> videoPlayerWindow(video.name)} />
				  </div>
				  </>
				))
				}
			</div>
			{/* Video player */}
			<div className="videoPlayer" id="videoPlayer" ref={videoPlayer}>
			  <div className="video_player_back">
				<span className="closeButton"><IoMdCloseCircleOutline 
				  onClick={()=> videoPlayerWindow('close')}/>
				</span>
				<div id="video_player_box" className="video_player_box">
				  <video id="videoPlaying" className="videoPlaying" controls
				  src = {`${mediaServer}/media/videos/${videoToPlay}`} />
				</div>
			  </div>
			</div>
		  </div>
		</section>
	  </div>
    </>
  )
}

export default CompPortfolio