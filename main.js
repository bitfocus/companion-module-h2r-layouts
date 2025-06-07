import { InstanceBase, runEntrypoint, InstanceStatus } from '@companion-module/base'
import WebSocket from 'ws'
import { upgradeScripts } from './upgrade.js'
import { _initPresets, _updatePresets } from './src/presets.js'
import _initActions from './src/actions.js'
import _initFeedbacks from './src/feedbacks.js'
import { variables, variableValues } from './src/variables.js'

class WebsocketInstance extends InstanceBase {
	isInitialized = false

	subscriptions = new Map()
	wsRegex = '^wss?:\\/\\/([\\da-z\\.-]+)(:\\d{1,5})?(?:\\/(.*))?$'

	async init(config) {
		this.config = config

		this.initWebSocket()
		this.isInitialized = true
		this.initActions()
		this.initFeedbacks()
		this.subscribeFeedbacks()
		this.initPresets()
	}

	async destroy() {
		this.isInitialized = false
		if (this.reconnect_timer) {
			clearTimeout(this.reconnect_timer)
			this.reconnect_timer = null
		}
		if (this.ws) {
			this.ws.close(1000)
			delete this.ws
		}
	}

	async configUpdated(config) {
		const oldconfig = { ...this.config }

		this.config = config

		if (oldconfig['url'] !== config['url']) this.initWebSocket()
	}

	maybeReconnect() {
		if (this.isInitialized && this.config.reconnect) {
			if (this.reconnect_timer) {
				clearTimeout(this.reconnect_timer)
			}
			this.reconnect_timer = setTimeout(() => {
				this.initWebSocket()
			}, 5000)
		}
	}

	initWebSocket() {
		if (this.reconnect_timer) {
			clearTimeout(this.reconnect_timer)
			this.reconnect_timer = null
		}

		const url = this.config.url
		if (!url || url.match(new RegExp(this.wsRegex)) === null) {
			this.updateStatus(InstanceStatus.BadConfig, `WS URL is not defined or invalid`)
			return
		}

		this.updateStatus(InstanceStatus.Connecting)

		if (this.ws) {
			this.ws.close(1000)
			delete this.ws
		}
		this.ws = new WebSocket(url)

		this.ws.on('open', () => {
			this.updateStatus(InstanceStatus.Ok)
			this.log('debug', `Connection opened`)
		})
		this.ws.on('close', (code) => {
			this.log('debug', `Connection closed with code ${code}`)
			this.updateStatus(InstanceStatus.Disconnected, `Connection closed with code ${code}`)
			this.maybeReconnect()
		})

		this.ws.on('message', this.messageReceivedFromWebSocket.bind(this))

		this.ws.on('error', (data) => {
			this.log('error', `WebSocket error: ${data}`)
		})
	}

	messageReceivedFromWebSocket(data) {
		if (this.config.debug_messages) {
			this.log('debug', `Message received: ${data}`)
		}

		let msgValue = null
		if (Buffer.isBuffer(data)) {
			data = data.toString()
		}

		if (typeof data === 'object') {
			msgValue = data
		} else {
			try {
				msgValue = JSON.parse(data)
			} catch (e) {
				msgValue = data
			}
		}

		if (msgValue.type === 'broadcast' && msgValue.data.type === 'layouts_updated') {
			// Update when layouts change
			variableValues['layouts_count'] = msgValue.data.count

			// Loop through all layouts
			msgValue.data.data.forEach((layout, index) => {
				const layoutName = `layout_${index + 1}_name`

				// NAME OF THE LAYOUT
				variables.push({
					variableId: layoutName,
					name: `Layout ${index + 1} Name`,
				})
				return (variableValues[layoutName] = layout.name)
			})

			const presets = _updatePresets(this, msgValue.data.data)
			this.setPresetDefinitions(presets)
			this.log('debug', `layouts_updated: ${msgValue.data.count}`)
		}
		
		if (msgValue.type === 'broadcast' && msgValue.data.type === 'connections_updated') {
			// ATEM ANIMATE
			variableValues['atem_animate'] = msgValue.data.data.ATEM.animate === true ? 'enabled' : 'disabled'
			this.checkFeedbacks('atem_animate')
			variableValues['atem_animate_easing'] = msgValue.data.data.ATEM.easing
			variableValues['atem_animate_speed'] = msgValue.data.data.ATEM.steps
			variableValues['atem_animate_supersource_index'] = msgValue.data.data.ATEM.superSourceIndex

			this.log('debug', `connections_updated: ${JSON.stringify(msgValue.data.data)}`)
		}

		variableValues['last_data_received'] = Date.now()
		this.setVariableDefinitions(variables)
		this.setVariableValues(variableValues)
	}

	getConfigFields() {
		return [
			{
				type: 'static-text',
				id: 'info',
				width: 12,
				label: 'Information',
				value:
					'Connect to the app via a websocket.<br /><strong>Target URLs</strong>: <ul><li><code>ws://127.0.0.1:4011</code> - Local computer.</li><li><code>ws://[ip_address]:4011</code> - Enter the IP of the computer running the app.</li></ul>',
			},
			{
				type: 'textinput',
				id: 'url',
				label: 'Target URL',
				tooltip: 'The URL of the WebSocket server (ws[s]://domain[:port][/path])',
				width: 12,
				regex: '/' + this.wsRegex + '/',
			},
			{
				type: 'checkbox',
				id: 'reconnect',
				label: 'Reconnect',
				tooltip: 'Reconnect on WebSocket error (after 5 secs)',
				width: 6,
				default: true,
			},
			{
				type: 'checkbox',
				id: 'debug_messages',
				label: 'Debug messages',
				tooltip: 'Log incoming and outgoing messages',
				width: 6,
			},
		]
	}

	initFeedbacks() {
		const feedbacks = _initFeedbacks(this)
		this.log('debug', 'FEEDBACKS RERUNNING')
		this.setFeedbackDefinitions(feedbacks)
	}

	initPresets() {
		this.log('debug', `Running presets`)
		const presets = _initPresets(this)
		this.setPresetDefinitions(presets)
	}

	initActions() {
		const actions = _initActions(this)
		this.setActionDefinitions(actions)
	}

}

runEntrypoint(WebsocketInstance, upgradeScripts)
