# ベースイメージ
FROM node:18-alpine

# 作業ディレクトリを作成
WORKDIR /app

# 依存関係をインストール
COPY package*.json ./


# Vue CLI プロジェクトに必要な依存関係をインストール
# three: 3D描画ライブラリ
# @vue/cli-service: Vue CLI の開発サーバーなどを提供
RUN npm install

# アプリケーションのソースをコピー
COPY . .

# ビルド
RUN npm run build

# サーバーとして serve を使う（インストールされていない場合）
RUN npm install -g serve

# ポートを公開
EXPOSE 8080

# アプリケーションを起動
CMD ["npm", "run", "serve"]
