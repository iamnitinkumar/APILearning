const mbHelper = require('../utilities/mountebankHelper');
const settings = require('../config/settings');
function addWishlistService() {
	const successResponse = { message: 'Item successfully added' };
	const unauthorisedResponse = {message: 'User is not authorised to make the request'};
	const unauthenticatedResponse = {message: 'Authentication information is missing or invalid'};
	const serviceUnavailableResponse = { message: 'Service not available' };
	const serviceNotFoundResponse = { message: 'The service is not found' };
	const stubs = [{
		//Item successfully added
		predicates: [{
			and: [
				{ equals: { method: 'POST' } },
				{ startsWith: { path: '/user/auth/wishlist' } },
				{ equals: { Headers: { WWW_Authenticate: '1234567890' } } },
				{ equals: { body: { itemname: '1' } } },
				]
			}],
			responses: [{
				is: {
					statusCode: 201,
					headers: {'Content-Type': 'application/json'},
					body: JSON.stringify(successResponse),
					},
			}],
			//User is not authorised to make the request
		predicates: [{
			and: [
				{ equals: { method: 'POST' } },
				{ startsWith: { path: '/user/auth/wishlist' } },
				{ equals: { Headers: { WWW_Authenticate: '1111' } } },
				{ equals: { body: { itemname: '1' } } },
				]
			}],
			responses: [{
				is: {

					statusCode: 403,
					headers: {'Content-Type': 'application/json'},
					body: JSON.stringify(unauthorisedResponse),
					}
			}],
			//Authentication information is missing or invalid
			predicates: [{
				and: [
					{ equals: { method: 'POST' } },
					{ startsWith: { path: '/user/auth/wishlist' } },
					{ equals: { Headers: { WWW_Authenticate: '' } } },
					{ equals: { body: { itemname: '1' } } },
					],
				}],
			responses: [{
				is: {
					statusCode: 401,
					headers: {'Content-Type': 'application/json'},
					body: JSON.stringify(unauthenticatedResponse),
					},
				}],
			// Method not allowed
			predicates: [{
				not: //{
					{equals :{ method: 'POST' }},
					//{ startsWith: { path: '/user/auth/wishlist' } },
					//{ equals: { Headers: { WWW_Authenticate: '1234567890' } } },
					//{ equals: { body: { itemname: '1' } } },
				//},
				}],
			responses: [{
				is: {
					statusCode: 405,
					headers: {'Content-Type': 'application/json'},
					body: JSON.stringify(serviceNotFoundResponse),
					},
				}],
		}]
	const imposter = {
		name: 'Wishlist Service',
		port: settings.wishlist_service_port,
		protocol: 'http',
		stubs: stubs,
		defaultResponse: {
			statusCode: 404,
			headers: {
				connection: 'close',
			},
			body: JSON.stringify(serviceNotFoundResponse),
		},
	}
	return mbHelper.postImposter(imposter)
}
module.exports = { addWishlistService }