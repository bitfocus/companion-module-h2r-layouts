import { combineRgb } from '@companion-module/base'
import { toFull1, toFull2, toFull3, toFull4 } from '../utils/defaultLayouts.js'
import { PRESET_CATEGORIES } from '../utils/consts.js'

let staticPresets = {}
let dynamicPresets = {}

export const _initPresets = (_this) => {
	staticPresets['health'] = {
		type: 'button',
		category: PRESET_CATEGORIES.OTHER,
		name: 'Health',
		style: {
			text: 'Health',
			size: '14',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
		},
		steps: [
			{
				down: [
					{
						actionId: 'health',
					},
				],
				up: [],
			},
		],
		feedbacks: [],
	}
	staticPresets['get_all_layouts'] = {
		type: 'button',
		category: PRESET_CATEGORIES.OTHER,
		name: 'Get all layouts',
		style: {
			text: 'Get all layouts',
			size: '14',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
		},
		steps: [
			{
				down: [
					{
						actionId: 'get_all_layouts',
					},
				],
				up: [],
			},
		],
		feedbacks: [],
	}
	staticPresets['get_all_connections'] = {
		type: 'button',
		category: PRESET_CATEGORIES.OTHER,
		name: 'Get all connections',
		style: {
			text: 'Get all connections',
			size: '14',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
		},
		steps: [
			{
				down: [
					{
						actionId: 'get_all_connections',
					},
				],
				up: [],
			},
		],
		feedbacks: [],
	}

	Array.from([toFull1, toFull2, toFull3, toFull4]).forEach((layout, index) => {
		// IMAGE
		staticPresets[`to_full_${index + 1}_by_image`] = {
			type: 'button',
			category: PRESET_CATEGORIES.FULL_LAYOUTS_BY_IMAGE,
			name: `Run to Full: ${index + 1}`,
			style: {
				text: `Box ${index + 1} to full`,
				size: '14',
				color: 'transparent',
				bgcolor: '#1a1a1a',
				png64: layout.previewImage,
				pngalignment: 'center:center',
			},
			steps: [
				{
					down: [
						{
							actionId: 'run_to_full',
							options: { number: index + 1 },
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'last_recalled',
					options: {
						layoutId: layout.id,
					},
					style: {
						bgcolor: combineRgb(4, 120, 87),
					},
				},
			],
		}

		// NAME
		return (staticPresets[`to_full_${index + 1}_by_name`] = {
			type: 'button',
			category: PRESET_CATEGORIES.FULL_LAYOUTS_BY_NAME,
			name: `Run to Full: ${index + 1}`,
			style: {
				text: `Box ${index + 1} to full`,
				size: '14',
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(0, 0, 0),
			},
			steps: [
				{
					down: [
						{
							actionId: 'run_to_full',
							options: { number: index + 1 },
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'last_recalled',
					options: {
						layoutId: layout.id,
					},
					style: {
						bgcolor: combineRgb(4, 120, 87),
					},
				},
			],
		})
	})

	return { ...staticPresets, ...dynamicPresets }
}

export const _updatePresets = (_this, layouts) => {
	dynamicPresets = {}

	layouts.forEach((layout, index) => {
		// LAYOUTS BY IMAGE
		dynamicPresets[`layout_${index + 1}_by_image`] = {
			type: 'button',
			category: PRESET_CATEGORIES.LAYOUTS_BY_IMAGE,
			name: `Layout ${index + 1}`,
			style: {
				text: `${index + 1}. $(H2R_Layouts:layout_${index + 1}_name)`,
				size: '14',
				color: 'transparent',
				bgcolor: '#1a1a1a',
				png64: layout.previewImage,
				pngalignment: 'center:center',
			},
			steps: [
				{
					down: [
						{
							actionId: 'run',
							options: { number: index + 1 },
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'last_recalled',
					options: {
						layoutId: layout.id,
					},
					style: {
						bgcolor: combineRgb(4, 120, 87),
					},
				},
			],
		}
		// LAYOUTS BY NAME
		return (dynamicPresets[`layout_${index + 1}_by_name`] = {
			type: 'button',
			category: PRESET_CATEGORIES.LAYOUTS_BY_NAME,
			name: `Layout ${index + 1}`,
			style: {
				text: `${index + 1}. $(H2R_Layouts:layout_${index + 1}_name)`,
				size: '14',
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(0, 0, 0),
			},
			steps: [
				{
					down: [
						{
							actionId: 'run',
							options: { number: index + 1 },
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'last_recalled',
					options: {
						layoutId: layout.id,
					},
					style: {
						bgcolor: combineRgb(4, 120, 87),
					},
				},
			],
		})
	})

	return { ...staticPresets, ...dynamicPresets }
}
