import React,{useState,useCallback, useEffect} from 'react'
import { SelectBoxStages } from '../UiKit/index' 
import { useDispatch, useSelector } from 'react-redux'
import { fetchStages } from '../../reducks/stage/operators'
import { getStages } from "../../reducks/stage/selectors"
import { push } from 'connected-react-router'

const StageArea = () => {
    const dispatch = useDispatch()
    const selector = useSelector(state => state)
    const stages = getStages(selector)
    console.log('stageArea stages',stages)

    const [selectStage, setSelectStage] = useState('')
    const [selectStageNo, setSelectStageNo] =useState(1)
    const [selectStageYear, setSelectStageYear] =useState(2021)
    const [selectStageName, setSelectStageName] =useState('stage')
    const handleChange =useCallback( (id) => {
        console.log('handleChange stage id : ' + id);
        setSelectStage(id)
        stages.map(stage => {
            if (stage.id == id) {
                console.log(stage);
                setSelectStageNo(stage.stageNo)
                setSelectStageYear(stage.stageYear)
                setSelectStageName(stage.stage)
            }
        });
    },[setSelectStage])
    useEffect(() => {
        console.log('useEffect fetch stage data');
        dispatch(fetchStages())
    }, [])
    
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
            {selectStageNo}-
            {selectStageYear}-
            {selectStageName}
            <p onClick={() => dispatch(push('/stage/edit'))}>新規ステージを追加します。</p>
        </div>
    )
}

export default StageArea
