const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const IQDataSchema = new Schema(
  {
    Scores: [
      {
        type: Number,
        required: true,
      },
    ],
    ScoresLevel1: [
      {
        type: Number,
        required: true,
      },
    ],
    ScoresLevel2: [
      {
        type: Number,
        required: true,
      },
    ],
    ScoresLevel3: [
      {
        type: Number,
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const IQModel = mongoose.model("IQData", IQDataSchema);
module.exports = IQModel;
