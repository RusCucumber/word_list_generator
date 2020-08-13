## API List
---
### NLTK 初期化API

NTLKに必要なファイルをダウンロードする。
ユーザー側は使用しない

- URI: http://.../api/init
- method: POST
- header: "Application/Json"
- json: {"command": "download"}

**今後の修正点**

- ダウンロードがされているかを確認できるようにする

---
### レンマ化API

文章と単語（インデックス）を指定して、英単語を基本形へ変換する。

- URI: http://.../api/lemmatisation
- method: POST
- header: "Application/Json"
- json: {"sentece": 英文章, "index": レンマ化したい単語のインデックス}

---
### Quizlet単語帳作成API

Quizletの単語帳を作成し、URLを返す

- URI: http://.../api/quizlet
- method: POST
- header: "Application/Json"
- json: {"username": ユーザーネーム, "password": パスワード, "words": 単語帳にしたい対訳リスト}