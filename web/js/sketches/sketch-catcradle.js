
Vue.component("controls-catcradle", {
	template: `<div>

		
		
	</div>`,
	methods: {
		
	},
	props: ["app", "sketch"]
})

Vue.component("debug-catcradle", {
	template: `<div>

		
		
	</div>`,
	props: ["app", "sketch"]
})


sketches["catcradle"] = {
	id: "catcradle",
	frame: 0,
	forceMultiplier: 1,
	desc: "Example things!",

	// If you want Vue to see thing
	points: [],
	init(p) {
		console.log("INIT SKETCH", this.id)
		p.background(0)

		// Particles!
		for (var i = 0; i < 100; i++) {

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
		// p.background(100)
		p.fill(100, 40, 0, .1)
		if (Math.random() < .7)
			p.rect(0, 0, p.width, p.height)


		//-------------------------------
		// Update each particle first 

		// Set the forces first
		this.points.forEach(pt => {
			// Zero out the force
			pt.force.mult(0)

			// add a gravity force
			// add(x, y)
			// pt.force.add(0, 10)

			// // add a wander force
			let wanderAmt = 400*this.forceMultiplier
			let wanderDir = 20*noise(pt.idNumber, t*.2)
			pt.force.addPolar(wanderAmt, wanderDir)

			// // add a wind force
			// let windScale = .001
			// let windAmt = 200*this.forceMultiplier
			// let nx = pt.v[0]*windScale
			// let ny = pt.v[1]*windScale
			// let windDir = 20*noise(nx, ny, t)
			// pt.force.addPolar(windAmt, windDir)

			// Be attracted to hands
			app.hands.forEachHand(hand => {
				hand.forEachFingertip((fingertip, index) => {
					// Get the vector offset to this particle
					// console.log(pt, fingertip)
					let offset = pt.getOffsetTo(fingertip)
					let m = offset.magnitude
					pt.force.addMultiples(offset, 1000*m**-1.4)
				})
			})
			
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
			pt.velocity.clampMagnitude(1, 1000)
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

		this.points.forEach(pt => {
			p.noStroke()

			for (var i = 0; i < 10; i++) {
				let h = noise(i + pt.idNumber + t)
				p.fill((500*h)%360, 100/i, 60 + 10*i, .2 + .1*i)
				let r = (60*h**3)/i + 1
				pt.draw(p, r)
			}
		})

		this.points.forEach(pt => {
			p.stroke(100, 0, 100, .3)
			p.strokeWeight(.2)
			for (var i = 0; i < 4; i++) {
				let pt2 = this.points[(i + 10)%this.points.length]
				pt2.drawLineTo({
					p:p, 
					v:pt,
					// paddingStart: 10,
					// paddingEnd: 10
				})
			}
		})
		app.hands.forEachHand((hand, handIndex) => {
			// Draw as circles
			hand.forEachFinger((finger, fingerIndex) => {
				finger.joints.forEach((joint, jointIndex) => {
					
					

				})
				// p.strokeWeight(3)
				// finger.pointingVector.drawArrow({
				// 	p: p,
				// 	center: finger.fingerTip,
				// })
				// p.fill(0)
				// p.text("ANGLE" + finger.angle.toFixed(2), ...finger.fingerTip.v )
			}) 
		

			// Draw as tube
			hand.forEachFinger((finger, fingerIndex) => {
				p.strokeWeight(8)
				p.noFill()
				p.stroke(0, 0, 50, .1)
				p.beginShape()
				finger.joints.forEach((joint, jointIndex) => {
					joint.vertex(p)
					// joint.draw(p, 10)
				})
				p.endShape()
			}) 
			p.noStroke()
		})

		
	}

}