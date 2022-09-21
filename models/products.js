import { Schema, model } from 'mongoose';


const ProductSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    thumbNail: {
      type: String,
      required: true,
    },
    images: {
      type: Array,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      required: false,
    },
    rating: {
      type: Number,
      required: false,
    },
    brand: {
      type: String,
      required: false,
    },
    superCategory: {
      type: String,
      required: false,
    },
    subCategory: {
      type: String,
      required: false,
    },
    keywords: {
      type: Array,
      required: false,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    category : {
      type: String,
      require : true
    },
    reviews: [
      {
        by: {
          type: Schema.Types.ObjectId,
          ref: 'User',
        },
        review: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default model('Products', ProductSchema)
