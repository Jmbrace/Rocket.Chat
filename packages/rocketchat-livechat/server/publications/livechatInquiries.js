Meteor.publish('livechat:inquiry', function() {
	if (!this.userId) {
		return this.error(new Meteor.Error('error-not-authorized', 'Not authorized', { publish: 'livechat:inquiries' }));
	}

	return RocketChat.models.LivechatInquiry.find();
});
