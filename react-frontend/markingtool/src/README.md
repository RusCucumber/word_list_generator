# React FrontEnd Source 
フロントエンドのコンポーネント、ステート管理、css用のフォルダー

## Components
各ページのコンポーネント

## actions
**react-redux**の**dispatch**用関数を**index.js**で定義している

## reducers
**actions**から**dispatch**が送られると**reducers/index.js**の中で処理され、**store**のステートに保存される。

## index.js
**redux store**を定義し、アプリのレンダリングも行う。
**store**の情報はコンポーネントステートと**redux store**ステートに分かれています。
**redux store**は全コンポーネントがアクセスできる情報です・
