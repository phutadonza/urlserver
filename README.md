# ขั้นตอนการตั้งค่าและการใช้เว็บ Shorturl (Backend)
## สิ่งที่จำเป็นต้องมี

- โปรแกรม Git [ https://git-scm.com/downloads ]
- Node.js [ https://nodejs.org/en/download ]
- MongoDB [https://www.mongodb.com/try/download/community]
- Visual Studio Code [ https://code.visualstudio.com/ ]

## ทำการ clone repository 
## โดยใช้คำสั่งใน cmd ดังนี้ 
``` 
cd urlserver
git clone https://github.com/phutadonza/urlserver.git
```
## ทำการติดตั้งตัว packages โดยใช้คำสั่งดังนี้ 
```
cd urlserver
npm install
```
## แก้ไขโค้ด
### บรรทัดที่ 7 ในไฟล์ app.js
```
const db = 'url ของ Mongodb'
```
### และบรรทัดที่ 4
```
let shorturl = `'localhost ของ backend'/${result.Short_url}`;
```
## ใช้คำสั่ง `npm start` เพื่อ runserver
```
npm start 
```
# repository ของ Frontend
# [https://github.com/phutadonza/urlserver.git]
