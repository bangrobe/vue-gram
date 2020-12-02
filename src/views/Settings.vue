<template>
	<div id="settings">
		<div class="col1">
			<h3>Settings</h3>
			<p>Update your profile</p>
			<transition name="fade">
				<p v-if="showSuccess" class="success">Profile updated</p>
			</transition>

			<form @submit.prevent>
				<label for="name">Name</label>
				<input type="text" v-model.trim="name" :placeholder="userProfile.name" id="name"/>
				<label for="title">Job title</label>
				<input type="text" v-model.trim="title" :placeholder="userProfile.title" id="title" />
				<button @click="updateProfile" class="button">Update</button>
			</form>
		</div>
		
	</div>
</template>

<script>
import { mapState } from 'vuex';
export default {
	data() {
		return {
			name: '',
			title: '',
			showSuccess: false
		}
	},
	computed: {
		...mapState(['userProfile'])
	},
	methods: {
		updateProfile() {
			this.$store.dispatch('updateProfile', {
				name: this.name !== '' ? this.name : this.userProfile.name,
				title: this.title !== '' ? this.title : this.userProfile.title
			})

			this.name = ''
			this.title = ''

			this.showSuccess = true

			//Hide thong bao success sau 2s
			setTimeout( () => {
				this.showSuccess = false
			},2000)
		}
	}
}
</script>

<style>

</style>