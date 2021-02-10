import React,{useState,useCallback} from 'react'
import { TextInput } from '../UiKit/index'


const TopImagesPreview = props => {
    const images = props.images
    const index = parseInt(props.index, 10)
    const [description,setDescription] = useState(props.description)
    const [instagram,setInstagram] = useState(props.instagram)
    const inputDescription = useCallback((e)=>{
        setDescription(e.target.value)
        images[index].description = e.target.value
        props.setImages(images)
    },[setDescription])
    const inputInstagram = useCallback((e)=>{
        setInstagram(e.target.value)
        images[index].instagram = e.target.value
        props.setImages(images)
    },[setInstagram])

    return (
        <div>
            <div className="u-overflow-hidden">
                <img alt="アイキャッチ画像" src={props.path} className="u-image-width-fit"/>
                <p>画像説明</p>
                <div>
                     <TextInput
                        fullWidth={true} label={"画像説明"} multiline={false} required={true}
                        rows={1} value={description} type={"text"} onChange={inputDescription}
                    />
                </div>
                <p>インスタグラムURL</p>
                <div>
                     <TextInput
                        fullWidth={true} label={"インスタグラムURL"} multiline={false} required={false}
                        rows={1} value={instagram} type={"url"} onChange={inputInstagram}
                    />
                </div>
            </div> 
        </div>
    )
} 


export default TopImagesPreview
