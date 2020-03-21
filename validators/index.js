exports.createVideoValidator = (req, res, next) => {
    //title
    req.check("title", "Write a title").notEmpty()
    req.check("title", "Title must be more than 4 characters").isLength({
        min: 4
    });

    //link
    req.check("link", "Link cannot be empty").notEmpty()

    //description
    req.check("description", "Description cannot be empty").notEmpty()


    //check for errors
    const errors = req.validationErrors()
    //map through the errors if present
    if (errors) {
        const firstError = errors.map((error) => error.msg)[0];
        return res.status(400).json({
            error: firstError

        })
    }

    //It is necessary to make middlewares move to next process MANUALLY by using next(), else program will get stuck here and app will crash

    next();
}

