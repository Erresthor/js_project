// Calls to change the contents of the database :

const SubjectDataModel = require('../models/SubjectTrialData.js');

const getSubjectTrialDataS=((req,res) => {
    SubjectDataModel.find({})
        .then(result=>res.status(200).json({ result }))
        .catch(error => res.status(500).json({msg: error}))
})

const getSubjectTrialData=((req,res) => {
    SubjectDataModel.findOne({ _id: req.params.productID })
    .then(result => res.status(200).json({ result }))
    .catch(() => res.status(404).json({msg: 'Product not found'}))
})

const createSubjectTrialData = ((req, res) => {
    SubjectDataModel.create(req.body)
        .then(result => res.status(200).json({ result }))
        .catch((error) => res.status(500).json({msg:  error }))
    console.log("Received new data : adding to the database !")
})

const updateSubjectTrialData = ((req, res) => {
    SubjectDataModel.findOneAndUpdate({ _id: req.params.productID }, req.body, { new: true, runValidators: true })
        .then(result => res.status(200).json({ result }))
        .catch((error) => res.status(404).json({msg: 'Product not found' }))
})

const deleteSubjectTrialData = ((req, res) => {
    SubjectDataModel.findOneAndDelete({ _id: req.params.productID })
        .then(result => res.status(200).json({ result }))
        .catch((error) => res.status(404).json({msg: 'Product not found' }))
})

module.exports ={
    getSubjectTrialDataS,
    getSubjectTrialData,
    createSubjectTrialData,
    deleteSubjectTrialData,
    updateSubjectTrialData
}