
Vue.component("controls-lulock", {
	template: `<div>LULOCKS TEST CONTROLS HERE</div>
	<button @click="chaos">😭</button>
	<input type="range" v-model="sketch.forceMultiplier" />
	<input type="color" />
	</div>`,
	methods: {
	togglePause() {},
	chaos() {
		console.log("CHAOS")
		// this.sketch.forceMultiplier *= 1.2
	}
},
props: ["app", "sketch"]
})

Vue.component("debug-lulock", {
	template: `<div>LULOCKS TEST DEBUG HERE</div>`,
	props: ["app", "sketch"]
})


sketches["lulock"] = {
	id: "lulock",
	desc: "Example things!",
	init(p) {
		console.log("hello world!", this.id)
	},
	draw(p, t, dt) {
		let count = 90
		let size = 32
		p.background(100)
		// let ang = p.radians(0);
		// let y2 = p.height / 2 + count * p.sin(ang)
		// p.ellipse(100, y2, .3*size + i, .3*size+ i)
		for (var i = 0; i < 100; i++) {		
			// p.fill(100)
			size = 16 + 10*Math.sin(i)
			let x = i*p.width/count
			// let y = i*10 + 120*Math.sin(t + i)

			let y = 500*(noise(i*.02, t*.2) - .5) + 300
			let hue = (i*20 + t*40)%360
			// Set the inner color to be DARKER
			
			
			p.strokeWeight(4)
			p.stroke(hue + 20, 90, 100)
			// Set the stroke color to be LIGHTER
			p.textAlign(p.CENTER)
			p.fill(hue, 100, 60)
			// p.textSize(64+i/3);
			p.ellipse(x, y, .3*size + i, .3*size+ i-p.mouseY)
			let ang = p.radians(0);
			let y2 = p.height / 2 + count * p.sin(ang)
			// p.beginShape()
			// p.bezierVertex(p.mouseX, p.mouseY, 400, 400, 600,)
			// p.endShape()
			// p.text('😍', x, y, p.width/2, p.height/2);

			// p.text('☀️🌬️🛬', p.width/2, p.height/2 + 100);
		}
		
	}

}