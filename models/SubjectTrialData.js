const mongoose = require('mongoose');


const SubjectDataSchema = new mongoose.Schema({
    subjectId:String,
    createdAt:Date,
    bruh:String,
    trialData:[
        {
            trialNumber:Number,
            outcome:String,
            finalScore:Number,
            timesteps:[
                {
                    t : Number,
                    pointsData:[[Number]]
                }
            ]
        }
    ]
});


const SubjectDataModel = mongoose.model('SubjectData', SubjectDataSchema);

module.exports = SubjectDataModel