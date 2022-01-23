import React from "react";
import request from "../../api/request";
import { Link } from "react-router-dom";

export default function ListComment({ postId, setComment, getComment }) {
  const [status, setStatus] = React.useState("idle");
  //const [comments, setComments] = React.useState([]);

  const fetchComment = async () => {
    try {
      setStatus("loading");
      const res = await request({
        method: "GET",
        url: `/comments/${postId}`,
      });
      if (res && res.success) {
        const data = res.data;
        console.log(data);
        setStatus("done");
        setComment(data);
        return;
      }
      setStatus("error");
    } catch (err) {
      setStatus("error");
    }
  };
  const PF = "http://localhost:5000/images/";

  React.useEffect(() => {
    fetchComment();
  }, []);

  const renderListComments = () => {
    if (status === "error") return <div>Error</div>;

    if (status === "idle" || status === "loading") return <div>Loading...</div>;

    return (
      <div className="w-full max-w-xl shadow bg-white rounded-lg px-4 pt-2">
        <ul role="list" class="p-6 divide-y divide-slate-200">
          {getComment.map((comment) => (
            // <Link to={`/user/${authorId}`} className="link"></Link>
            <li class="flex py-4 first:pt-0 last:pb-0" key={comment._id}>
              <Link to={`/user/${comment.username._id}`}>
                <img
                  class="h-10 w-10 rounded-full"
                  src={PF + comment.username.picture}
                  alt=""
                />
              </Link>

              <div class="ml-3 overflow-hidden">
                <p class="text-sm font-medium text-slate-900">
                  {comment.username.username}
                </p>
                <p class="text-sm text-slate-500">{comment.content}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return <>{renderListComments()}</>;
}
