const permitTo = (...roles) => {
  return (req, res, next) => {
    const userRole = req.user.role;
    if (!roles.includes(userRole)) {
      res.status(403).json({
        message: "You dont have permission For this.Forbidden",
      });
    } else {
      next();
    }
  };
};
module.exports = permitTo;

// const permitTo = (...allowedRoles) => {
//   return (req, res, next) => {
//     try {
//       // Check if req.user exists (assume authentication middleware runs before)
//       if (!req.user) {
//         return res.status(401).json({
//           message: "You are not authenticated",
//         });
//       }

//       const userRole = req.user.role;

//       // Check if userRole exists and is included in allowedRoles
//       if (!userRole || !allowedRoles.includes(userRole)) {
//         return res.status(403).json({
//           status: "fail",
//           message: "You don't have permission to perform this action",
//         });
//       }

//       // User has permission
//       next();
//     } catch (error) {
//       console.error("PermitTo Middleware Error:", error);
//       res.status(500).json({
//         status: "error",
//         message: "Something went wrong in permission check",
//       });
//     }
//   };
// };

// module.exports = permitTo;
