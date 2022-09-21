import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: 'active'
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Products'
    }
  ],
  cart : [
    {
      product : {
        type: Schema.Types.ObjectId,
        ref: 'Products',
        required : true
      },
      qty : {
        type : Number,
        required : true
      }
    }
  ],
});

export default model('User', UserSchema);