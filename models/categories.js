import { Schema, model } from 'mongoose'

const CategorySchema = new Schema({
  superCategory: {
    type: String,
    required: true,
    unique: true
  },
  subcategories: {
    type: Array
  }
})

export default model('Categories', CategorySchema)
