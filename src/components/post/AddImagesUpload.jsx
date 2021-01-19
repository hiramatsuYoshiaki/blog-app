import React,{useCallback} from 'react'
import { storage } from "../../firebase/index"
import IconButton from '@material-ui/core/IconButton';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    icon: {
        marginRight: 8,
        height: 48,
        width: 46
    }
}))

const AddImagesUpload = props => {
    const classes = useStyles()
    const uploadImage = useCallback((event) => {
        const file = event.target.files;
        //アップロードするにはBlogオブジェクトに変換する必要がある
        //image type: "image/jpeg" video type: "video/mp4"
        let blob = new Blob(file, { type: "image/jpeg" });

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
                // dispatch(hideLoadingAction())
                const newImage = { id: fileName, path: downloadURL, description: '' };
                if (props.Multiple) {
                    props.setImages((prevState => [...prevState, newImage])) //追加する場合の書き方
                } else {
                    props.setImages([newImage])
                }
            });
        }).catch((e) => {
            // dispatch(hideLoadingAction())
            console.log(e)

        });
    }, [props.setImages])
    return (
        <div>
            <span>{props.title}を追加する</span>
            <IconButton className={classes.icon}>
                    <label>
                        <AddPhotoAlternateIcon />
                        <input className="u-display-none"
                            type="file"
                            id="image"
                            accept={"image/jpeg"}
                            onChange={(event) => uploadImage(event)}
                        />
                    </label>
            </IconButton>
        </div>
    )
}

export default AddImagesUpload
