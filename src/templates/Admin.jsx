import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { push } from 'connected-react-router'
import { useDispatch } from 'react-redux'
import { signOut } from '../reducks/users/operators'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start'
    },
  }));

const Admin = () => {
    const classes = useStyles();
    const dispatch = useDispatch()
    return (
        <div　className={classes.root}>
            <h1>管理画面</h1>
            <Button color="primary" onClick={() => dispatch(push('/post/edit'))}>投稿</Button>
            <Button color="primary" onClick={() => dispatch(push('/location/edit'))}>ロケーション新規作成</Button>
            <Button color="primary" onClick={() => dispatch(push('/location/list'))}>ロケーションリスト</Button>
            <Button color="primary" onClick={() => dispatch(push('/stage/edit'))}>ステージ新規作成</Button>
            <Button color="primary" onClick={() => dispatch(push('/stage/list'))}>ステージリスト</Button>
            <Button color="primary"  onClick={() => dispatch(push('/tags/edit'))}>タグ新規作成</Button>
            <Button color="primary"  onClick={() => dispatch(push('/tags/list'))}>タグリスト</Button>
            <Button color="primary">SNS</Button>
            <Button color="primary">管理者情報</Button>
            <Button color="primary" onClick={() => dispatch(signOut())}>管理者ログアウト</Button>
            <div>
                <p>hiramatsu3300@gmail.com</p>
                <p>blogapp3300</p>
            </div>
            
        </div>
    )
}

export default Admin
