import { combineRgb } from '@companion-module/base'
import { createCanvas } from 'canvas'

const CATEGORIES = {
	LAYOUTS_BY_IMAGE: 'Run Layout (by image)',
	LAYOUTS_BY_NAME: 'Run Layout (by name)',
	FULL_LAYOUTS_BY_IMAGE: 'Run to Full (by image)',
	FULL_LAYOUTS_BY_NAME: 'Run to Full (by name)',
	OTHER: 'Utils',
}

let staticPresets = {}
let dynamicPresets = {}

const toFull1 = {
	name: 'FULL 1',
	boxes: [
		{ enabled: true, x: 0, y: 0, size: 1000, cropped: false, cropTop: 0, cropBottom: 0, cropLeft: 0, cropRight: 0 },
		{ enabled: false, x: 0, y: 0, size: 500, cropped: false, cropTop: 0, cropBottom: 0, cropLeft: 0, cropRight: 0 },
		{ enabled: false, x: 0, y: 0, size: 500, cropped: false, cropTop: 0, cropBottom: 0, cropLeft: 0, cropRight: 0 },
		{ enabled: false, x: 0, y: 0, size: 500, cropped: false, cropTop: 0, cropBottom: 0, cropLeft: 0, cropRight: 0 },
	],
}
const toFull2 = {
	name: 'FULL 2',
	boxes: [
		{ enabled: false, x: 0, y: 0, size: 500, cropped: false, cropTop: 0, cropBottom: 0, cropLeft: 0, cropRight: 0 },
		{ enabled: true, x: 0, y: 0, size: 1000, cropped: false, cropTop: 0, cropBottom: 0, cropLeft: 0, cropRight: 0 },
		{ enabled: false, x: 0, y: 0, size: 500, cropped: false, cropTop: 0, cropBottom: 0, cropLeft: 0, cropRight: 0 },
		{ enabled: false, x: 0, y: 0, size: 500, cropped: false, cropTop: 0, cropBottom: 0, cropLeft: 0, cropRight: 0 },
	],
}
const toFull3 = {
	name: 'FULL 3',
	boxes: [
		{ enabled: false, x: 0, y: 0, size: 500, cropped: false, cropTop: 0, cropBottom: 0, cropLeft: 0, cropRight: 0 },
		{ enabled: false, x: 0, y: 0, size: 500, cropped: false, cropTop: 0, cropBottom: 0, cropLeft: 0, cropRight: 0 },
		{ enabled: true, x: 0, y: 0, size: 1000, cropped: false, cropTop: 0, cropBottom: 0, cropLeft: 0, cropRight: 0 },
		{ enabled: false, x: 0, y: 0, size: 500, cropped: false, cropTop: 0, cropBottom: 0, cropLeft: 0, cropRight: 0 },
	],
}
const toFull4 = {
	name: 'FULL 4',
	boxes: [
		{ enabled: false, x: 0, y: 0, size: 500, cropped: false, cropTop: 0, cropBottom: 0, cropLeft: 0, cropRight: 0 },
		{ enabled: false, x: 0, y: 0, size: 500, cropped: false, cropTop: 0, cropBottom: 0, cropLeft: 0, cropRight: 0 },
		{ enabled: false, x: 0, y: 0, size: 500, cropped: false, cropTop: 0, cropBottom: 0, cropLeft: 0, cropRight: 0 },
		{ enabled: true, x: 0, y: 0, size: 1000, cropped: false, cropTop: 0, cropBottom: 0, cropLeft: 0, cropRight: 0 },
	],
}

export const _initPresets = (_this) => {
	staticPresets['health'] = {
		type: 'button',
		category: CATEGORIES.OTHER,
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
		category: CATEGORIES.OTHER,
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
		category: CATEGORIES.OTHER,
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
			category: CATEGORIES.FULL_LAYOUTS_BY_IMAGE,
			name: `Run to Full: ${index + 1}`,
			style: {
				text: `Box ${index + 1} to full`,
				size: '14',
				color: 'transparent',
				bgcolor: '#1a1a1a',
				png64: layoutToPngBase64(layout.boxes),
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
			feedbacks: [],
		}

		// NAME
		return (staticPresets[`to_full_${index + 1}_by_name`] = {
			type: 'button',
			category: CATEGORIES.FULL_LAYOUTS_BY_NAME,
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
			feedbacks: [],
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
			category: CATEGORIES.LAYOUTS_BY_IMAGE,
			name: `Layout ${index + 1}`,
			style: {
				text: `${index + 1}. $(H2R_Layouts:layout_${index + 1}_name)`,
				size: '14',
				color: 'transparent',
				bgcolor: '#1a1a1a',
				png64: layoutToPngBase64(layout.boxes),
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
			feedbacks: [],
		}
		// LAYOUTS BY NAME
		return (dynamicPresets[`layout_${index + 1}_by_name`] = {
			type: 'button',
			category: CATEGORIES.LAYOUTS_BY_NAME,
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
			feedbacks: [],
		})
	})

	return { ...staticPresets, ...dynamicPresets }
}

function layoutToPngBase64(layoutArray, options = {}) {
	// Default options
	const { width = 128, height = 72, backgroundColor = '#1a1a1a', boxOpacity = 1 } = options

	// Box colors in order
	const boxColors = ['#9dc4f8', '#a0ecb1', '#d2b5f9', '#f0a9a7']

	// Create canvas
	const canvas = createCanvas(width, height)
	const ctx = canvas.getContext('2d')

	// Fill background
	ctx.fillStyle = backgroundColor
	ctx.fillRect(0, 0, width, height)

	// Draw each box
	layoutArray.forEach((box, index) => {
		// Skip disabled boxes
		if (!box || !box.enabled) return

		// Get color for this box
		const color = boxColors[index % boxColors.length]

		// Box dimensions - make them fill the full canvas like your CSS
		const boxWidth = width // 100% of canvas width
		const boxHeight = height // 100% of canvas height

		// Apply scale: scale(${box.size / 1000})
		const scale = box.size / 1000
		const scaledWidth = boxWidth * scale
		const scaledHeight = boxHeight * scale

		// From your CSS: translate(calc((${box.x} / 1600 * 64px) - 50%), calc((${-box.y} / 900 * 36px) - 50%))
		const translateX = (box.x / 1600) * 64 - scaledWidth / 2
		const translateY = (-box.y / 900) * 36 - scaledHeight / 2

		// From your CSS: top: '50%', left: '50%'
		const centerX = width / 2
		const centerY = height / 2

		// Final position
		const finalX = centerX + translateX
		const finalY = centerY + translateY

		// Handle cropping if enabled
		let drawX = finalX
		let drawY = finalY
		let drawWidth = scaledWidth
		let drawHeight = scaledHeight

		if (box.cropped) {
			// From your CSS: clipPath inset(top right bottom left)
			// inset(${box.cropTop / 1000}% calc(${box.cropRight} / 32000 * 128px) ${box.cropBottom / 1000}% calc(${box.cropLeft} / 32000 * 128px))
			const cropTop = (box.cropTop / 1000 / 100) * scaledHeight
			const cropBottom = (box.cropBottom / 1000 / 100) * scaledHeight
			const cropRight = (box.cropRight / 32000) * (128 / 2)
			const cropLeft = (box.cropLeft / 32000) * (128 / 2)

			drawX += cropLeft
			drawY += cropTop
			drawWidth -= cropLeft + cropRight
			drawHeight -= cropTop + cropBottom
		}

		// Draw the box
		ctx.fillStyle = color
		ctx.globalAlpha = boxOpacity
		ctx.fillRect(drawX, drawY, drawWidth, drawHeight)

		// Add box number
		if (drawWidth > 10 && drawHeight > 10) {
			ctx.globalAlpha = 1
			ctx.fillStyle = '#000000'
			ctx.font = '16px Arial'
			ctx.textAlign = 'center'
			ctx.textBaseline = 'middle'
			ctx.fillText(`${index + 1}`, drawX + drawWidth / 2, drawY + drawHeight / 2)
		}
	})

	// Convert to base64
	const buffer = canvas.toBuffer('image/png')
	return `data:image/png;base64,${buffer.toString('base64')}`
}
