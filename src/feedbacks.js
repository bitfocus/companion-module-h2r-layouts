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
	}
}
