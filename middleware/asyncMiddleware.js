// Handler function to wrap each route.

/**
 * A util module for Routes - handling async requests and error propagation
 * @param cb {function}
 * @returns {(function(*, *, *): Promise<void>)|*}
 */
const asyncMiddleware = (cb) => {
	return async (req, res, next) => {
		try {
			await cb(req, res, next);
		} catch (error) {
			// Forward error to the global error handler
			next(error);
		}
	}
}

module.exports = asyncMiddleware;
