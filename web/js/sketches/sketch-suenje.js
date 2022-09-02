Vue.component("controls-suenje", {
	template: `<div>MY TEST CONTROLS HERE</div>`,
	props: ["app"]
})

Vue.component("debug-suenje", {
	template: `<div>MY TEST DEBUG HERE!!!!!</div>`,
	props: ["app"]
})

sketches["suenje"] = {
	id: "suenje",
	desc: "Small platformer",
	gameObjects: [],
	floor:{},
	init(p) {
		console.log("INIT SKETCH", this.id)
		this.world = planck.World(planck.Vec2(0, 10))
		var player = new PlayerController(2, 10, this.world)
		this.gameObjects.push(player);
		this.floor = new FloorController(1, 24, this.world);
		this.gameObjects.push(this.floor)
		//var platform = new Platform(1, 20, 23, 1, this.world)
		//this.gameObjects.push(platform);
		let level1 = createLevel(this.world)
		this.gameObjects = this.gameObjects.concat(level1)
	},
	draw(p, t, dt) {
		// Update
		for(var i = 0; i < this.gameObjects.length; i++)
			this.gameObjects[i].update(p, dt)
		this.world.step(dt);

		// Draw
		p.background(0)
		for (var i = 0; i < this.gameObjects.length; i++) {
			this.gameObjects[i].draw(p)
		}

	}	
}
