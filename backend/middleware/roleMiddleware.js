const checkRole = roles => (req, res, next) => {
    const userRole = req.user.role;
    if (roles.includes(userRole)) {
        next();
    } else {
        res.status(403).json({ message: "Access Denied: You do not have the correct role." });
    }
};

module.exports = checkRole;
