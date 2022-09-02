
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
			p.noStroke()
			p.fill(handIndex*100, 100, 50)
			hand.data.forEach((v,vIndex) => {
				// console.log(v)
				p.circle(...v, 5)
				p.fill(0)
				p.text(vIndex, ...v)
			})

			hand.data.slice(0,5).forEach(v => {
				p.noFill()
				p.circle(...v, 15)

				p.fill(0)

			})
		})

		



		app.hands.forEachHand((hand, handIndex) => {
			// Draw as circles
			hand.forEachFinger((finger, fingerIndex) => {
				p.noStroke()
				p.fill(fingerIndex*20 + 150*handIndex, 100, 50, .4)
				finger.joints.forEach((joint, jointIndex) => {
					joint.draw(p, 10)

				})
			}) 

			// Draw as tube
			hand.forEachFinger((finger, fingerIndex) => {
				p.strokeWeight(10)
				p.noFill()
				p.stroke(fingerIndex*20 + 150*handIndex, 100, 50, 1)
				p.beginShape()
				finger.joints.forEach((joint, jointIndex) => {
					joint.vertex(p)
					// joint.draw(p, 10)
				})
				p.endShape()
			}) 
			p.noStroke()
				
			// Just fingertips
			hand.forEachFinger((finger, fingerIndex) => {
				p.noFill()
				p.strokeWeight(1)
				p.stroke(fingerIndex*20 + 150*handIndex, 100, 50, .4)
				finger.fingerTip.draw(p, 50)
			}) 
		})

		p.pop()
	}

}