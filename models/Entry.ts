import mongoose, {Model, Schema} from "mongoose";
import { Entry } from '../interfaces';

// para no repetir el modelo que ya esta en interfaces\entry.ts
export interface IEntry extends Entry{}

mongoose.set('strictQuery', true)
// esto corre del lado del servidor
const EntrySchema: Schema = new Schema({
  description: {type: String, required: true},
  createdAt: {type: Number},
  status: {type: String,
  enum:{
    values: ['pending', 'in-progress', 'finished'],
    message: '{VALUE} is not supported'
    // por defecto si no se dice que es sera pending
  },default: 'pending'
  
} });

const EntryModel: Model<IEntry> = mongoose.models.Entry || mongoose.model('Entry', EntrySchema);

export default EntryModel;