const express = require('express')
const router = express.Router()

const  { 
    getSubjectTrialDataS,
    getSubjectTrialData,
    createSubjectTrialData,
    deleteSubjectTrialData,
    updateSubjectTrialData
} = require('../controllers/subjectTrialDataControllers.js')

router.get('/', getSubjectTrialDataS)

router.get('/:productID', getSubjectTrialData)

router.post('/', createSubjectTrialData) 

router.put('/:productID', updateSubjectTrialData) 

router.delete('/:productID', deleteSubjectTrialData)

module.exports = router
