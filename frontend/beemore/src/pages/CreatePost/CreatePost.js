import MainLayout from "../../components/Layout";
import axios from "axios";
import { Context } from "../../context/Context";
import React, { useState, useContext } from "react";

export default function CreatePost() {
  //!Axios Connect BackendFrontend - Context API:
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [file, setFile] = useState(null);
  // const [postedBy, setPostedBy] = useState("")
  const [error, setError] = useState("");

  //!Context API Reducer Action:
  const { state, dispatch, user } = useContext(Context);

  //!handleSubmitWritePost:
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setError(false);

      //!Lấy tokenJWT của User:
      const token = localStorage.getItem("token");
      console.log(token);

      //!Tạo Post:
      const newPost = {
        postedBy: user.user._id, //sửa mongo
        title: title,
        description: description,
        categories: categories,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      console.log(newPost);

      if (file) {
        const data = new FormData();
        const filename = Date.now() + file.name;
        data.append("name", filename);
        data.append("file", file);
        newPost.photo = filename;
        try {
          await axios.post("/upload", data);
        } catch (err) {
          console.log(err);
        }
      }

      //!Axios Backend Routes:
      const res = await axios.post("/posts/", newPost); // Backend postRoutes - /api/posts/

      window.location.replace("/post/" + res.data._id); //Frontend - /post/:id

      //!Dispatch Context:
      const { post } = res.data;
      const author = { _id: user._id, name: user.username }; //sửa mongo
      dispatch({
        type: "CREATE_ONE_POST",
        payload: { ...post, author, isEditable: true },
      });
    } catch (err) {
      setError(true);
      console.log(err);
    }
  };

  return (
    <MainLayout>
      <>
        <form onSubmit={handleSubmit}>
          <div className="bg-white-50 min-h-screen md:px-20 pt-6 shadow-md">
            <div className=" bg-white rounded-md px-6 py-10 max-w-2xl mx-auto">
              <h1 className="text-center text-2xl font-bold text-gray-500 mb-10">
                ADD POST
              </h1>

              <div className="space-y-4">
                {/* Create Post Title */}
                <div>
                  <label for="title" className="text-lx font-serif">
                    Title:
                  </label>

                  <input
                    type="text"
                    placeholder="title"
                    id="title"
                    className="ml-2 outline-none py-1 px-2 text-md border-2 rounded-md"
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>

                {/* Create Post File Photo */}
                <fieldset className="w-full space-y-1 text-coolGray-800">
                  <label for="files" className="block text-sm font-medium">
                    Attachments
                  </label>
                  <div className="flex">
                    <input
                      type="file"
                      name="files"
                      id="files"
                      className="px-8 py-12 border-2 border-dashed rounded-md border-coolGray-300 text-coolGray-600 bg-coolGray-100"
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                  </div>
                </fieldset>

                {/* Create Post Description */}
                <div>
                  <label
                    for="description"
                    className="block mb-2 text-lg font-serif"
                  >
                    Description:
                  </label>
                  <textarea
                    id="description"
                    cols="30"
                    rows="10"
                    placeholder="write here.."
                    className="w-full font-serif  p-4 text-gray-600 bg-indigo-50 outline-none rounded-md"
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  ></textarea>
                </div>

                {/* Write Category */}
                <div>
                  <label for="name" className="text-lx font-serif">
                    Category:
                  </label>
                  <input
                    type="text"
                    placeholder="name"
                    id="name"
                    className="ml-2 outline-none py-1 px-2 text-md border-2 rounded-md"
                    onChange={(e) => setCategories(e.target.value)}
                    required
                  />

                  {/* Error Text */}
                  {error && (
                    <span
                      className="error"
                      style={{
                        fontSize: "20px",
                        marginTop: "20px",
                        marginLeft: "40px",
                        color: "red",
                      }}
                    >
                      Tạo bài thất bại
                    </span>
                  )}
                </div>

                {/* Button Create Post */}
                <button
                  className=" px-6 py-2 mx-auto block rounded-md text-lg font-semibold text-indigo-100 bg-indigo-600  "
                  type="submit"
                >
                  ADD POST
                </button>
              </div>
            </div>
          </div>
        </form>
      </>
    </MainLayout>
  );
}
