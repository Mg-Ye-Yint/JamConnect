import React from "react";
import PostItem from "./postItem";

function Postmodal({ posts }) {
  return (
    <div>
      <dialog id="my_modal_2" className="modal">
        <form method="dialog" className="modal-backdrop">
          <PostItem post={posts} />
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
}

export default Postmodal;
