# # # FRONT-END:
# Settings:
- npx create-react-app client

- npm i axios - Kết nối Frontend Backend
- npm i axios react-router-dom redux react-redux redux-thunk redux-devtools-extension moment

- yarn add react-router-dom
- react router v6 đổi Switch thành Routes


# Font Google:
- Josef, Lora, Varela - thêm vào "index.html"

# Font Awesome:
- Dùng icons search, fb, ins, ... - thêm fontawesome cdn vào "index.html"

# Chạy:
- npm start
- npm run dev

# Code:
- Xóa file thừa ở "public", để lại "index.html"
- Xóa file thừa ở "src", để lại "App.jsx" và "index.jsx"
- Luôn import file CSS vào file JSX

- Tạo file PageRender.jsx chèn vào App.jsx

- Code TopBar > Header > Posts > Post > SideBar > SinglePagePost (Các Components)
- Code HomePage > SinglePage > WritePage > SettingsPage(Edit, Delete) > LoginPage > RegisterPage (Các Pages)




# CSS:
- Dùng div sẽ tạo khối xuống dòng
    width: 100%;    - dài
    height: 50px;   - rộng
    background-color    - màu nền
    flex: 6;    - chiếm 6 phần màn hình
    position: sticky;   - dính cố định
    z-index: 999;   - hiện lên đằng trước
    top: 0px;   - cách phía trên
    display: flex;
    align-items: center; 
    justify-content: center;
    border-radius: 50%; - bo góc viền tròn vào
    margin: 0;  - khoảng cách 2 phần tử khác nhau
    padding: 0; - khoảng cách nội dung và viền của 1 phần tử
    list-style: none;   - ko dùng ký tự cho list
    cursor: pointer;    - trỏ chuột dạng pointer
    object-fit: cover;  - phóng kích thước ảnh bên trong ảnh
    line-height: 30px;  - cách dòng giữa các chữ
    overflow: hidden;  - chống tràn viền khi viết nhiều
    text-overflow: ellipsis;    - chống tràn viền khi viết nhiều
   
- Làm mờ background trang đăng nhập
    background: linear-gradient(
        rgba(255, 255, 255, 0.5),
        rgba(255, 255, 255, 0.5)),
    url("https://simplepage.vn/blog/wp-content/uploads/2021/06/huong-dan-tao-blog-website.png");
  
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;


# # # BACK-END:
# Settings: ExpressJS MongooseDB dotenv multer nodemon bcrypt cors(expressJS) morgan(expressJS) cookieparser(expressJS):
- npm init
- yarn|npm add express mongoose dotenv multer
- yarn add nodemon
- package.json -> "start": "nodemon index.js" (dùng nodemon)
- yarn add bcrypt (mã hóa password)
- npm i cors (dùng middleware cors của expressJs)
- npm i morgan (dùng middleware morgan của expressJs)
- npm i cookie-parser (dùng middleware cookie của expressJs )
- npm i jsonwebtoken (jwt token xác thực phân quyền)


# Code:
- create index.js
- create .env

- Luôn luôn phải "require('dotenv').config()" ở các file;

- create database on cloud.mongodb.com
- create models -> controllers CRUD -> routes

- req.body là dữ liệu nhập vào
- req.params là dữ liệu ở csdl

# Models:
- không dùng:
    email: {
        type: String,
        required: true,
        unique: true, //không dùng vì sẽ gắn chặt Database, không tạo được thêm tài khoản
                      //xóa phải vào NoSQLBooster hoặc xóa dữ liệu trên Cloud MongoDB
    },

# Controllers:
- AuthController: Register Login
+ Register: Check User + Bcrypt Password + Register Create to MongoDB + Token JWT
+ Register: Send Email by Sendgrid "nodemailer-sendgrid-transport": "^0.2.0", (dùng được), phải kích hoạt Gmail và trang chủ Sendgrid, by ConsoleCloudGoogle (không dùng được)
+ Register: Send SMS by Twilio //npm install twilio

- UserController, PostController, CommentController: CRUD (create, read, read all, update, delete)

# Commons:
- errorHandler - lỗi chung
- TokenJWT - định danh người dùng

- Middlewares:
+ AuthValidate - kiểm tra đăng ký đăng nhập hợp lệ
+ TokenJWTAuth - xác thực Token JWT

# Routers:
- chèn Middleware AuthValidate

# index.js:
- import MongoDB cloud -> để dữ liệu từ Postman lưu vào MongoDB
- import routers -> để dùng Postman CRUD api
- import server localhost:5000 -> để dùng Postman CRUD API






# # # Kết nối Front-End và Back-End:
# Settings:
- npm i axios - Kết nối Frontend Backend

- packagejson Frontend thêm "proxy": "http://localhost:5000/api"  Backend
- code các file components + pages
- npm i jwt-decode - để jwt ở Frontend

# Code Kết Nối FrontendBackend:
1. HomePage.jsx -> Components (Posts.jsx -> Post.jsx -> SideBar.jsx (Categories))

2. RegisterPage.jsx

3. Context API (Context, Provider, Consumer) -> Actions (LoginStart, LoginSuccess, LoginFail) -> Reducer (LoginStart, LoginSuccess, LoginFail)

5. import Context API -> index.jsx, App.js, TopBar.jsx, writePage.jsx

6. LoginPage.jsx

7. useState("") - lấy dữ liệu từ form nhập vào frontend (Controlled Component)

7. useEffect() - load dữ liệu trang axios get("/...")

8. createRef - lấy giá trị trực tiếp từ DOM thật (Uncontrolled Component)

9. Context Provider Actions Reducer (Xác thực đăng nhập để thêm + sửa + xóa):
    + handleSubmit CHUẨN JWT ở LoginWithPass.jsx

    + Vào F12 -> Components -> Context.Provider

10. writePage (thêm) -> SinglePagePost (sửa + xóa) -> Thêm Comment

11. Heroku:
- Change to up Heroku: 
+ .env: NODE_ENV = development
+ backend index.js: if NODE_ENV === production
+ frontend localhost:3000 -> "OK"
+ backend localhost:5000 -> "Api is running when add in backend index.js"
+ change .env: NODE_ENV = production
+ backend localhost:5000 -> frontend but "lỗi t.map is not function"