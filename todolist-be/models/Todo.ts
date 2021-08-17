const mongoose = require('mongoose');
import { Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const todoSchema: Schema = new Schema({
  message: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  }
});

todoSchema.plugin(mongoosePaginate);

export default mongoose.model('Todo', todoSchema);
