import { Schema, model } from 'mongoose'

const OrderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    address: {
      type: String,
      required: true
    },
    mobileNumber: {
      type: String,
      required: true
    },
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: 'Products',
          required: true
        },
        puchasedPrice: {
          type: Number,
          required: true
        },
        discounted: {
          type: Number,
          required: true
        },
        netPuchasedPrice: {
          type: Number,
          required: true
        }
      }
    ]
  },

  {
    timestamps: true
  }
)

export default model('Orders', OrderSchema)
