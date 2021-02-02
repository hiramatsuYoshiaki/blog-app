import React from 'react'
import { Route, Switch } from 'react-router'
import {
  Home,
  SignIn,
  SignOut,
  Admin,
  PostEdit,
  PostList,
  PostDetail,
  StageEdit,
  StageList,
  TagsEdit,
  TagsList,
  LocationEdit,
  LocationList,
  PostListGrid,

} from './templates/index'
import Auth from './Auth'
const Router = () => {
    return (
      <main className='l-main'>
        <Switch>
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/signout" component={SignOut} />
            <Route exact path="(/)?" component={Home} />
            <Route exact path="/post/listgrid" component={PostListGrid} />
            <Route path="/post/detail(:id)?" component={PostDetail} />
          <Auth>
            <Route exact path="/admin" component={Admin} />
            <Route exact path="/location/List" component={LocationList} />
            <Route exact path="/tags/List" component={TagsList} />
            <Route exact path="/stage/List" component={StageList} />
            <Route path="/post/edit(:id)?" component={PostEdit} />
            <Route path="/post/list" component={PostList} />
            <Route path="/stage/edit(:id)?" component={StageEdit} />
            <Route path="/tags/edit(:id)?" component={TagsEdit} />
            <Route path="/location/edit(:id)?" component={LocationEdit} />
          </Auth>
        </Switch>
    </main>
    )
}

export default Router
