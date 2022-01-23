import React, { useState, useContext } from "react";
import { Context } from "../../context/Context";
import request from '../../api/request'
export default function Comment({postId,setComment}){
    const [content, setContent] = React.useState("");
    const { state, dispatch, user } = useContext(Context);
    const handleSubmit = async (event) => {
        event.preventDefault();
        try{
            const res = await request({
                url:"/comments",
                method: "POST",
                data: { 
                    username:user.user._id,
                    content,
                    post_id:postId
                }
            })
            setContent("");
            console.log(res.data);
            const newComment = res.data;
            setComment((prevState) =>{
                return [...prevState,newComment]
            })
        }
        catch(err){
            console.log(err)
        }
    }

    const handleChangeInput = (e) => {
        const content = e.target.value;
        setContent(content)
    }

    return (

          <form onSubmit={handleSubmit} class="w-full p-5 items-center justify-center shadow mt-56 mb-4 max-w-lg">
              <div className="w-full max-w-xl bg-white rounded-lg px-4 pt-2">
                <div className="flex flex-wrap -mx-3 mb-6">
                  <h2 className="px-4 pt-3 pb-2 text-gray-800 text-lg">
                    Add a new comment
                  </h2>
                  <div class="w-full md:w-full px-3 mb-2 mt-2">
                    <textarea
                      className="bg-gray-100 resize-y rounded-md border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
                      name="comment"
                      placeholder="Type Your Comment"
                      required
                      onChange={handleChangeInput} value={content}
                    ></textarea>
                  </div>
                  <div className="w-full flex items-start md:w-full px-3">
                    <div className="-mr-1">
                      <input
                        type="submit"
                        className="bg-white text-gray-700 font-medium py-1 px-4 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-gray-100"
                        value="Post Comment"
                      />
                    </div>
                  </div>
                </div>
            </div>
        </form>


        
    )
}