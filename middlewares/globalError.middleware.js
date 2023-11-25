const globalError = (err, req, res, next) => {
   
    const errorStatus = err.statusCode || 500
    const errorMessage = err.message || "somthing went wrong"
    
    res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage
    })

};

module.exports = globalError