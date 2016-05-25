Template.livechat.helpers({
	isActive() {
		if (ChatSubscription.findOne({
			t: 'l',
			f: {
				$ne: true
			},
			open: true,
			rid: Session.get('openedRoom')
		}, {
			fields: {
				_id: 1
			}
		}) != null) {
			return 'active';
		}
	},
	rooms() {
		var user = Meteor.user();

		var query = {
			t: 'l',
			ls: {$exists: true},
			// aassignment: user._id
		};

		

		if (user && user.settings && user.settings.preferences && user.settings.preferences.unreadRoomsMode) {
			query.alert = {
				$ne: true
			};
		}

		return ChatSubscription.find({}, {
			sort: {
				't': 1,
				'name': 1
			}
		});
	},
	inquiries() {
		var user = Meteor.user();

		if (user && user.settings && user.settings.preferences && user.settings.preferences.unreadRoomsMode) {
			query.alert = {
				$ne: true
			};
		}

		return LivechatInquiry.find({}, {
			sort: {
				'ts' : 1
			}
		});
	},
	available() {
		const user = Meteor.user();
		return {
			status: user.statusLivechat,
			icon: user.statusLivechat === 'available' ? 'icon-toggle-on' : 'icon-toggle-off',
			hint: user.statusLivechat === 'available' ? t('Available') : t('Not_Available')
		};
	},
	livechatAvailable() {
		const user = Meteor.user();

		if (user) {
			return user.statusLivechat;
		}
	}
});

Template.livechat.events({
	'click .livechat-status'() {
		Meteor.call('livechat:changeLivechatStatus', (err /*, results*/) => {
			if (err) {
				return handleError(err);
			}
		});
	}
});

Template.livechat.onCreated(function() {
  this.subscribe('livechat:inquiry');
});


