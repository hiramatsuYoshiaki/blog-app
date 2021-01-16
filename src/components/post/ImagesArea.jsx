import React, { useCallback, useState } from 'react'
import { storage } from "../../firebase/index"
import { ImagePreview } from './index'
import IconButton from '@material-ui/core/IconButton';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import { makeStyles } from '@material-ui/core/styles';
import {TextInput,PrimaryButton} from '../UiKit/index'

const useStyles = makeStyles((theme) => ({
    icon: {
        marginRight: 8,
        height: 48,
        width: 46
    }
}))

const ImagesArea = (props) => {
    const classes = useStyles()
    const [imageId, setImageId] = useState('')
    const [imagePath, setImagePath] = useState('')
    const [imageDescription, setImageDescription] = useState('')

    const [areaImages, setAreaImages] = useState(props.images)

    console.log('areaImages',areaImages);
    
    const uploadImage = useCallback((event) => {
        console.log('uploadImage start------->'); 
        const file = event.target.files;
        //アップロードするにはBlogオブジェクトに変換する必要がある
        // let blob = new Blob(file, { type: "image/jpeg" });
        //image type: "image/jpeg"
        //video type: "video/mp4"
        let blob = new Blob(file, props.blobType);

        // Generate random 16 digits strings 
        // クラウドストレージにアップするためにファイ名が重複しないように１６桁のファイル名をランダム生成する
        const S="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        const N=16;
        const fileName = Array.from(crypto.getRandomValues(new Uint32Array(N))).map((n)=>S[n%S.length]).join('')

        //firebase storageのimageフォルダーにアップロードする
        const uploadRef = storage.ref('images').child(fileName);
        const uploadTask = uploadRef.put(blob);
        //firebase storegeの画像ファイルのURLを取得する
        uploadTask.then(() => {
            // Handle successful uploads on complete
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                // const newImage = {id: fileName, path: downloadURL, description: description};
                // const newImage = {id: fileName, path: downloadURL};
                // props.setImages((prevState => [...prevState, newImage]))
                setImageId(fileName)
                setImagePath(downloadURL)
                // dispatch(hideLoadingAction())
                console.log('getDownloadURL', downloadURL);
                console.log('uploadImage complete <-------'); 
            });
        }).catch((e) => {
            // dispatch(hideLoadingAction())
            console.log(e)

        });
    }, [setImageId, setImagePath, props.blobType])

    const inputDescription = useCallback((e) => {
        // console.log('inputDescription');
        // console.log(e.target.value);
        setImageDescription(e.target.value)
    }, [setImageDescription])

    const addImage = useCallback((imageId,imagePath,imageDescription) => {
        // console.log('addImage');
        const newImage = { id: imageId, path: imagePath, description: imageDescription };
        // console.log('newImage',newImage);
        setAreaImages((prevState => [...prevState, newImage]))
        props.setImages((prevState => [...prevState, newImage]))
    }, [setAreaImages,props])
    

    
    return (
        <div>
            <div>
                <h3>{props.imageTypes}を登録する</h3>
                <span>画像を追加する</span>
                <IconButton className={classes.icon}>
                    <label>
                        <AddPhotoAlternateIcon />
                        <input className="u-display-none"
                            type="file"
                            id="image"
                            accept={props.accept}
                            onChange={(event) => uploadImage(event)}
                        />
                    </label>
                </IconButton>
                <h1>path:{imagePath}</h1>
                <h1>type:{props.media}</h1>
                <div>
                    {(imagePath !== "" && props.media === "image") && (
                        <div>
                            <img alt="アイキャッチ画像" src={imagePath} className="p-imageArea__img"/>
                        </div>
                    )}
                    {(imagePath !== "" && props.media === "video") && (
                     <div>
                        <video muted controls>
                            <source src={imagePath} type="video/mp4" />
                        </video>
                     </div>
                    )}
                </div>
                
                <TextInput
                    fullWidth={true} label={"画像の説明を記入する"} multiline={true} required={true}
                    rows={5} value={imageDescription} type={"text"} onChange={inputDescription}
                />
                <PrimaryButton
                    label={"登録"}
                    onClick={() => addImage(imageId,imagePath,imageDescription)}
                />
            </div>

            <div className="p-grid__list-images__edit">
                {areaImages.length > 0 && (
                   areaImages.map(image =>
                        <ImagePreview
                            id={image.id}
                            path={image.path}
                            description={image.description}
                            key={image.id}
                            media={props.media} // image video
                        />
                    )
                )
                }
            </div>
            
           
        </div>
    )
}

export default ImagesArea
