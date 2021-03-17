<template>
  <v-list flat color="#41704e" style="border-radius:0;">
    <v-list-item-group color="#ffde00">
      <v-list-item
        v-for="(item, i) in pcActivities"
        :key="i"
        :to="item.path"
      >
        <v-list-item-icon class="pl-2 mr-3">
          <v-icon v-text="item.icon" class="disp-icon"></v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title v-text="item.title" class="disp"></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>
<script>
export default {
  data: () => ({
    pcActivities: [	
			{
				id: 1,
				title: 'Clinical Servies',
				count: 12,
				icon: 'mdi-hospital-box',
				path: '/admin/departments/pcActivities/clinical',
			},
			{
				id: 2,
				title: 'Emergency Services',
				count: 5,
				icon: 'mdi-bed',
				path: '/admin/departments/pcActivities/emergency',
			},
			{
				id: 3,
				title: 'Diagnostic Services',
				count: 8,
				icon: 'mdi-needle',
				path: '/admin/departments/pcActivities/diagnostic',
			},
			{
				id: 4,
				title: 'Special Clinics / Services / Procedures',
				count: 14,
				icon: 'mdi-loupe',
				path: '/admin/departments/pcActivities/special',
			},
			{
				id: 5,
				title: 'OT & Other Procedures',
				count: 12,
				icon: 'mdi-fan',
				path: '/admin/departments/pcActivities/otservice',
			}
		],
  })
}
</script>
<style scoped>
.disp
{
  color: #ffffff;
  font-size: 15px;
  font-weight: normal;
}

.disp-icon
{
  color: #ffffff;
  font-size: 24px;
  font-weight: normal;
}
</style>
