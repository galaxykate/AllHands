
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

		<div>test</div>
		<div>test</div>
		<div>test</div>
		<div>test</div>
		<div>test</div>
		
		<div v-for="v in app.hands.left.fingers[0].joints">
			{{v}}

		</div>
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
		p.background(100)
		// p.fill(0, 0, 100, .1)
		// p.rect(0, 0, p.width, p.height)

		p.push()
		// p.translate(p.width/2, p.height/2)

		// console.log(app.hands)
		// app.hands.forEachHand((hand, handIndex) => {
		// 	p.noStroke()
		// 	p.fill(handIndex*100, 100, 50)
		// 	hand.data.forEach((v,vIndex) => {
		// 		// console.log(v)
		// 		p.circle(...v, 50)
		// 		p.fill(0)
		// 		p.text(vIndex, ...v)
		// 	})
		// })

		



		app.hands.forEachHand((hand, handIndex) => {
			// Draw as circles
			hand.forEachFinger((finger, fingerIndex) => {
				finger.joints.forEach((joint, jointIndex) => {
					
					

				})
				p.strokeWeight(3)
				finger.pointingVector.drawArrow({
					p: p,
					center: finger.fingerTip,
				})
				p.fill(0)
				p.text("ANGLE" + finger.angle.toFixed(2), ...finger.fingerTip.v )
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
			// hand.forEachFinger((finger, fingerIndex) => {
			// 	p.noFill()
			// 	p.strokeWeight(1)
			// 	p.stroke(fingerIndex*20 + 150*handIndex, 100, 50, .4)
			// 	finger.fingerTip.draw(p, 50)
			// }) 
		})

		p.pop()
	}

}