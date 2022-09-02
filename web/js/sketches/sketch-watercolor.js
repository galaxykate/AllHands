
Vue.component("controls-watercolor", {
	template: `<div>

		
		<input type="color" />
	</div>`,
	methods: {
		
	},
	props: ["app", "sketch"]
})

Vue.component("debug-watercolor", {
	template: `<div>

		<h3>Watercolors</h3>
		
	</div>`,
	props: ["app", "sketch"]
})


sketches["watercolor"] = {
	id: "watercolor",
	frame: 0,
	forceMultiplier: 1,
	desc: "Example things!",

	// If you want Vue to see thing
	points: [],
	init(p) {
		console.log("INIT SKETCH", this.id)
		p.background(0)

		// Particles!
		for (var i = 0; i < 10; i++) {

			// PARTICLES!!!
			// Make a bunch of random points
			// The Vector library is Kate's
			// Make a random point on the canvas
			let v = Vector.random([0,0], [p.width, p.height])

			// Give us an id number
			v.idNumber = i

			// Random polar (r, theta)
			v.velocity = Vector.polar(10, Math.random()*100)
			v.force = new Vector(0,0)
			this.points.push(v)
		}
		// console.log(this.points)
	},

	draw(p, t, dt) {
		this.frame += 1
		// p.background(0)
		p.fill(0, 0, 0, .02)
		p.rect(0, 0, p.width, p.height)


		//-------------------------------
		// Update each particle first 

		// Set the forces first
		this.points.forEach(pt => {
			// Zero out the force
			pt.force.mult(0)

			// add a gravity force
			// add(x, y)
			pt.force.add(0, 10)

			// add a wander force
			let wanderAmt = 200*this.forceMultiplier
			let wanderDir = 20*noise(pt.idNumber, t*.2)
			pt.force.addPolar(wanderAmt, wanderDir)

			// add a wind force
			let windScale = .001
			let windAmt = 200*this.forceMultiplier
			let nx = pt.v[0]*windScale
			let ny = pt.v[1]*windScale
			let windDir = 20*noise(nx, ny, t)
			pt.force.addPolar(windAmt, windDir)

			// Be attracted to hands
			// app.hands.forEachHand(hand => {
			// 	hand.forEachFingertip((fingertip, index) => {
			// 		// Get the vector offset to this particle
			// 		console.log(pt, fingertip)
			// 		let offset = pt.getOffsetTo(fingertip)
			// 		let m = offset.getMagnitude()
			// 		pt.force.addMultiples(offset, 10/m)
			// 	})
			// })
			
		})

		// Move and accelerate
		this.points.forEach(pt => {
			// Accelerate
			// addMultiples(vector, scalar, vector, scalar....)
			pt.velocity.addMultiples(pt.force, dt)

			// Move
			pt.addMultiples(pt.velocity, dt)

			// Slow down with some drag
			pt.velocity.mult(.94)
		})

		// Any post-update stuff
		this.points.forEach(pt => {	
			pt.wrap(0, p.width, 0, p.height)

			// Bounce
			// if (pt.v[1] > p.height) {
			// 	pt.velocity.v[1] *= -1
			// 	pt.v[1] -= 10
			// }
		})

		//-------------------------------
		// Then draw each particles


		app.hands.forEachHand((hand, handIndex) => {
			// Draw as circles
			hand.forEachFinger((finger, fingerIndex) => {
				p.noStroke()
				let hue = (fingerIndex*20 + handIndex*120)%360
				let pt = finger.fingerTip
				console.log(pt)
				for (var i = 0; i < 10; i++) {
					let r = 3 + 8*Math.random()
					p.noStroke()
					p.fill(hue + 10*Math.random(), 100, 30 + Math.random()*50, .1)
					pt.drawPolarOffsetCircle(p, Math.random()*30, Math.random()*100, r)
				
				}
					

				
			}) 
		})

		
	}

}