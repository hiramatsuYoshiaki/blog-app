import React,{useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { DataGrid } from '@material-ui/data-grid';
import {fetchPosts} from '../reducks/posts/operators'
import {getPosts} from '../reducks/posts/selectors'
import { push } from 'connected-react-router'
import moment from 'moment'
import Button from '@material-ui/core/Button';

const BlogData = () => {
    const dispatch = useDispatch()
    const selector = useSelector((state) => state) 
    const posts = getPosts(selector)
    let postRows = []
    console.log('BlogData');
    console.log(posts);
    const columns = [
        //     field: 'id', 
        //   field: '投稿日' , 
        //  field: 'タイトル' , 
        //  field4: '年代' , 
        //  field5: 'ステージ' , 
        //  field6: 'ステージ名' , 
        //  field7: 'ロケーション' , 
        //  field8: '投稿の種類' 
        {field: 'image',
        headerName: '画像',
        width: '200px',
        height: 'auto',
        renderCell:(params)=>(
            <img src={params.getValue('image') } alt="image" style={{width:'auto',height:'100%'}}/>
        )},
        {field:'title',
        headerName:'タイトル',
        width: '200px',},
        {field:'id',
        headerName:'見る',
        renderCell:(params)=>(
            <Button
              variant="contained"
              color="primary"
              size="small"
              style={{ marginLeft: 16 }}
              onClick={()=> dispatch(push('/post/detail/' + params.getValue('id')))}
            >
              投稿を見る
            </Button>
        )}
    
    ];
    const rowData = () => {
        console.log('useCallback rowData');
        posts.map(post => {
            let timestampDate = post.created_at.toDate()
            let m = moment(timestampDate );
            let mFormatted = m.format();
            let mYYMMDD = mFormatted.split('T')
            console.log(mYYMMDD[0]);
            let mhhmmss = mYYMMDD[1].split('+')
            console.log('moment' );
            console.log( mFormatted );
            console.log(mYYMMDD[0] );
            console.log(mhhmmss[0] );
            postRows.push({
                id:post.id,
                postDate: mFormatted, 
                title:post.title, 
                stageYear:post.stage.stageYear, 
                stageNo:post.stage.stageNo, 
                stageName:post.stage.stage, 
                location:post.location.name, 
                type:post.type, 
                image:post.topImages[0].path
            })
        })

        return postRows
    }
    useEffect(()=>{
        dispatch(fetchPosts())
    },[])
    
    return (
        <div style={{backgroundColor:'#fff', height: '100vh', width: '100%' }}>
            <DataGrid
            columns={columns}
            rows={rowData()} 
            rowHeight={100}/>
        </div>
        
    )
}

export default BlogData
