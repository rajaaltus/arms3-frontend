<template>
	<div>
		<div v-if="dialog">
			<v-dialog
				v-model="dialog"
				hide-overlay
				persistent
				width="300"
			>
				<v-card
					color="green"
					dark
				>
					<v-card-text>
						Please stand by
						<v-progress-linear
							indeterminate
							color="white"
							class="mb-0"
						></v-progress-linear>
					</v-card-text>
				</v-card>
			</v-dialog>
		</div>
	</div>
</template>

<script>
export default {
	data: () => ({
		dialog: false
	}),
	watch: {
		dialog (val) {
			if (!val) return
			// setTimeout(() => (this.dialog = false), 4000)
		},
	},
	methods: {
		start () {
			this.dialog = true
		},
		finish () {
			this.dialog = false
		}
	}
}
</script>