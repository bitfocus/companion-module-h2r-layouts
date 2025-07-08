import { combineRgb } from '@companion-module/base'

export default function _initFeedbacks(self) {
	return {
		atem_animate: {
			type: 'boolean', // Feedbacks can either a simple boolean, or can be an 'advanced' style change (until recently, all feedbacks were 'advanced')
			name: 'ATEM: Animate Enabled/Disabled',
			defaultStyle: {
				bgcolor: combineRgb(255, 0, 0),
				color: combineRgb(255, 255, 255),
			},
			// options is how the user can choose the condition the feedback activates for
			options: [
				{
					type: 'dropdown',
					label: 'Status',
					id: 'status',
					default: 'enabled',
					choices: [
						{ id: 'enabled', label: 'Enabled' },
						{ id: 'disabled', label: 'Disabled' },
					],
				},
			],
			callback: function (feedback) {
				let currentValue = self.variableValues.atem_animate
				// This callback will be called whenever companion wants to check if this feedback is 'active' and should affect the button style
				if (currentValue === feedback.options.status) {
					return true
				} else {
					return false
				}
			},
		},
		last_recalled: {
			type: 'boolean', // Feedbacks can either a simple boolean, or can be an 'advanced' style change (until recently, all feedbacks were 'advanced')
			name: 'Last recalled layout',
			defaultStyle: {
				bgcolor: combineRgb(4, 120, 87),
			},
			options: [
				{
					type: 'textinput',
					label: 'Layout ID',
					id: 'layoutId',
					default: '',
				},
			],
			// options is how the user can choose the condition the feedback activates for
			callback: function (feedback) {
				let currentValue = self.variableValues.last_recalled
				// This callback will be called whenever companion wants to check if this feedback is 'active' and should affect the button style
				if (currentValue === feedback.options.layoutId) {
					return true
				} else {
					return false
				}
			},
		},
	}
}
