import mongoose from 'mongoose';
var Schema = mongoose.Schema;

//To auto assign an increasing id to tickets generated

const counterSchema = new Schema(
  {
  _id: {type: String, required: true}, //model on which it has to be applied i.e."ticket"
  seq: { type: Number, default: 0 } //current count
  }
);

counterSchema.index({ _id: 1, seq: 1 }, { unique: true }) //starting index

const counterModel = mongoose.model('counter', counterSchema);

//auto increasing function for counter model

const autoIncrementModelID = function (modelName, doc, next) {
  counterModel.findByIdAndUpdate(        
    modelName,
    { $inc: { seq: 1 } },
    { new: true, upsert: true }, 
    function(error, counter) {    
      if(error) return next(error);

      doc.id = counter.seq;
      next();
    }
  );                    
}

export default autoIncrementModelID;