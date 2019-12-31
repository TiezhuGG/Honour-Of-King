## 项目运行
```
git clone

cd admin 
npm install
npm run build

cd web
npm install
npm run build

cd server
npm install
npm run serve
```

mongodump -d <项目名称>导出dump文件夹，用于本地数据迁移到服务器,复制到服务器root路径下执行mongorestore命令
