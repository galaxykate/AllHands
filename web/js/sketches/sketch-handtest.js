
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
		console.log("INIT HAND TEST", this.id)

	},

	draw(p, t, dt) {
		this.frame += 1
		// p.background(0)
		p.fill(0, 0, 0, .02)
		p.rect(0, 0, p.width, p.height)


		
	}

}