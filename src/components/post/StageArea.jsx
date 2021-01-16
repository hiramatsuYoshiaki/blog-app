import React,{useState, useEffect} from 'react'
import { SelectBoxStages } from '../UiKit/index' 
import { useDispatch, useSelector } from 'react-redux'
import { fetchStages } from '../../reducks/stage/operators'
import { getStages } from "../../reducks/stage/selectors"
import { push } from 'connected-react-router'

const StageArea = (props) => {
    const dispatch = useDispatch()
    const selector = useSelector(state => state)
    const stages = getStages(selector)
    // console.log('stageArea stages',stages)

    const [selectStage, setSelectStage] = useState('')
    const [selectStageNo, setSelectStageNo] =useState(1)
    const [selectStageYear, setSelectStageYear] =useState(2021)
    const [selectStageName, setSelectStageName] =useState('stage')
    const [selectStageImages, setSelectStageImages] =useState([])
    const handleChange = (selectedId) => {
        // console.log('handleChange stage id : ' + id);
        setSelectStage(selectedId)
        stages.forEach(stage => {
            if (stage.id === selectedId) {
                console.log(stage);
                setSelectStageNo(stage.stageNo)
                setSelectStageYear(stage.stageYear)
                setSelectStageName(stage.stage)
                setSelectStageImages(stage.images)
                props.setStage(
                    stage
                    // {
                    //     id: stage.id,
                    //     stageNo: stage.stageNo,
                    //     stage: stage.stage,
                    //     images:stage.images
                    // }
                )
            }
        });

    }
    useEffect(() => {
        // console.log('useEffect fetch stage data');
        dispatch(fetchStages())
    }, [dispatch])
    
    return (
        <div>
            <h3>Stage Area</h3>
            <p>ステージを選択してください</p>
            <SelectBoxStages
                label={"ステージ"}
                options={stages}
                required={true}
                select={handleChange}
                value={selectStage}
            />
            <p>
                <span className="u-matg__r02">{selectStageYear}</span>
                <span >STAGE-</span>
                <span>{selectStageNo}</span>
            </p>
            <p>{selectStageName}</p>
            {selectStageImages.map((stageImage) => {
                return (
                    <div key={stageImage.id}>
                        <img src={stageImage.path} alt="タイトル画像" className="u-imageMini__test" />
                        <div>id:{stageImage.id}</div>
                        <div>description:{stageImage.description}</div>
                   </div>
               )
            })}
            <p onClick={() => dispatch(push('/stage/edit'))}>新規ステージを追加します。</p>
        </div>
    )
}

export default StageArea
