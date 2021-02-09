import React, {useState, useCallback, useEffect} from 'react'
import { TextInput, PrimaryButton} from '../components/UiKit/index'
import { addStage } from '../reducks/stage/operators'
import { useDispatch } from 'react-redux'
import { ImagesArea, ImagesUpload } from '../components/stage/index'
import {db} from '../firebase/index'
import Button from '@material-ui/core/Button'
import {push} from 'connected-react-router'

const StageEdit = () => {
    const dispatch = useDispatch()

    let id = window.location.pathname.split('/stage/edit')[1]
    if (id !== '') {
        id = id.split('/')[1] 
    }

    const [stage, setStage] = useState('')
    const [stageNo, setStageNo] = useState(1)
    const [stageYear, setStageYear] = useState(2021)
    const [images, setImages] = useState([])
    // { id: imageId, path: imagePath, description: imageDescription };
    
    const inputStage = useCallback((event) => {
        setStage(event.target.value)
    }, [setStage])
    const inputStageNo = useCallback((event) => {
        setStageNo(event.target.value)
    }, [setStageNo])
    const inputStageYear = useCallback((event) => {
        setStageYear(event.target.value)
    }, [setStageYear])
    // const blobTypeJpeg = { type: "image/jpeg" }
    useEffect(() => {
        if (id !== "") {
            db.collection('stages').doc(id).get()
                .then(snapshot => {
                    const stage = snapshot.data()
                    setStage(stage.stage)
                    setStageNo(stage.stageNo)
                    setStageYear(stage.stageYear)
                    setImages(stage.images)
            }).catch((error) => {
                throw new Error(error)
            })
        }
    },[id])
    return (
        <div className="l-container">
            <div className="l-section ">
                <div className="c-admin-wrape">
                    <h2>ステージ新規作成</h2>
                    <TextInput
                        fullWidth={true} label={"ステージ年"} multiline={false} required={true}
                        rows={1} value={stageYear} type={"number"} onChange={inputStageYear}
                    />
                    <TextInput
                        fullWidth={true} label={"ステージ番号"} multiline={false} required={true}
                        rows={1} value={stageNo} type={"number"} onChange={inputStageNo}
                    />
                    <TextInput
                        fullWidth={true} label={"ステージ名"} multiline={false} required={true}
                        rows={1} value={stage} type={"text"} onChange={inputStage}
                    />
                    {/* <ImagesArea images={images} setImages={setImages} imageTypes={"タイトル画像"}
                        blobType={{ type: "image/jpeg" }} accept={"image/jpeg"} media={"image"} /> */}
                    <ImagesArea images={images} setImages={setImages} /> 

                    <ImagesUpload images={images} setImages={setImages}/>
                    
                    <PrimaryButton
                        label={"ステージ登録"}
                        onClick={() => dispatch(addStage(id, stageYear, stageNo, stage, images))}
                    />
                    <div>
                        <Button onClick={()=> dispatch(push('/admin'))}>
                            <p>Back to Admin Menu</p>
                        </Button> 
                    </div>
                </div>
            </div>
        </div>
    )
} 
  
export default StageEdit
