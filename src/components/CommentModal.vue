<template>
	<div class="c-modal">
		<div class="c-container">
			<a @click="$emit('close')">Close</a>
			<p> Add a comment</p>
			<form @submit.prevent>
				<textarea v-model.trim="comment"></textarea>
				<button @click="addComment()" class="button" 
				:disabled = "comment == ''">Submit</button>
			</form>
		</div>
	</div>
</template>

<script>
import { commentsCollection, postsCollection, auth } from '@/firebase';

export default {
	props: ['post'],
	data() {
		return {
			comment: ''
		}
	},
	methods: {
		async addComment() {
			//Tao comment
			await commentsCollection.add({
				createdOn: new Date(),
				content: this.comment,
				postId: this.post.id,
				userId: auth.currentUser.uid,
				userName: this.$store.state.userProfile.name
			})

			//Update comment count
			await postsCollection.doc(this.post.id).update({
				comments: parseInt(this.post.comments) + 1
			})

			//Close medal
			this.$emit('close')
		}
	}
}

</script>

<style lang="scss">

</style>