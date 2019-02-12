<template>
	<div>
		<b-card class="bottom-5" v-for="issue in issues" :key="issue.id">
			<h5><a :href="issue.html_url" target="_blank">{{ issue.title }} <span class="text-secondary">#{{ issue.number }}</span></a></h5>
			<p>
				<strong>Created At: </strong> <strong class="text-secondary">{{ formatDate(issue.created_at) }}</strong> -
				<strong>Updated At: </strong> <strong class="text-secondary">{{ formatDate(issue.updated_at) }}</strong>
			</p>
			<p v-html="parseBody(issue.body)"></p>
		</b-card>
	</div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'
import moment from 'moment'
import marked from 'marked'

export default {
	name: 'Issues',
	data() {
		return {
			url: 'https://api.github.com/repos/thepracticaldev/dev.to/issues?sort=created&direction=desc'
		}
	},
	computed: {
		...mapGetters('issues', [
			'issues'
		])
	},
	mounted() {
		this.fetchIssues()
		.then(() => {
			this.makeImagesResponsive()
		})

	},
	methods: {
		...mapActions('issues', [
			'fillIssues'
		]),
		async fetchIssues() {
			let issues = await fetch(`${this.url}`).then(resp => resp.json())

			issues = issues.filter(issue => {
				const now = moment().isoWeekday(1)
				const issueDate = moment(issue.created_at).isoWeekday(1)
				const isPullRequest = issue.hasOwnProperty('pull_request')
				return now.isSame(issueDate, 'week') && !isPullRequest
			})

			return new Promise((resolve, reject) => {
				try {
					this.fillIssues(issues)
					resolve({ok: true})
				} catch (error) {
					reject({ok: false})
				}
			})

		},
		parseBody(body) {
			return marked(body)
		},
		formatDate(date) {
			return moment(date).format('MM/DD/YYYY')
		},
		makeImagesResponsive() {
			const images = document.querySelectorAll("img")

			images.forEach(image => {
				image.classList.add('img-fluid')
			})
		}
	}
}
</script>

<style>
.bottom-5 {
	margin-bottom: 10px;
}
</style>
