import generateId from '../utils/generateId.js'

export default function _initActions(self) {
	return {
		health: {
			name: 'Health',
			callback: async (action, context) => {
				return new Promise((resolve, reject) => {
					self.ws.send(JSON.stringify({ id: generateId(), action: 'health' }), (err) => {
						if (err) {
							if (self.config.debug_messages) {
								self.log('error', `Sending message failed.`)
							}
							reject(err)
						} else {
							if (self.config.debug_messages) {
								self.log('debug', `Message sent successfully.`)
							}
							resolve()
						}
					})
				})
			},
		},
		get_all_layouts: {
			name: 'Get all layouts',
			callback: async (action, context) => {
				return new Promise((resolve, reject) => {
					self.ws.send(JSON.stringify({ id: generateId(), action: 'layouts/get-all' }), (err) => {
						if (err) {
							if (self.config.debug_messages) {
								self.log('error', `Sending message failed.`)
							}
							reject(err)
						} else {
							if (self.config.debug_messages) {
								self.log('debug', `Message sent successfully.`)
							}
							resolve()
						}
					})
				})
			},
		},
		run: {
			name: 'Run a layout',
			options: [
				{
					type: 'textinput',
					label: 'Number',
					id: 'number',
					regex: '/^[-0-9_]+$/',
					default: '1',
					useVariables: true,
				},
			],
			callback: async (action, context) => {
				const number = await context.parseVariablesInString(action.options.number)

				if(!number) return self.log('debug', `[run] "Number" is not defined.`)

				return new Promise((resolve, reject) => {
					self.ws.send(
						JSON.stringify({ id: generateId(), action: 'layouts/run', params: { number: number } }),
						(err) => {
							if (err) {
								if (self.config.debug_messages) {
									self.log('error', `Sending message failed.`)
								}
								reject(err)
							} else {
								if (self.config.debug_messages) {
									self.log('debug', `Message sent successfully.`)
								}
								resolve()
							}
						},
					)
				})
			},
		},
		run_to_full: {
			name: 'Run to full',
			options: [
				{
					type: 'textinput',
					label: 'Number',
					id: 'number',
					regex: '/^[-a-zA-Z0-9_]+$/',
					default: '1',
					useVariables: true,
				},
			],
			callback: async (action, context) => {
				const number = await context.parseVariablesInString(action.options.number)

				if(!number) return self.log('debug', `[run_to_full] "Number" is not defined.`)

				return new Promise((resolve, reject) => {
					self.ws.send(
						JSON.stringify({ id: generateId(), action: 'layouts/run-to-full', params: { number: number } }),
						(err) => {
							if (err) {
								if (self.config.debug_messages) {
									self.log('error', `Sending message failed.`)
								}
								reject(err)
							} else {
								if (self.config.debug_messages) {
									self.log('debug', `Message sent successfully.`)
								}
								resolve()
							}
						},
					)
				})
			},
		},
		get_all_connections: {
			name: 'Get all connections',
			callback: async (action, context) => {
				return new Promise((resolve, reject) => {
					self.ws.send(JSON.stringify({ id: generateId(), action: 'connections/get-all' }), (err) => {
						if (err) {
							if (self.config.debug_messages) {
								self.log('error', `Sending message failed.`)
							}
							reject(err)
						} else {
							if (self.config.debug_messages) {
								self.log('debug', `Message sent successfully.`)
							}
							resolve()
						}
					})
				})
			},
		},
		atem_animate_toggle: {
			name: 'ATEM connection: Animate Enable/Disable',
			options: [
				{
					type: 'dropdown',
					id: 'boolean',
					label: 'Enable or Disable the animation between layouts',
					choices: [
						{ id: 'enable', label: 'Enable' },
						{ id: 'disable', label: 'Disable' },
					],
					default: 'enable',
				},
			],
			callback: async (action) => {
				const boolean = action.options.boolean

				return new Promise((resolve, reject) => {
					self.ws.send(JSON.stringify({ id: generateId(), action: `connections/atem/animate/${boolean}` }), (err) => {
						if (err) {
							if (self.config.debug_messages) {
								self.log('error', `Sending message failed.`)
							}
							reject(err)
						} else {
							if (self.config.debug_messages) {
								self.log('debug', `Message sent successfully.`)
							}
							resolve()
						}
					})
				})
			},
		},
		atem_animate_easing: {
			name: 'ATEM connection: Animate Easing',
			options: [
				{
					type: 'dropdown',
					id: 'ease',
					label: 'Easing used when animating between layouts',
					choices: [
						{ id: 'linear', label: 'Linear' },
						{ id: 'easeInQuad', label: 'Ease In' },
						{ id: 'easeOutQuad', label: 'Ease Out' },
						{ id: 'easeInOutQuad', label: 'Ease In Out' },
					],
					default: 'easeInOutQuad',
				},
			],
			callback: async (action) => {
				const type = action.options.ease

				return new Promise((resolve, reject) => {
					self.ws.send(
						JSON.stringify({ id: generateId(), action: 'connections/atem/animate/easing', params: { type } }),
						(err) => {
							if (err) {
								if (self.config.debug_messages) {
									self.log('error', `Sending message failed.`)
								}
								reject(err)
							} else {
								if (self.config.debug_messages) {
									self.log('debug', `Message sent successfully.`)
								}
								resolve()
							}
						},
					)
				})
			},
		},
		atem_animate_speed: {
			name: 'ATEM connection: Animate Speed',
			options: [
				{
					type: 'dropdown',
					id: 'speed',
					label: 'Speed of animation between layouts',
					choices: [
						{ id: '60', label: 'Slow' },
						{ id: '40', label: 'Medium' },
						{ id: '20', label: 'Fast' },
						{ id: '10', label: 'Extra fast' },
					],
					default: '20',
				},
			],
			callback: async (action) => {
				const speed = action.options.speed

				return new Promise((resolve, reject) => {
					self.ws.send(
						JSON.stringify({ id: generateId(), action: 'connections/atem/animate/speed', params: { speed } }),
						(err) => {
							if (err) {
								if (self.config.debug_messages) {
									self.log('error', `Sending message failed.`)
								}
								reject(err)
							} else {
								if (self.config.debug_messages) {
									self.log('debug', `Message sent successfully.`)
								}
								resolve()
							}
						},
					)
				})
			},
		},
		atem_supersource_index: {
			name: 'ATEM connection: SuperSource index',
			options: [
				{
					type: 'dropdown',
					id: 'index',
					label: 'Useful for bigger ATEM switchers with multiple SuperSources',
					choices: [
						{ id: '0', label: 'SuperSource 1' },
						{ id: '1', label: 'SuperSource 2' },
					],
					default: '0',
				},
			],
			callback: async (action) => {
				const index = action.options.index

				return new Promise((resolve, reject) => {
					self.ws.send(
						JSON.stringify({ id: generateId(), action: 'connections/atem/supersource/index', params: { index } }),
						(err) => {
							if (err) {
								if (self.config.debug_messages) {
									self.log('error', `Sending message failed.`)
								}
								reject(err)
							} else {
								if (self.config.debug_messages) {
									self.log('debug', `Message sent successfully.`)
								}
								resolve()
							}
						},
					)
				})
			},
		},
		send_command: {
			name: 'Send generic command',
			options: [
				{
					type: 'textinput',
					label: 'data',
					id: 'data',
					default: '',
					useVariables: true,
				},
			],
			callback: async (action, context) => {
				const value = await context.parseVariablesInString(action.options.data)

				if(!value) return self.log('debug', `[send_command] "Data" is not defined.`)

				return new Promise((resolve, reject) => {
					self.ws.send(JSON.stringify(value), (err) => {
						if (err) {
							if (self.config.debug_messages) {
								self.log('error', `Sending message failed.`)
							}
							reject(err)
						} else {
							if (self.config.debug_messages) {
								self.log('debug', `Message sent successfully.`)
							}
							resolve()
						}
					})
				})
			},
		},
	}
}
