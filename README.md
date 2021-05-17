# Blog app

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

# blog-app set up

1. create-react-app でローカルの開発環境構築

```
$ npx create-react-app blog-app
```

2. firebase プロジェクトの作成とデプロイ
   ブラウザ
   2-1. firebase コンソールでプロジェクト追加
   2-2. アナリティクスの設定 1/3 　プロジェクト名を入力(blog-app）
   2-3. アナリティクスの設定 2/3 　[続行]ボタンを押す
   2-4. アナリティクスの設定 3/3 　[プロジェクトを作成]ボタンを押す
   2-5. プロジェクトのホーム画面（アプリに firebase を追加して利用を開始しましょう）のウェブボタンをクリック
   2-6. ウェブアプリに firebase を追加、アプリのニックネーム(blog-app)に入力、このアプリの firebase Hosting も設定にチェックを入れて、[アプリを登録]ボタンを押す
   2-7. firebase SDK の追加[次へ]ボタンを押す
   2-8. firebase CLI のインストール[次へ]ボタンを押す
   2-9. firebase Hosting へのデプロイ[コンソールへ進む]ボタンを押す
   2-10. コンソールの歯車アイコンのメニューの[プロジェクトの設定]をクリック
   2-10. リソースロケーションの鉛筆アイコンをクリック
   2-10. デフォルトのリソースロケーションの設定で asia-northeast1 を選択し[完了]ボタンを押す
   2-10. コンソールのメニューの cloud firestore をクリック
   2-10. Cloud Firesore 画面で[データベースの作成]ボタンを押す
   2-10. セキュリティー保護ルール画面で、本番環境で開始にチェックが入っていることを確認し、[次へ]を押す
   2-10. ロケーション設定画面で[完了]を押す
   ターミナル
   2-10. `$ firebase login`
   2-10. `$ firebase init`

   ```
    PS D:\develop-react\blog-app> firebase init

        ######## #### ########  ######## ########     ###     ######  ########
        ##        ##  ##     ## ##       ##     ##  ##   ##  ##       ##
        ######    ##  ########  ######   ########  #########  ######  ######
        ##        ##  ##    ##  ##       ##     ## ##     ##       ## ##
        ##       #### ##     ## ######## ########  ##     ##  ######  ########

    You're about to initialize a Firebase project in this directory:

    D:\develop-react\blog-app

    ? Are you ready to proceed? Yes
    ? Which Firebase CLI features do you want to set up for this folder? Press Space to select features, then Enter to confirm your choices. Firestore: Deploy rules and create indexes for Firestore, Hosting: Configure and deploy Firebase Hosting sites, Storage: Deploy Cloud Storage security rules

    === Project Setup

    First, let's associate this project directory with a Firebase project.
    You can create multiple project aliases by running firebase use --add,
    but for now we'll just set up a default project.

    ? Please select an option: Use an existing project
    ? Select a default Firebase project for this directory: blog-app-4302d (blog-app)
    i  Using project blog-app-4302d (blog-app)

    === Firestore Setup

    Firestore Security Rules allow you to define how and when to allow
    requests. You can keep these rules in your project directory
    and publish them with firebase deploy.

    ? What file should be used for Firestore Rules? firestore.rules

    Firestore indexes allow you to perform complex queries while
    maintaining performance that scales with the size of the result
    set. You can keep index definitions in your project directory
    and publish them with firebase deploy.

    ? What file should be used for Firestore indexes? firestore.indexes.json

    === Hosting Setup

    Your public directory is the folder (relative to your project directory) that
    will contain Hosting assets to be uploaded with firebase deploy. If you
    have a build process for your assets, use your build's output directory.

    ? What do you want to use as your public directory? build
    ? Configure as a single-page app (rewrite all urls to /index.html)? Yes
    ? Set up automatic builds and deploys with GitHub? No
    +  Wrote build/index.html

    === Storage Setup

    Firebase Storage Security Rules allow you to define how and when to allow
    uploads and downloads. You can keep these rules in your project directory
    and publish them with firebase deploy.

    ? What file should be used for Storage Rules? storage.rules

    i  Writing configuration info to firebase.json...
    i  Writing project information to .firebaserc...

    +  Firebase initialization complete!
   ```

   2-10. `$ npm build`

   2-10. `$ firebase deploy`
   `Hosting URL: https://blog-app-4302d.web.app`

3. npm install

```
npm install --save @material-ui/core @material-ui/icons @material-ui/styles connected-react-router firebase react-redux react-router redux redux-actions redux-logger redux-thunk reselect @material-ui/pickers
npm install @date-io/moment@1.x moment
npm install history@4.10.1
npm install google-map-react
npm install @material-ui/lab
npm install @material-ui/data-grid
npm install -s swiper@5.4.2 react-id swiper@3.0.0
npm install react-transition-group --save
```

### push error

connected react router で push を使うと

Uncaught Could not find router reducer in state tree, it must be mounted under "router"

原因は history のバージョンが 5.0.0 だとなるらしい　
4.10.1 にしたら直った。　
npm install --save history@4.10.1

### sass instal

`npm install node-sass@4.14.1`

# re-ducks パターン

users
|--actions.js
|--index.js
|--operations.js
|--reducers.js
|--selectors.js
|--types.js

actions.js：変更するデータを送る
reducers.js：ストアーを変更する
selectors.js：ストアーで管理している state を参照する関数
operations.js：複雑な処理を行う、日同期処理（redux-thunk）を制御する、Action を呼び出す
types.js：タイプスクリプトで使用する、型定義する

# ec-shop directory

```
blog-app
|-build
|-function
|-node_modules
|-public
|-src
  |-assets
    |-reset.sass
    |-style.sass
    |-theme.js
  |-components
    |-Ukit
      |-index.js
  |-firebase
    |-config.js
    |-index.js
  |-reducks
    |-store
      |-initialState
      |-store.js
    |-users
      |-action.js
      |-operations.js
      |-reducers.js
      |-selectors.js
    |-templates
      |-index.js
      |-Home.jsx
      |-Login.jsx
      |-SignUp.jsx
   |-.env
   |-App.jsx
   |-index.js
   |-Router.jsx
   |-esLintcatch
   |-.firebaserc
   |-.gitignore
   |-firestore.indexes.json
   |-firestore.rules
   |-package-lock.json
   |-oackage.json
   |-README.md
   |-y
   |-yarn.lock


```

# create-react-app コマンドで作ったリポジトリを GitHub に上げる方法

1. New repository でリポジトリを作る
2. この時 Initialize this repository with a README をチェックしない
3. ローカルリポジトリで以下の手順を実行する。

```
git init
git add -A
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/hiramatsuYoshiaki/blog-app.git
git push -u origin main
```

# firebase ルールの更新

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /posts/{postId} {
      allow read, write: if request.auth.uid != null;
    }
  }
}
```

`firebase deploy --only firestore:rules`

# instagram enmed 
1. ndex.htmlにスクリプトをインポートします
'blog-app/public/index.html'
```
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
   <script async src="//www.instagram.com/embed.js" type="text/javascript"></script>
  </body>
</html>
```
2. 
```
  useEffect(()=>{
        if (window.instgrm) window.instgrm.Embeds.process()
  },[])
```


# React.useRef】イベントリスナー内で最新のステートを参照できない時の対処法
https://qiita.com/impl_s/items/0c9f326c90052ebd77da

React.useRef()を使うことで、常に最新の状態を参照することができます。

# 【React】ReactでCSSアニメーション（react-transition-group の利用）
https://serip39.hatenablog.com/entry/2020/10/02/180000
npm install react-transition-group --save