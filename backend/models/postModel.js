const mongoose = require('mongoose');

//model:
const postSchema = new mongoose.Schema({
    title: {
       type: String,
       required: true,
       unique: true,
    },
    description: {
       type: String,
       required: true,
    },
  
    photo: {
       type: String,
       required: true,
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
    },
    categories: {
       type: Array,
       required: false,
       ref: "categories"
    },
    likes: {
        type: [String],
        default: [],
    },
    numReviews: {
       type: Number,
       default: 0
    },
     
   rating: {
      type: Number,
      default: 0
   },

   level: {
      type: String,
      required: false,
   }
      
   
}, {
    timestamps: true
});

const postModel = mongoose.model("post", postSchema);


//export:
module.exports = postModel;