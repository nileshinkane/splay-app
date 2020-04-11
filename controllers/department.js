const Department = require('../models/department');
const Video = require('../models/video');


exports.getDepartment = (req, res) => {
    let department = {}, deptResponse, featureResponse = "";

    Department.findOne({ name: req.params.deptName }, function (err, dept) {
        if (err) {
            res.status(400).json({
                error: err
            })
        }
        Video.find({ department: req.params.deptName, departmentFeatured: true }, function (err, featured) {
            if (err) {
                res.status(400).json({
                    error: err
                })
            }
            department = { dept, featured }
            res.status(200).json(department)
        })
    })


}


exports.setDepartment = (req, res) => {
    let department = new Department(req.body)
    department.save();
    res.status(200).json({
        message: 'Done'
    })
}