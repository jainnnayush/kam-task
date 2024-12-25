const jwt = require('jsonwebtoken');

exports.auth = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.body.token || req.headers.authorization?.replace("Bearer ", "");

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token is missing, please provide a valid token.",
            });
        }

        // Verify token
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;  // Attach user data to the request object
            next();
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: "Invalid token. Please login again.",
            });
        }

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong during token validation. Please try again later.",
        });
    }
};

exports.isKam = (req, res, next) => {
    try {
        if (req.user.role !== "KAM") {
            return res.status(403).json({
                success: false,
                message: "This route is for KAM role only. Access denied.",
            });
        }
        next();  // Allow the request to continue
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error verifying the KAM role. Please try again later.",
        });
    }
};

exports.isAdmin = (req, res, next) => {
    try {
        if (req.user.role !== "Admin") {
            return res.status(403).json({
                success: false,
                message: "This route is for 'Admin' role only. Access denied.",
            });
        }
        next();  // Allow the request to continue
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error verifying the Admin role. Please try again later.",
        });
    }
};
