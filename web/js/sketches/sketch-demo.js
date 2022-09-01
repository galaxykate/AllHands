
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
	draw(p, t, dt) {
		
		for (var i = 0; i < 100; i++) {
			let hue = (150 + i*20 + t*100)%360
			// Set the inner color to be DARKER
			p.fill(hue, 100, 50)

			p.strokeWeight(2)
			p.stroke(hue, 100, 80)
			// Set the stroke color to be LIGHTER
			p.rect(i*20, i*10, 100, 100)
		}
		
	}

}