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
	floor: {},
	init(p) {
		console.log("INIT SKETCH", this.id)
		this.world = planck.World(planck.Vec2(0, 10))
		var player = new PlayerController(2, 10, this.world)
		this.gameObjects.push(player);
		//var platform = new Platform(1, 20, 23, 1, this.world)
		//this.gameObjects.push(platform);
		this.floor = new FloorController(1, 24, this.world);
		this.gameObjects.push(this.floor)
		// Level bounds
		this.gameObjects.push(new Platform(0, 0, 1, 25, this.world))
		this.gameObjects.push(new Platform(24, 0, 1, 25, this.world))
		this.gameObjects.push(new Platform(0, 0, 25, 1, this.world))
	},
	draw(p, t, dt) {
		// Update

		var index = 0
		app.hands.forEachHand((hand, handIndex) => {
			hand.forEachFinger((finger, fingerIndex) => {
				this.floor.points[index].y = 25*(finger.fingerTip.y / p.height)
				index++
			})
		})

		// for(var i = 0; i < this.floor.points.length; i++)
		// 	this.floor.points[i].y = finger.fingerTip[i].y

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
