<template>
	<div class="modal">
		<div class="modal-content">
			<div @click="$emit('close')" class="close">Close</div>
			<h3>Reset Password</h3>
			<div v-if="!showSucess">
				<p>Enter your email to reset the password</p>
				<form @submit.prevent>
					<input v-model.trim="email" type="email" placeholder="you@email.com" />
				</form>
				<p v-if="errorMsg !== ''" class="error"> {{errorMsg}} </p>
				<button @click="resetPassword()" class="button">Reset</button>
			</div>
			<div v-else>Success! Chock your email for a reset link</div>
		</div>
	</div>
</template>

<script>
import { auth } from '@/firebase'

export default {
	data() {
		return {
			email: '',
			showSuccess: false,
			errorMsg: ''
		}
	},
	methods: {
		async resetPassword() {
			this.errorMsg = ''

			try {
				await auth.sendPasswordResetEmail(this.email)
				this.showSuccess = true
			} catch (err) {
				this.errorMsg = err.message
			}
		}
	}
}
</script>

<style>

</style>