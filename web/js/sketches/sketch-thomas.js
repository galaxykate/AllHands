Vue.component("controls-thomas", {
	template: `<div>MY TEST CONTROLS HERE</div>`,
	props: ["app"]
})

Vue.component("debug-thomas", {
	template: `<div>MY TEST DEBUG HERE!!!!!</div>`,
	props: ["app"]
})

sketches["thomas"] = {
	id: "thomas",
	desc: "Small platformer",
	gameObjects: [],
	init(p) {
		console.log("INIT SKETCH", this.id)
		this.world = planck.World(planck.Vec2(0, 10))
		var player = new PlayerController(2, 10, this.world)
		this.gameObjects.push(player);
		var platform = new Platform(1, 20, 23, 1, this.world)
		this.gameObjects.push(platform);
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
