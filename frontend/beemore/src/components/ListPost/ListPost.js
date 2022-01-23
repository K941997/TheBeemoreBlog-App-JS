import Post from "../Post/Post";
import React from 'react'

export default function ListPost({posts}) {
  return (
    <>
      <section class="text-gray-600 body-font" >
        <div class="container px-5 py-24 mx-auto">
        <h2 class="text-2xl font-extrabold text-gray-700">BLOGS</h2>
          <div class="flex flex-wrap ">
          
            {posts.map((p) => (
                <Post post={p}></Post>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}
