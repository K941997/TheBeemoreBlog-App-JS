import "./settingProfile.css";
import Navbar from "../../components/Navbar";
import { useContext, useState, useEffect, useCallback } from "react";
import { Context } from "../../context/Context";
import axios from "axios";
import { useLocation, useParams } from "react-router";

export default function Settings() {
  const { dispatch, user } = useContext(Context);
  const [file, setFile] = useState(null);

  const [username, setUsername] = useState("");
  const [picture, setPicture] = useState("");
  const [background, setBackground] = useState("");
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  // console.log(user)

  const PF = "http://localhost:5000/images/";

  const location = useLocation();
  const path = location.pathname.split("/")[2];

  const token = localStorage.getItem("token");
  console.log(token);
  console.log(user);

  // const checkCurrentUser = useCallback(async () => {
  //   try {
  //     const token = localStorage.getItem("token");
  //     const option = {
  //       method: "get",
  //       url: "/auth/",
  //       headers: {
  //         Authorization: `Bearer ${token}`
  //       },
  //     };
  //     const res = await axios(option);
  //     console.log(res);

  //     // if (res.data) {
  //     //   dispatch({type: "LOGIN_SUCCESS", payload: res.data})
  //     // }

  //   } catch(err) {
  //     console.log(err);
  //   }
  // }, [dispatch]);

  // useEffect(() => {
  //   checkCurrentUser();
  // }, [checkCurrentUser])

  // useEffect(() => {

  //   const getUser = async() => {
  //       const res = await axios.get("/auth/infor/" + user.user._id)  // /api/auth/info/:id
  //       // setTitle(res.data.title)
  //       // setDescription(res.data.description)
  //       // setCategories(res.data.categories);
  //       // setAuthorId(res.data.postedBy);
  //       ////////////////!SỬA ĐỂ LOAD LẠI TRANG SAU KHI SỬA PROFILE///////////////////
  //       // setUsername(res.data.username);
  //       // setPicture(res.data.picture);
  //       // setAccount(res.data.account);
  //       // setSuccess(res.data.success);

  //       console.log(res)
  //   };
  //   getUser()
  // }, [user.user._id]);

  // useEffect(() => {
  //     const getUser = async() => {
  //       const res = await axios.get("/auth/infor" + user.user._id)  // /api/auth/info/:id
  //       setUsername(res.data.username);
  //       setAccount(res.data.account);
  //       setPassword(res.data.password);
  //       setBackground(res.data.background);
  //       setPicture(res.data.picture);
  //       console.log(res)
  //     }
  //       getUser()
  // }, [user.user._id]);

  // const [state, setState] = useState(true);

  // useEffect(() => {
  //     myFunction();
  //     return () => {
  //       setState({});
  //     };
  // }, [state]);

  // const myFunction = () => {
  //     setState({
  //         username: username,
  //         account: account,
  //         password: password,
  //     })
  // }

  //!handleSubmit:
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });

    const updatedUser = {
      _id: user.user._id,
      username,
      account,
      password,
    };

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.picture = filename;
      try {
        await axios.post("/upload", data);
      } catch (err) {}
    }

    try {
      const res = await axios.put("/auth/update/" + user.user._id, updatedUser); // /api/auth/update/:id
      //cần /api/auth/info
      setSuccess(true);

      window.location.reload("");

      localStorage.removeItem("user");

      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "UPDATE_FAILURE" });
    }
  };

  return (
    <>
      <Navbar />
      <div className="settings">
        <div className="settingsWrapper">
          <div className="settingsTitle">
            <span className="settingsUpdateTitle">Update Your Account</span>
          </div>

          {/* Form Update */}
          <form className="settingsForm" onSubmit={handleSubmit}>
            {/* userModel picture */}
            <label>Profile Picture</label>
            <div className="settingsPP">
              <img
                src={file ? URL.createObjectURL(file) : PF + user.user.picture}
                alt=""
              />
              <label htmlFor="fileInput">
                <i className="settingsPPIcon far fa-user-circle"></i>
              </label>

              {/* input picture */}
              <input
                type="file"
                id="fileInput"
                style={{ display: "none" }}
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>

            {/* userModel username */}
            <label>Username</label>
            <input
              type="text"
              placeholder={user.user.username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            {/* userModel account */}
            <label>Account</label>
            <input
              type="email"
              placeholder={user.user.account}
              onChange={(e) => setAccount(e.target.value)}
              required
            />
            <label>Password</label>

            {/* userModel password */}
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              className="settingsSubmit"
              type="submit"
              style={{ marginBottom: "200px" }}
            >
              Update
            </button>
            {success && (
              <span
                style={{
                  color: "green",
                  textAlign: "center",
                  marginTop: "20px",
                }}
              >
                Profile has been updated...
              </span>
            )}
          </form>
        </div>
      </div>
    </>
  );
}
