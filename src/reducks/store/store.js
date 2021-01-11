import {
    createStore as reduxCreateStore,
    combineReducers,
    applyMiddleware
} from "redux"
import { UsersReducers } from "../users/reducers"
import { PostsReducers } from "../posts/reducers"
import { StagesReducers } from "../stage/reducers"
import { TagsReducers } from "../tags/reducers"

//Reduxのstoreでのルーティング管理
import {connectRouter, routerMiddleware} from 'connected-react-router'
//非同期処理
import thunk from 'redux-thunk'

export default function createStore(history) {
    return reduxCreateStore(
        combineReducers({
            router:connectRouter(history),
            users:UsersReducers,
            posts:PostsReducers,
            stages:StagesReducers,
            tags:TagsReducers,
        }),
        //ミドルウエアーとして導入する
        applyMiddleware(
            routerMiddleware(history),
            thunk
        )
    )
}
