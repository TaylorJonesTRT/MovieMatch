// function notFound(req, res, next) {
//   res.status(404);
//   const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
//   next(error);
// }

/* eslint-disable no-unused-vars */
function errorHandler(err: any, req: any, res: any, next: any) {
  /* eslint-enable no-unused-vars */
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
  });
}

function isAuthenticated(req: any, res: any, next: any) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('http://localhost:4000/api/auth/github');
}

export default { errorHandler, isAuthenticated };
