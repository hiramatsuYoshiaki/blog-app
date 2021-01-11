import React, {useState, useCallback} from 'react'
import { TextInput, PrimaryButton} from '../components/UiKit/index'
import { addStage } from '../reducks/stage/operators'
import { useDispatch } from 'react-redux'


const StageEdit = () => {
    const dispatch = useDispatch()
    let id =''
    const [stage, setStage] = useState('')
    const [stageNo, setStageNo] = useState(1)
    const [stageYear, setStageYear] = useState(2021)
    
    const inputStage = useCallback((event) => {
        setStage(event.target.value)
    }, [setStage])
    const inputStageNo = useCallback((event) => {
        setStageNo(event.target.value)
    }, [setStageNo])
    const inputStageYear = useCallback((event) => {
        setStageYear(event.target.value)
    }, [setStageYear])

    return (
        <div>
            <h2>Post Edit/add/delete</h2>
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
            <PrimaryButton
                label={"新規ステージ登録"}
                onClick={() => dispatch(addStage(id, stageYear, stageNo, stage))}
            />
        </div>
    )
}

export default StageEdit
