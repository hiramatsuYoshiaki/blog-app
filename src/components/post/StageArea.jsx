import React,{useEffect} from 'react'
import { SelectBoxStages } from '../UiKit/index' 
import { useDispatch, useSelector } from 'react-redux'
import { fetchStages } from '../../reducks/stage/operators'
import { getStages } from "../../reducks/stage/selectors"

const StageArea = (props) => {
    const dispatch = useDispatch()
    const selector = useSelector(state => state)
    const stages = getStages(selector) //stage list

    const handleChange = (selectedId) => {
        stages.forEach(stage => {
            if (stage.id === selectedId) {
                props.setStage(
                    stage
                )
            }
        });
    }
    useEffect(() => {
        dispatch(fetchStages())
    }, [ dispatch]) 
    
    return (
        <div>
            <h3>Stage Area</h3>
            <p>ステージを選択してください</p>
            <SelectBoxStages
                label={"ステージ"}
                options={stages}
                required={true}
                select={handleChange} 
                value={props.stage.id || ''} //stage id
            />
        </div>
    )
}

export default StageArea
