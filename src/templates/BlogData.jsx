import React,{useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {DataGrid } from '@material-ui/data-grid';
import {fetchPosts} from '../reducks/posts/operators'
import {getPosts} from '../reducks/posts/selectors'
import { push } from 'connected-react-router'
import moment from 'moment'
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core/styles'
import {useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles= makeStyles((theme) => ({
    grid:{
        backgroundColor:'#fff'
    },
    postsWrape:{
        position:'relative',
        height:'100%',
        width:'100%',
        maxHeight:'120px',
        display:'flex',
        flexFlow:'row nowrape'
    },
    postBody:{
        padding:'.8rem',
    },
    images:{
        display:'block',
        width:'auto',
        height:'100%',
        maxHeight:'120px'
        
    },
    locationWrape:{
    },
    typeWrape:{
    },
    stageWrape:{
    }
    
}))

const BlogData = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const selector = useSelector((state) => state) 
    const posts = getPosts(selector)
    let postRows = []

    const theme = useTheme();
    // const isDownSM = useMediaQuery(theme.breakpoints.down('sm'));
    // const isUpSM = useMediaQuery(theme.breakpoints.up('sm'));
    const isDownSM = !useMediaQuery('(min-width:600px)');
    const isDownMD = !useMediaQuery('(min-width:960px)');

    // console.log('BlogData');
    // console.log(posts);

    // id:post.id,
    // postDate: mFormatted, 
    // title:post.title, 
    // stageYear:post.stage.stageYear, 
    // stageNo:post.stage.stageNo, 
    // stageName:post.stage.stage, 
    // location:post.location.name, 
    // type:post.type, 
    // image:post.topImages[0].path


    

    const columns = [
        {field:'id',
        headerName:'ID',
        hide: true,
        flex: '1',
        },

        {field: 'postDate',
        headerName: '投稿',
        flex: 1,
        renderCell:(params)=>(
            <div className={classes.postsWrape} >
                <img src={params.getValue('image') } className={classes.images}/>
                <div className={classes.postBody}>
                    <div onClick={()=> dispatch(push('/post/detail/' + params.getValue('id')))}>
                        <h4>{params.getValue('title')}</h4>
                        <p>{params.getValue('postDate')}</p>
                    </div>
                    <div onClick={()=> dispatch(push('/stage/listgridline'))}>
                        <p>STAGE{params.getValue('stageNo')}</p>
                        <p>{params.getValue('stageName')}</p>
                    </div>
                   
                    
                </div>
            </div> 
            
        )},
       
        {field:'location',
        headerName:'ロケーション',
        flex: 0.3,
        hide: isDownSM,
        renderCell:(params)=>(
            // <div className={classes.locationWrape} onClick={()=> dispatch(push('/location/edit/' + params.getValue('locationId')))}>
            <div className={classes.locationWrape} onClick={()=> dispatch(push('/location/List'))}>
                <h6>{params.getValue('location')}</h6>
            </div>
        )
        },
        {field:'type',
        headerName:'投稿タイプ', 
        flex: 0.2,
        hide: isDownMD,
        renderCell:(params)=>(
            <div className={classes.typeWrape}>
                <p>{params.getValue('type')}</p>
            </div>
        )
        },
        {field:'stageNo',
        headerName:'ステージ',
        flex: 0.2,
        hide: isDownMD,
        renderCell:(params)=>(
            <div className={classes.stageWrape} onClick={()=> dispatch(push('/stage/listgridline'))}>
                <p>STAGE{params.getValue('stageNo')}</p>
            </div>
        )
        },
    ]
    const rowData = () => {
        posts.map(post => {
            let timestampDate = post.created_at.toDate()
            let m = moment(timestampDate );
            let mFormatted = m.format();
            let mYYMMDD = mFormatted.split('T')
            let YYMMDD = mYYMMDD[0]
            // let HHmmSS = mYYMMDD[1].split('+')
            postRows.push({
                id:post.id,
                image:post.topImages[0].path,
                title:post.title,
                postDate: YYMMDD,
                location:post.location.name,  
                locationId:post.location.id,  
                stageYear:post.stage.stageYear, 
                stageNo:post.stage.stageNo, 
                stageName:post.stage.stage, 
                stageId:post.stage.id, 
                type:post.type, 
            })
        })

        return postRows
    }
    useEffect(()=>{
        dispatch(fetchPosts())
    },[])
    
    return (
        // <div className="l-container-fluid ">
        // <div style={{ height: 400, width: '100%',backgroundColor:'#fff'  }}>
        //     <div style={{ display: 'flex', height: '100%' }}>
        //         <div style={{ flexGrow: 1 }}>
        //            <DataGrid
        //                 columns={columns}
        //                 rows={rowData()}
        //                 autoHeight 
        //                 checkboxSelection
        //                 className={classes.grid}
        //                 rowHeight={52}
        //             />
        //         </div>
        //     </div>
        // </div>
        <div>
            <div style={{backgroundColor:'#fff', height: '100vh', width: '100%' }}>
                <DataGrid
                columns={columns}
                rows={rowData()} 
                rowHeight={120}

                />
            </div>
        </div>
        
    )
}

export default BlogData
