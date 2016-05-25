class LivechatInquiry extends RocketChat.models._Base {
	constructor() {
		super();
		this._initModel('livechat_inquiry');

		this.tryEnsureIndex({ 'rid': 1 });
		this.tryEnsureIndex({ 'name': 1 });
		this.tryEnsureIndex({ 'message': 1 });
		this.tryEnsureIndex({ 'ts': 1 });
		this.tryEnsureIndex({ 'code': 1 });
		// this.tryEnsureIndex({ 'unread': 1 });
	}

	/*
	 * User with uid takes the inquiry
	 * subsribe user to room, remove inquiry from collection 
	 */
	takeInquiry(inquiry, agent) {

		// add subscription
		var subscriptionData = {
			rid: inquiry.rid,
			name: inquiry.name,
			alert: true,
			open: true,
			unread: 1,
			code: inquiry.code,
			u: {
				_id: agent._id,
				username: agent.username
			},
			t: 'l',
			desktopNotifications: 'all',
			mobilePushNotifications: 'all',
			emailNotifications: 'all',
			answered: 'false',
			// assignment: 'view'
		};
		RocketChat.models.Subscriptions.insert(subscriptionData);

		// add user to room 
		RocketChat.models.Rooms.addUsernameById(inquiry._id, agent.username);

		// Remove this inquiry
		this.remove({_id: inquiry._id});	

	}
}

RocketChat.models.LivechatInquiry = new LivechatInquiry();