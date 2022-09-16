const errorResponse = (error , req, res, next) => {
    console.log(error)
    const statusCode = error.statusCode || 500
    if(statusCode == 500 || !error.message){
        error.message = 'Internal Server Error';
    }
    res.status(statusCode).json({message : error.message})
}

module.exports = errorResponse