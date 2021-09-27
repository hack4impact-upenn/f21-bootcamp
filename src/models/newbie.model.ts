// Tutorial: Create Tweet Model
import mongoose from 'mongoose';

const { Schema } = mongoose;

interface INewbie extends mongoose.Document {
  _id: string;
  userID: string;
  timestamp: Date;
  firstName: string;
  lastName: string;
  gradYear: number;
  hometown: string;
  funFact: string;
}

const NewbieSchema = new Schema({
  timestamp: { type: Date, default: Date.now },
  userID: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  gradYear: { type: String, required: true },
  hometown: { type: String, required: true },
  funFact: { type: String, required: false },
});

const Newbie = mongoose.model<INewbie>('Newbie', NewbieSchema);

export { Newbie, INewbie };
