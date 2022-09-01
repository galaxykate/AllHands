
Vue.component("controls-yash", {
	template: `<div>MY yash CONTROLS HERE</div>`,
	props: ["app"]
})

Vue.component("debug-yash", {
	template: `<div>MY yash DEBUG HERE!!!!!</div>`,
	props: ["app"]
})


sketches["yash"] = {
	id: "yash",
	desc: "Example things!",
	init(p) {
		console.log("INIT SKETCH", this.id)
		//create a synth and connect it to the main output (your speakers)
		// const synth = new Tone.Synth().toDestination();

		//play a middle 'C' for the duration of an 8th note
		// synth.triggerAttackRelease("C4", "8n");
		new AudioContext();

		const osc = new Tone.Oscillator(440, "sine").toDestination().start();
	},
	draw(p, t, dt) {
		// p.background(0)
		p.fill(0, 0, 0, 1)
		p.rect(0, 0, p.width, p.height)
			
		let count = 100
		let size = 10
		for (var i = 0; i < count; i++) {
			size = 16 + 10*Math.sin(i)
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
			// p.arc(x, y, size, size)
			p.arc(x, y, size, size, Math.sin(t+i)*3.14, Math.sin(t)*3.14)
		}
		
	}

}