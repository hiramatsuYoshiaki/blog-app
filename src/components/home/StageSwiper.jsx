import React,{useState} from 'react'
// import {useDispatch} from  'react-redux'
// import {push} from 'connected-react-router'
import Swiper from 'react-id-swiper'
// import NoImage from '../../assets/img/no_image.jpg'
import 'swiper/swiper.scss'
// import 'swiper/components/navigation/navigation.scss';
// import 'swiper/components/pagination/pagination.scss';
// import 'swiper/components/scrollbar/scrollbar.scss';

const StageSwiper = props => {
    // const dispatch = useDispatch()
    const [params] = useState({
        pagination:{
            el:'.swiper-pagination',
            type: 'bullets',
            clickable:true,
            dynamicBullets: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          },
        loop:true,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false
        },
        // spaceBetween: 30,
        // centeredSlides: true,
    })
    const stages = props.stages
    return (
        <div className="c-stagehome-box">
            <Swiper {...params} > 
                    {stages.length > 0 &&(
                        stages.map(stage =>(
                            <span  key={stage.id} className="c-stragehome-image-wrape" >
                                {/* <img src={stage.images[0].path} alt="商品名" 
                                    onClick={()=> dispatch(push('/stage/posts/list/' + stage.id ))}/> */}
                                <img src={stage.images[0].path} alt="商品名" 
                                    onClick={() => {
                                        props.setFilter({type:'stage',key:stage.id})
                                        props.setStageName(stage.stage)
                                        props.setStageNo(stage.stageNo)
                                        props.setStageYear(stage.stageYear)
                                        }}/>
                            </span>
                        ))
                    )}
            </Swiper>
        </div>
    )
} 

export default StageSwiper
