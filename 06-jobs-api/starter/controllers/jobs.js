const Job = require('../models/Job');
const { StatusCodes} = require('http-status-codes');
const { BadRequestError, NotFoundError} = require('../errors')

const getAllJobs = async (req, res) => {
    const jobs = await Job.find({createdBy: req.user.createdBy}).sort('createdAt');
    res.status(StatusCodes.OK).json({ jobs})
    
    if(!jobs){
        throw new NotFoundError(`No jobs found`)
    }
}

const getJob = async (req, res) => {
    const {
        user: {userId},
        params: {id: jobId}
    } = req

    const job = await Job.findOne({
        _id: jobId, 
        createdBy: userId
    })

    if(!job){
        throw new NotFoundError(`No job found with id ${jobId}`)
    }
}

const createJob = async (req, res) => {
    req.body.createdBy = req.user.userId
    const job = await Job.create(req.body);
    res.status(StatusCodes.OK).json({ job})

}

const updateJob = async (req, res) => {
     const {
        user: {userId},
        body: {company, position},
        params: {id: jobId}
     } = req

     if(company === '' || position === '') {
        throw new BadRequestError(`company or position required`)
     }

     const job = await Job.findByIdAndUpdate({
        _id: jobId,
        createdBy: userId
     })

     if(!job){
        throw new NotFoundError(`No job found with id ${jobId}`)
     }

}

const deleteJob = async (req, res) =>{
    const {
        user: {userId},
        params: {id: jobId}
    } = req

    const job = await Job.findByIdAndDelete({
        _id: jobId,
        createdBy: userId
    })

    if(!job){
        throw new NotFoundError(`No job found with id ${jobId}`)
    }
}

module.exports = {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob
}