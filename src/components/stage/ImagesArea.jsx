import React from 'react'
import { ImagePreview } from './index'
// import { PrimaryButton} from '../../components/UiKit/index' 
  
const ImagesArea = props => {
    const images = props.images
    // const [images, setImages] = useState(props.images)
    // console.log('props.iamges', props.images)
    // console.log('imageArea images', images)
    return (
        <div>
            <div className="p-grid__list-images__edit">
                {
                    images.length > 0 && (
                        images.map((image) => (
                            <ImagePreview
                                    key={image.id}
                                    id={image.id}
                                    path={image.path}
                                    description={image.description}
                                    accept={"image/jpeg"} 
                            />
                        ))
                    )
                }
            </div> 
            <div>
            {/* <PrimaryButton
                label={"画像登録"}
                onClick={() => dispatch(addStage(id, stageYear, stageNo, stage, images))}
            /> */}
            </div>
        </div>
    )
}

export default ImagesArea


