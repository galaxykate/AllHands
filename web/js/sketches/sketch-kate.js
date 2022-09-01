
Vue.component("controls-kate", {
	template: `<div>

		<button @click="chaos">😭</button>
		<input type="range" v-model="sketch.forceMultiplier" />
		<input type="color" />
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

Vue.component("debug-kate", {
	template: `<div>

		MY KATE DEBUG HERE!!!!!
		<h3>ID: {{sketch.id}}</h3>
		{{sketch.frame}}
		<div>fm: {{sketch.forceMultiplier}}</div>
		<div>
			<div  v-for="pt in sketch.points">
				{{pt.toFixed(2)}}
			</div>
		</div>
	</div>`,
	props: ["app", "sketch"]
})


sketches["kate"] = {
	id: "kate",
	frame: 0,
	forceMultiplier: 1,
	desc: "Example things!",

	// If you want Vue to see thing
	points: [],
	init(p) {
		console.log("INIT SKETCH", this.id)


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
		this.points.forEach(pt => {
			// console.log(pt)

			// calculate color
			let hue = (30*noise(pt.idNumber + t) + 3*pt.idNumber)%360
			// p.fill(1, 100, 50, 1)
			p.noStroke()
			p.fill(hue, 100, 40, .1)
			pt.draw(p, 10)	
			p.fill(hue, 100, 80, 1)
			pt.draw(p, 8)	
			// pt.velocity.drawArrow({p, 
			// 	center:pt, 
			// 	color: [100, 100, 80]
			// })



			pt.force.drawArrow({p, 
				center:pt, 
				multiple: .01,
				color: [320, 100, 80]
			})
		})
		
	}

}