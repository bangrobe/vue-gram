<template>
	<div id="login">
		<section>
			<div class="col1">
				<h1>Vuegram</h1>
				<p>Welcome to the VueGram app</p>
			</div>
			<div :class="{ 'signup-form' : !showLoginForm }" class="col2">
				<form v-if="showLoginForm" @submit.prevent>
					<h1>Welcome Back</h1>
					<div>
						<label for="email1">Email</label>
						<input v-model.trim="loginForm.email" type="text" placeholder="you@email.com" id="email1" />
					</div>
					<div>
						<label for="password1">Password</label>
						<input v-model.trim="loginForm.password" type="password" placeholder="********" id="password1" />
					</div>
					<div class="button" @click="login()">Login</div>
					<div class="extras">
						<a>Forgot Password</a>
						<a @click="toggleForm()">Create an account</a>
					</div>
				</form>
				<!--Signup form-->
				<form v-else @submit.prevent>
					<h1>Get started!</h1>
					<div>
						<label for="name">Name</label>
						<input type="text" v-model.trim="signupForm.name" id="name" />
					</div>
					<div>
						<label for="title">Title</label>
						<input type="text" v-model.trim="signupForm.title" id="title" />
					</div>
					<div>
						<label for="email2">Email</label>
						<input type="text" v-model.trim="signupForm.email" id="email2" placeholder="you@email.com" />
					</div>
					<div>
						<label for="password2">Password</label>
						<input type="password" v-model.trim="signupForm.password" id="password2" placeholder="******" />
					</div>
					<button class="button" @click="signup()">Signup</button>
					<div class="extras">
						<a @click="toggleForm()">Back to Log in</a>
					</div>
				</form>
			</div>
		</section>
	</div>
</template>

<script>
export default {
	data() {
		return {
			showLoginForm: true,
			loginForm: {
				email: '',
				password: ''
			},
			signupForm: {
				name: '',
				title: '',
				email: '',
				password: ''
			}
		}
	},
	methods: {
		login() {
			this.$store.dispatch('login', {
				email: this.loginForm.email,
				password: this.loginForm.password
			})
		},
		signup() {
			this.$store.dispatch('signup', {
				email: this.signupForm.email,
				password: this.signupForm.password,
				name: this.signupForm.name,
				title: this.signupForm.title
			})
		},
		toggleForm() {
			this.showLoginForm = !this.showLoginForm
		}
	}
}
</script>

<style lang="scss" scoped>

</style>