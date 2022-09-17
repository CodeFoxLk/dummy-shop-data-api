import { Schema, model } from 'mongoose';


const productSchema = new Schema(
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
    imageUrl: {
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
    category: {
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

export default model('Products', productSchema)
