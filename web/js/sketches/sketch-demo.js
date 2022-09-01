
Vue.component("controls-test", {
	template: `<div>MY TEST CONTROLS HERE</div>`,
	props: ["app"]
})

Vue.component("debug-test", {
	template: `<div>MY TEST DEBUG HERE</div>`,
	props: ["app"]
})


sketches["test"] = {
	id: "test",
	desc: "Example things!",
	init(p) {
		console.log("INIT SKETCH", this.id)
	},
	draw(p) {
		p.rect(0, 0, 100, 100)
	}

}