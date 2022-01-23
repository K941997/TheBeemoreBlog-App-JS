import MainLayout from "../../components/Layout";
import React from "react";
import { useLocation, useParams } from "react-router";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import ScrollIndicator from "../../components/ScrollIndicator";
import { Comment, ListComment } from "../../components/Comment";
import NewArticle from "./NewArticle";
import request from "../../api/request";

export default function PostDetail() {
  //!Axios Connect FrontendBackend - One Post - Connect /post from Post.jsx Link to={`/post/${post._id}`}:
  const location = useLocation();
  const path = location.pathname.split("/")[2];

  const [post, setPost] = useState({}); //nhập vào và lấy ra
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState("");
  const [authorId, setAuthorId] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [authorPicture, setAuthorPicture] = useState("");
  const [updateMode, setUpdateMode] = useState(false);

  //hieutm
  const getPostId = path;
  const [comments, setComments] = React.useState([]);
  const setCommentsList = (data) => {
    setComments(data);
  };
  //hieutm

  //HieuTM
  const [status, setStatus] = React.useState("idle");
  const [postsNew, setPostsNew] = React.useState([]);
  const getNewPost = async () => {
    try {
      setStatus("loading");
      const res = await request({
        method: "GET",
        url: `/posts/limit/abc`,
      });
      if (res && res.success) {
        const data = res.data;
        console.log(data);
        setStatus("done");
        setPostsNew(data);
        return;
      }
      setStatus("error");
    } catch (err) {
      setStatus("error");
    }
  };

  React.useEffect(() => {
    getNewPost();
  }, []);

  //HieuTM

  const PF = "http://localhost:5000/images/";

  const [socket, setSocket] = useState(null);
  const { id } = useParams();

  //!Context API Reducer Action - Xác thực đăng nhập user trong phiên đăng nhập:
  const { state, dispatch, user, author } = useContext(Context);
  console.log(user);

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("/posts/" + path); // /api/posts/path = /api/posts/:id
      setPost(res.data._doc);
      setTitle(res.data._doc.title);
      setDescription(res.data._doc.description);
      setCategories(res.data._doc.categories);
      setAuthorId(res.data._doc.postedBy);
      setAuthorName(res.data.username);
      setAuthorPicture(res.data.picture);
      console.log(res.data);
    };
    getPost();
  }, [path]);

  //!handleUpdatePost:
  const handleUpdate = async () => {
    try {
      //!Lấy tokenJWT của User:
      const token = localStorage.getItem("token");
      console.log(token);

      await axios.put(`/posts/${post._id}`, {
        // /api/posts/:id
        postedBy: user.user._id,
        title: title,
        categories: categories,
        description: description,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  //!handleDeletePost:
  const handleDelete = async () => {
    try {
      await axios.delete("/posts/" + path); // /api/posts/:id

      window.location.replace("/");

      // console.log(user.access_token)
    } catch (err) {
      console.log(err);
    }
  };

  // Scroll to top of page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const renderNew = () => {
    if (status === "error") return <div>Error</div>;

    if (status === "idle" || status === "loading") return <div>Loading...</div>;
    return (
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 mt-12 mb-12">
        <article>
          <section class="mt-6 grid md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8">
            {postsNew.map((item) => (
              <NewArticle data={item} />

              //   <div className="flex flex-col items-start col-span-12 overflow-hidden shadow-sm rounded-xl md:col-span-6 lg:col-span-4">

              //     <Link to={`/post/${item._id}`}>
              //     <img
              //       className="object-cover w-full shadow-sm h-full"
              //       src={PF+item.photo}
              //     />
              //     </Link>
              //   <div className="relative flex flex-col items-start px-6 bg-white border border-t-0 border-gray-200 py-7 rounded-b-2xl">
              //     <div className="bg-indigo-400 absolute top-0 -mt-3 flex items-center px-3 py-1.5 leading-none w-auto inline-block rounded-full text-xs font-medium uppercase text-white inline-block">
              //       <span>{item.categories}</span>
              //     </div>
              //     <h2 className="text-base text-gray-500 font-bold sm:text-lg md:text-xl">
              //     <Link to={`/post/${item._id}`}>
              //       {item.title}
              //     </Link>

              //     </h2>
              //   </div>
              // </div>
            ))}
          </section>
        </article>
      </section>
    );
  };

  return (
    <MainLayout>
      <ScrollIndicator>
        <div className="flex flex-row p-10 bg-gray-50">
          <div className="basis-2/3 p-10">
            <div className="max-w-6xl px-10 py-6 mx-auto bg-gray-50">
              {/* Post Photo */}
              {PF + post.photo && (
                <img
                  className="object-cover h-60 w-full"
                  src={PF + post.photo}
                />
              )}

              {/* <!--Post Categories--> */}
              <div className="flex items-center justify-start mt-4 mb-4">
                {updateMode ? (
                  <input
                    type="text"
                    value={categories}
                    onChange={(e) => setCategories(e.target.value)}
                  ></input>
                ) : (
                  <Link
                    to={`/?category=${post.categories}`}
                    href="#"
                    className="px-2 py-1 font-bold bg-red-400 text-white rounded-lg hover:bg-gray-500"
                  >
                    <div>{post.categories}</div>
                  </Link>
                )}
              </div>

              <div className="mt-2">
                {/* Post Title */}
                {updateMode ? (
                  <input
                    type="text"
                    className="singlePagePostTitleUpdate"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  ></input>
                ) : (
                  <a
                    href="#"
                    className="sm:text-3xl md:text-3xl lg:text-3xl xl:text-4xl font-bold text-black-500  hover:underline"
                  >
                    {post.title}
                  </a>
                )}

                <div className="flex justify-start items-center mt-2">
                  <p className="text-sm text-green-500 font-bold bg-gray-100 rounded-full py-2 px-2 hover:text-red-500">
                    {post.rating}
                  </p>
                  <p className="text-sm text-gray-400 font-bold ml-5">Views</p>
                </div>

                <div className="font-light text-gray-600">
                  <a href="#" className="flex items-center mt-6 mb-6">
                    {/* Post Author picture */}
                    <img
                      src={PF + authorPicture}
                      alt="avatar"
                      className="hidden object-cover w-14 h-14 mx-4 rounded-full sm:block"
                    />

                    {/* Post Author */}
                    <Link to={`/user/${authorId}`} className="link">
                      <small className="font-bold text-gray-700 text-2xl hover:underline">
                        {authorName}
                      </small>
                    </Link>

                    {/* Post Icon Update Delete */}
                    {post.postedBy === user?.user._id && (
                      <div className="singlePagePostEdit flex ml-3">
                        <i
                          className="singlePagePostIcon"
                          onClick={() => setUpdateMode(true)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#000000"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"></path>
                            <polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon>
                          </svg>
                          Update
                        </i>
                        <i
                          className="singlePagePostIcon ml-3"
                          onClick={handleDelete}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#000000"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            <line x1="10" y1="11" x2="10" y2="17"></line>
                            <line x1="14" y1="11" x2="14" y2="17"></line>
                          </svg>
                          Delete
                        </i>
                      </div>
                    )}
                  </a>
                </div>
              </div>

              {/* <!--end post header--> */}
              {/* <!--post content--> */}
              <div className="max-w-4xl px-10  mx-auto text-2xl text-gray-700 mt-4 rounded bg-gray-100">
                {/* <!--content body--> */}
                <div>
                  {/* Post Description */}
                  <p className="mt-2 p-8">
                    {updateMode ? (
                      <textarea
                        className="singlePagePostDescriptionUpdate"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      ></textarea>
                    ) : (
                      <p className="singlePagePostDescription">
                        {post.description}
                      </p>
                    )}
                  </p>
                </div>
              </div>

              {/* Button Post */}
              {updateMode ? (
                <button onClick={handleUpdate}> Post </button>
              ) : (
                <div></div>
              )}
            </div>
          </div>
          <div className="basis-1/3 max-w-4xl px-10 py-16 mx-auto px-0 px-8 mx-auto sm:px-12 xl:px-5">
            {/* <!--form form comments--> */}

            <Comment postId={getPostId} setComment={setCommentsList} />
            <ListComment
              postId={getPostId}
              setComment={setCommentsList}
              getComment={comments}
            />
          </div>
        </div>

        {/* <!-- component --> */}
        <div className="mt-6 bg-gray-50">
          <div className=" px-10 py-6 mx-auto">
            {/* <!--author--> */}

            {/* <!--related posts--> */}
            <h2 className="text-2xl mt-4 text-gray-500 font-bold text-center">
              Related Posts
            </h2>
            {renderNew()}

            {/* <!--form form comments--> */}
          </div>
        </div>
      </ScrollIndicator>
    </MainLayout>
  );
}
