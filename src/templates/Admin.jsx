import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { push } from 'connected-react-router'
import { useDispatch } from 'react-redux'
import { signOut } from '../reducks/users/operators'

const useStyles = makeStyles((theme) => ({
    btn:{
        fontSize:'2rem'
    }
  }));

const Admin = () => {
    const classes = useStyles();
    const dispatch = useDispatch()
    return (
        <div className="l-container ">
            <div className="l-section c-admin-section">
                <div　className="u-center-margin">
                    <div className="u-center-text-align">
                    <p>管理画面</p>
                    <div className="u-spacer--8"></div>
                    <div>
                        <Button color="inherit" onClick={() => dispatch(push('/post/edit')) } className={classes.btn}>投稿新規作成</Button>
                        <Button color="inherit" onClick={() => dispatch(push('/post/list'))} className={classes.btn}>投稿リスト</Button>
                    </div>
                    <div>
                        <Button color="inherit" onClick={() => dispatch(push('/location/edit'))} className={classes.btn}>ロケーション新規作成</Button>
                        <Button color="inherit" onClick={() => dispatch(push('/location/list'))} className={classes.btn}>ロケーションリスト</Button>
                    </div>
                    <div>
                        <Button color="inherit" onClick={() => dispatch(push('/stage/edit'))} className={classes.btn}>ステージ新規作成</Button>
                        <Button color="inherit" onClick={() => dispatch(push('/stage/list'))} className={classes.btn}>ステージリスト</Button>
                    </div>
                    <div>
                        <Button color="inherit"  onClick={() => dispatch(push('/tags/edit'))} className={classes.btn}>タグ新規作成</Button>
                        <Button color="inherit"  onClick={() => dispatch(push('/tags/list'))} className={classes.btn}>タグリスト</Button>
                    </div>
                    <div>
                        <Button color="inherit" className={classes.btn}>SNS</Button></div>
                    <div>
                        <Button color="inherit" className={classes.btn}>管理者情報</Button></div>
                        <Button color="inherit" onClick={() => dispatch(signOut())} className={classes.btn}>管理者ログアウト</Button>
                    {/* <div>
                        <p>hiramatsu3300@gmail.com</p>
                        <p>blogapp3300</p>
                    </div> */}
                    </div>
                </div>
            </div>    
        </div>
    )
}

export default Admin
