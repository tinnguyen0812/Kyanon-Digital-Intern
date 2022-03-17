const { StatusCodes } = require('http-status-codes');

module.exports= {
    OK: (res,data,message) => {
        if (data) return res.status(StatusCodes.OK).json({message: message, data: data})
        return res.status(StatusCodes.OK).json({message: message})
    },
    FORBIDEN: (res,message) => {
        return res.status(StatusCodes.FORBIDDEN).json({message:message})
    },
    UNAUTHORIZED: (res,message) => {
        return res.status(StatusCodes.UNAUTHORIZED).json({message:message})
    },
    BAD_REQUEST: (res,message) => {
        return res.status(StatusCodes.BAD_REQUEST).json({message:message})
    },
    NOT_FOUND: (res,message) => {
        return res.status(StatusCodes.NOT_FOUND).json({message:message})
    }
}