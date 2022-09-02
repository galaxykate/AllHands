Vue.component("controls-roderick", {
	template: `<div>MY TEST CONTROLS HERE</div>`,
	props: ["app"]
})

Vue.component("debug-roderick", {
	template: `<div>MY TEST DEBUG HERE!!!!!</div>`,
	props: ["app"]
})

sketches["roderick"] = {
	id: "roderick",
	desc: "Small platformer",
	gameObjects: [],
	init(p) {
		console.log("INIT SKETCH", this.id)
		this.world = planck.World(planck.Vec2(0, -10))
		player = new PlayerController(50, 50, this.world)
		this.gameObjects.push(player);
	},
	draw(p, t, dt) {
		p.background(100)
		// Update
		for(var i = 0; i < this.gameObjects.length; i++)
		{
			this.gameObjects[i].update(dt)
			//this.gameObjects[i].x += dt
		}
		this.world.step(1/60);

		// Draw
		p.background(0)
		for (var i = 0; i < this.gameObjects.length; i++) {
			p.strokeWeight(1)
			p.stroke(100)
			// p.noStroke()
			// Set the stroke color to be LIGHTER
			go = this.gameObjects[i];
			p.rect(go.x, go.y, 10, 10)
		}
	}

}