Vue.component("controls-handball", {
	template: `<div>MY TEST CONTROLS HERE</div>`,
	props: ["app"]
})

Vue.component("debug-handball", {
	template: `<div>MY TEST DEBUG HERE!!!!!</div>`,
	props: ["app"]
})

sketches["handball"] = {
	id: "handball",
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
		let level1 = createLevel(this.world)
		this.gameObjects = this.gameObjects.concat(level1)
		this.world.on('post-solve', function(contact) {
			var fA = contact.getFixtureA(), bA = fA.getBody();
			var fB = contact.getFixtureB(), bB = fB.getBody();
			fA.getUserData().collision(fB.getUserData());
			fB.getUserData().collision(fA.getUserData());
		});
	},
	draw(p, t, dt) {
		// Update

		fingers = [];

        var index = 0
        app.hands.forEachHand((hand, handIndex) => {
            hand.forEachFinger((finger, fingerIndex) => {
                fingers.push([finger.fingerTip.x, finger.fingerTip.y])

                index++
            })
        })

        fingers = fingers.sort(sortFunction);

        for(var i = 0; i < this.floor.points.length; i++)
            this.floor.points[i].y =  25*(fingers[i][1] / p.height)

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
