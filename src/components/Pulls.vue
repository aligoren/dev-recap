<template>
	<div>
		<b-card class="bottom-5" v-for="pull in pulls" :key="pull.id">
			<h5><a :href="pull.html_url" target="_blank">{{ pull.title }} <span class="text-secondary">#{{ pull.number }}</span></a></h5>
			<p>
				<strong>Created At: </strong> <strong class="text-secondary">{{ formatDate(pull.created_at) }}</strong> -
				<strong>Updated At: </strong> <strong class="text-secondary">{{ formatDate(pull.updated_at) }}</strong>
			</p>
			<p v-html="parseBody(pull.body)"></p>
		</b-card>
	</div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'
import moment from 'moment'
import marked from 'marked'

export default {
	name: 'Pulls',
	data() {
		return {
			url: 'https://api.github.com/repos/thepracticaldev/dev.to/pulls?sort=created&direction=desc'
		}
	},
	computed: {
		...mapGetters('pulls', [
			'pulls'
		])
	},
	mounted() {
		this.fetchPulls()
		.then(() => {
			this.makeImagesResponsive()
		})
	},
	methods: {
		...mapActions('pulls', [
			'fillPulls'
		]),
		async fetchPulls() {
			let pulls = await fetch(`${this.url}`).then(resp => resp.json())

			pulls = pulls.filter(pull => {
				const now = moment().isoWeekday(1)
				const pullDate = moment(pull.created_at).isoWeekday(1)

				return now.isSame(pullDate, 'week')
			})


			return new Promise((resolve, reject) => {
				try {
					this.fillPulls(pulls)
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
