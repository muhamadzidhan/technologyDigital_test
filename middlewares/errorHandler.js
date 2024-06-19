const errorHandler = (err, req, res, next) => {
    console.log(err, "{}{}{}{}{}{}{}{}");
    let statusCode = 500
    let message = "Internal Server Error"

    switch (err.name) {
        case "SequelizeValidationError":
        case "SequelizeUniqueConstraintError":
            statusCode = 400
            message = err.errors.map(el => el.message)
            break;
        case "Task List Not Found":
            statusCode = 404
            message = "Task List Not Found"
            break;
        case "NOT_FOUND":
        case "SequelizeForeignKeyConstraintError":
            statusCode = 404
            message = "Task List Not Found"
            break;
        default:
            statusCode = 500
            message = "Internal Server Error"
            break;
    }

    res.status(statusCode).json({ message })
}

module.exports = { errorHandler }