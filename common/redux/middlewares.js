const persistMiddleware = store => next => action => {
  next(action);
}
export default persistMiddleware;