import React from 'react'
import { Route, Switch } from 'react-router'
import { Home, SignIn, Admin, PostEdit, StageEdit, TagsEdit } from './templates/index'
import Auth from './Auth'
const Router = () => {
    return (
         <Switch>
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="(/)?" component={Home} />
          <Auth>
            <Route exact path="/admin" component={Admin} />
            <Route path="/post/edit(:id)?" component={PostEdit} />
            <Route path="/stage/edit(:id)?" component={StageEdit} />
            <Route path="/tags/edit(:id)?" component={TagsEdit} />
         </Auth>
     </Switch>
    )
}

export default Router
