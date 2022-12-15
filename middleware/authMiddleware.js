const auth = require('basic-auth');
const { User } = require('../models');
const bcrypt = require('bcryptjs');

exports.authenticateUser = async (req, res, next) => {
	let message;
	
	const userCredentials = auth(req);
	
	if (userCredentials) {
		const user = await User.findOne({ where: { emailAddress: userCredentials.name }})
		if (user) {
			const authenticated = bcrypt.compareSync(userCredentials.pass, user.password);
			
			if (authenticated) {
				console.log(`Authentication successful for User: ${user.emailAddress}`);
				
				req.currentUser = user;
			} else {
				message = `Authentication failure for E-Mail: ${user.emailAddress}`;
			}
		} else {
			message = `User not found with E-Mail: ${userCredentials.emailAddress}`;
		}
	} else {
		message = 'Auth header not found';
	}
	
	if (message) {
		console.warn(message);
		res.status(401).json({ message: 'Access Denied' });
	} else {
		next();
	}
	
	next();
}
