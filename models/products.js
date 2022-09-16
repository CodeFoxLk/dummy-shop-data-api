const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
    imageUrl: {
      type: String,
      required: true,
    },
    // price: {
    //   type: mongoose.SchemaTypes.Decimal128,
    //   required: true,
    // },

    // creator : {
    //     type : Object,
    //     require : true
    // }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Products", productSchema);
