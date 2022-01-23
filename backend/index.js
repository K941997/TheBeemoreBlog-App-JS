const express = require('express');

const connectDB = require('./config/database');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const commentRoutes = require('./routes/commentRoutes');


const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

const multer = require("multer");
const path = require("path"); //image PF

//Dùng Cookie Refresh Token:
const Cookies = require('js-cookie') //npm i js-cookie
var cookieParser = require('cookie-parser');


//Code:
const app = express();
require('dotenv').config();
app.use(bodyParser.json());
app.use(cors())
app.use(cookieParser());

//Socket.io:
const http = require('http').createServer(app);
const io = require('socket.io')(http);

io.on('connection', socket => {
    console.log(socket.id +'connected');

    socket.on('disconnected', () => {
        console.log(socket.id + 'disconnected')
    })
})

//Lưu ảnh cho ReactJS (PF + post.photo)
app.use("/images", express.static(path.join(__dirname, "/images")))


//Upload File lên Disk Server:
app.use("/images", express.static(path.join(__dirname, "/images")));
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images");
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name);
    },
});
const upload = multer({ storage: storage });
    app.post("/api/upload", upload.single("file"), (req, res) => {
        res.status(200).json("File has been uploaded");
});

//!Upload File lên Firebase:
// const { initializeApp } = require('firebase/app');
// const { getDownloadURL, getStorage, ref, uploadBytes } = require('firebase/storage');

// const memoryStorage = multer.memoryStorage()
// const uploadWithMemoryStorage = multer({ storage: memoryStorage })

// const firebaseConfig = {
//   apiKey: process.env.FIREBASE_API_KEY,
//   authDomain: process.env.FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.FIREBASE_PROJECT_ID,
//   storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
//   appId: process.env.FIREBASE_APP_ID,
// };

// const app = initializeApp(firebaseConfig);

// const firebaseStorage = getStorage(app);


// router.post('/firebase', uploadWithMemoryStorage.single('file'), async (req, res) => {
//   const imageRef = ref(firebaseStorage, req.file.originalname);

//   const data = await uploadBytes(imageRef, req.file.buffer, {
//     contentType: req.file.mimetype,
//   });

//   const path = await getDownloadURL(data.ref);
//   res.send(path);
// });


//heroku:
app.use('/', express.static(path.join(__dirname, 'dist')))

//Config for only development of User npm run start:
if(process.env.NODE_ENV === "development"){
    app.use(cors({
        origin: process.env.CLIENT_URL
    }))

    app.use(morgan('dev'));
    //Morgan give info each request
    //Cors allow to deal with React for localhost:3000 without any problem
}




//Cloud MongoDB:
connectDB();


//Routes:
app.use ("/api/auth", authRoutes);
app.use ("/api/users", userRoutes);
app.use ("/api/posts", postRoutes);
app.use ("/api/categories", categoryRoutes);
app.use ("/api/comments", commentRoutes);


//Localhost:5000:
app.listen(process.env.PORT, () => {
    console.log("Backend is running Port 5000")
})