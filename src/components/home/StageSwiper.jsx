import React,{useState} from 'react'
import Swiper from 'react-id-swiper'
import NoImage from '../../assets/img/no_image.jpg'
import 'swiper/swiper.scss'
// import 'swiper/components/navigation/navigation.scss';
// import 'swiper/components/pagination/pagination.scss';
// import 'swiper/components/scrollbar/scrollbar.scss';

const StageSwiper = props => {
    const [params] = useState({
        pagination:{
            el:'.swiper-pagination',
            type: 'bullets',
            clickable:true,
            dynamicBullets: true,
        },
        navigation:{
            nextEl:'.swiper-button-next',
            prevEl:'.swiper-button-prev'
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
        <Swiper {...params}>
                {stages.length === 0 ?(
                    <div>
                        <img src={NoImage} alt="no image" />
                    </div>
                ):(
                    stages.map(stage =>(
                        <span  key={stage.id} className="c-stragehome-image-wrape">
                            <img src={stage.images[0].path} alt="商品名" />
                        </span>
                    ))
                )}
        </Swiper>
        </div>
    )
}

export default StageSwiper
