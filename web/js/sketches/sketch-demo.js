
Vue.component("controls-test", {
	template: `<div>MY TEST CONTROLS HERE</div>`,
	props: ["app"]
})

Vue.component("debug-test", {
	template: `<div>MY TEST DEBUG HERE!!!!!</div>`,
	props: ["app"]
})


sketches["test"] = {
	id: "test",
	desc: "Example things!",
	init(p) {
		console.log("INIT SKETCH", this.id)
	},
	draw(p, t, dt) {
		// p.background(0)
		p.fill(0, 0, 0, 1)
		p.rect(0, 0, p.width, p.height)
			
		let count = 100
		let size = 6
		for (var i = 0; i < count; i++) {

			let x = i*p.width/count
			// let y = i*10 + 120*Math.sin(t + i)

			let y = 400*(noise(i*.02, t*.2) - .5) + 300

			let hue = (100*noise(i , t))%360
			// Set the inner color to be DARKER
			// let sat = 50 + 50*Math.sin(i +t )
			let sat = 100
			p.fill(hue, sat, 30, .2)

			p.strokeWeight(2)
			p.stroke(hue + 20, sat, 50)
			// p.noStroke()
			// Set the stroke color to be LIGHTER
			p.rect(x, y, size, size)
		}
		
	}

}