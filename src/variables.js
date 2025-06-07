export let variableValues = {
	last_data_received: Date.now(),
	layouts_count: undefined,
	atem_animate: undefined,
	atem_animate_easing: undefined,
	atem_animate_speed: undefined,
	atem_animate_supersource_index: undefined,
}

export let variables = [
	{
		variableId: 'last_data_received',
		name: `Last time data was received`,
	},
	{
		variableId: 'layouts_count',
		name: `Total number of layouts`,
	},
	{
		name: 'ATEM: Animate Enabled/Disabled',
		variableId: 'atem_animate',
	},
	{
		name: 'ATEM: Animate Easing',
		variableId: 'atem_animate_easing',
	},
	{
		name: 'ATEM: Animate Speed',
		variableId: 'atem_animate_speed',
	},
	{
		name: 'ATEM: SuperSource index',
		variableId: 'atem_animate_supersource_index',
	},
]
