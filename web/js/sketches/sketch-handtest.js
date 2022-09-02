
Vue.component("controls-handtest", {
	template: `<div>

	</div>`,
	methods: {
		togglePause() {

		},
		chaos() {
			console.log("CHAOS")
			this.sketch.forceMultiplier *= 1.2
		}
	},
	props: ["app", "sketch"]
})

Vue.component("debug-handtest", {
	template: `<div>

	</div>`,
	props: ["app", "sketch"]
})


sketches["handtest"] = {
	id: "handtest",
	frame: 0,
	forceMultiplier: 1,
	desc: "Example things!",

	// If you want Vue to see thing
	points: [],
	init(p) {
		p.fill(0, 0, 100, 1)
		console.log("INIT HAND TEST", this.id)

	},

	draw(p, t, dt) {
		// p.background(0)
		p.fill(0, 0, 100, 1)
		p.rect(0, 0, p.width, p.height)

		p.push()
		p.translate(p.width/2, p.height/2)
		app.hands.forEachHand((hand, handIndex) => {
			p.fill(handIndex*100, 100, 50)
			hand.data.forEach(v => {
				// console.log(v)
				p.circle(...v, 5)
			})

			hand.data.slice(0,5).forEach(v => {
				p.noFill()
				p.circle(...v, 15)
			})
		})

		p.pop()



		// app.hands.forEachHand((hand, handIndex) => {
		// 	hand.forEachFinger((finger, fingerIndex) => {
		// 		p.fill(fingerIndex*10, )
		// 		finger.joints.forEach((joint, jointIndex) => {
		// 			p.circle(...j, 50 - jointIndex*5)
		// 		})
		// 	}) 
		// })
	}

}