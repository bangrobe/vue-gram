<template>
	<div id="dashboard">
		<transition name="fade">
			<comment-modal v-if="showModalComment" :post="selectedPost" @close="toggleModalComment()"></comment-modal>
		</transition>
		<section>
			<div class="col1">
				<div class="profile">
					<h5> {{userProfile.name}}</h5>
					<p>{{userProfile.title}}</p>
					<div class="create-post">
						<p>Create a post</p>
						<form @submit.prevent>
							<textarea v-model.trim="post.content"></textarea>
							<button class="button" @click="createPost()" :disabled = "post.content === ''">Post</button>
						</form>
					</div>
				</div>
			</div>
			<div class="col2">
				<div v-if="posts.length">
					<div v-for="post in posts" :key="post.id" class="post">
						<h5>{{ post.userName}} </h5>
						<span> {{post.createdOn | formatDate}} </span>
						<p> {{ post.content | trimLength }}</p>
						<ul>
							<li><a @click="toggleModalComment(post)">comments {{ post.comments }} </a></li>
							<li><a @click="likePost(post.id, post.likes)">likes {{post.likes}} </a></li>
							<li><a @click="viewPost(post)">View full post</a></li>
						</ul>
					</div>
				</div>
				<div v-else>
					<p class="no-results">There are currently no posts</p>

				</div>
			</div>
		</section>
		<!--POST MODAL-->
		<transition name="fade">
			<div class="p-modal" v-if="showPostModal">
				<div class="p-container">
					<a @click="closePostModal" class="close">Close</a>
					<div class="post">
						<h5> {{fullPost.userName }}</h5>
						<span> {{ fullPost.createdOn | formatDate }}</span>
						<p> {{ fullPost.content }}</p>
						<ul>
							<li><a> comments {{ fullPost.comments }}</a></li>
							<li><a>Likes {{fullPost.likes}} </a></li>
						</ul>
					</div>
					<div v-show="postComments.length" class="comments">
						<div v-for="comment in postComments" :key="comment.id" class="comment">
							<p> {{comment.userName}} </p>
							<span> {{ comment.createdOn | formatDate}}</span>
							<p> {{comment.content}} </p>
						</div>	
					</div>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
import moment from 'moment';
import { mapState } from 'vuex';
import { commentsCollection } from '@/firebase'
import CommentModal from '@/components/CommentModal'
export default {
	components: {
		CommentModal
	},
	data() {
		return {
			post: {
				content: ''
			},
			showModalComment: false,
			selectedPost: {},
			showPostModal: false,
			fullPost: {},
			postComments: []
		}
	},
	computed: { 
		...mapState(['userProfile','posts'])
	},
	methods: {
		createPost() {
			const content = this.post.content
			this.$store.dispatch('createPost', { content })
			this.post.content = ''
		},
		toggleModalComment(post) {
			this.showModalComment = !this.showModalComment
			//Neu modal dang mo thi thiet lap selectedPost, con khong thi clear
			if(this.showModalComment) {
				this.selectedPost = post
			} else {
				this.selectedPost = {}
			}
		},
		likePost(id, likesCount) {
			this.$store.dispatch('likePost', {id, likesCount})
		},
		//Show Post
		async viewPost(post) {
			//Get comments
			const comments = await commentsCollection.where('postId', '==', post.id).get()

			comments.forEach( doc => {
				let comment = doc.data()
				comment.id = doc.id;
				this.postComments.push(comment)
			})
			
			this.fullPost = post;
			this.showPostModal = true

		},
		closePostModal() {
			this.postComments = [],
			this.showPostModal = false
		}
	},
	//Thay doi dang hien thi ngay gio
	filters: {
		formatDate(val) {
			if (!val) { return '-'}

			let date = val.toDate()
			return moment(date).fromNow()
		},
		trimLength(val) {
			if (val.length < 200) { return val }
			return `${val.substring(0,200)}...`
		}
	}
}
</script>

<style>

</style>