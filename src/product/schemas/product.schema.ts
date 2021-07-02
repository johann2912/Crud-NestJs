import { Schema } from 'mongoose';

export const ProductSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  imageURL: String,
  price: { type: Number, required: true },
  createAt: {
    type: Date,
    default: Date.now,
  },
});
