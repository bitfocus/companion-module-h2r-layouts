import { combineRgb } from "@companion-module/base"
import { variableValues } from "./variables.js"

export default function _initFeedbacks(self) {
	return {
		websocket_variable: {
			type: 'advanced',
			name: 'Update variable with value from WebSocket message',
			description:
				'Receive messages from the WebSocket and set the value to a variable. Variables can be used on any button.',
			options: [
				{
					type: 'textinput',
					label: 'JSON Path (blank if not json)',
					id: 'subpath',
					default: '',
				},
				{
					type: 'textinput',
					label: 'Variable',
					id: 'variable',
					regex: '/^[-a-zA-Z0-9_]+$/',
					default: '',
				},
			],
			callback: () => {
				// Nothing to do, as this feeds a variable
				return {}
			},
			subscribe: (feedback) => {
				self.subscriptions.set(feedback.id, {
					variableName: `${feedback.options.variable}`,
					subpath: `${feedback.options.subpath}`,
				})
			},
			unsubscribe: (feedback) => {
				self.subscriptions.delete(feedback.id)
			},
		},
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
			let currentValue = variableValues.atem_animate
			self.log('debug', `LOGLOGLOG ${currentValue}`)
			// This callback will be called whenever companion wants to check if this feedback is 'active' and should affect the button style
			if (currentValue === feedback.options.status) {
				return true
			} else {
				return false
			}
		},
	}
	}
}
