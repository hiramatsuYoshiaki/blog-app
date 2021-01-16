import React, { useCallback } from 'react'
import { storage } from "../../firebase/index"
import IconButton from '@material-ui/core/IconButton';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import { makeStyles } from '@material-ui/core/styles';
// import {TextInput} from '../UiKit/index'
const useStyles = makeStyles((theme) => ({
    icon: {
        marginRight: 8,
        height: 48,
        width: 46
    }
}))

const VideoUpload = (props) => {
    const classes = useStyles()

    // const [imageId, setImageId] = useState('')
    // const [imagePath, setImagePath] = useState('')
    // const [imageDescription, setImageDescription] = useState('')

    const uploadImage = useCallback((event) => {
        const file = event.target.files;
        //アップロードするにはBlogオブジェクトに変換する必要がある
        let blob = new Blob(file, { type: "video/mp4" });
        //image type: "image/jpeg"
        //video type: "video/mp4"
        // let blob = new Blob(file, props.blobType);

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
                // props.setImages((prevState => [...prevState, newImage])) //追加
                // setImageId(fileName)
                // setImagePath(downloadURL)
                // setImageDescription("GoogleEerth")
                // dispatch(hideLoadingAction())
                const newImage = { id: fileName, path: downloadURL, description: "" };
                props.setImages([newImage])
            });
        }).catch((e) => {
            // dispatch(hideLoadingAction())
            console.log(e)

        });
    }, [ props.setImages ])
    // const inputDescription = useCallback((e) => {
    //     const description = e.target.value
    //     setImageDescription(description)
    //     const newImage = { id: imageId, path: imagePath, description: description };
    //     props.setImages([newImage])
    // }, [setImageDescription])
    // const addImage = useCallback((imageId,imagePath,imageDescription) => {
    //     // console.log('addImage');
    //     const newImage = { id: imageId, path: imagePath, description: imageDescription };
    //     // console.log('newImage',newImage);
    //     // setAreaImages((prevState => [...prevState, newImage]))
    //     // props.setImages((prevState => [...prevState, newImage]))
    //     props.setImages([newImage])
    // }, [props.setImages])
    return (
        <div>
            <span>動画を追加する</span>
            <IconButton className={classes.icon}>
                    <label>
                        <AddPhotoAlternateIcon />
                        <input className="u-display-none"
                            type="file"
                            id="image"
                            accept="video/mp4"
                            onChange={(event) => uploadImage(event)}
                        />
                    </label>
            </IconButton>
            {/* <h1>{imageId}</h1>
            <h1>{imagePath}</h1>
            <h1>{imageDescription}</h1>
            <TextInput
                    fullWidth={true} label={"動画の説明を記入する"} multiline={true} required={true}
                    rows={5} value={imageDescription} type={"text"} onChange={inputDescription}
                /> */}
            {/* <PrimaryButton
                label={"登録"}
                onClick={() => addImage(imageId,imagePath,imageDescription)}
            /> */}
        </div>
    )
}

export default VideoUpload
