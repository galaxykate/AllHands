Vue.component("controls-thomas", {
	template: `<div>MY TEST CONTROLS HERE</div>`,
	props: ["app"]
})

Vue.component("debug-thomas", {
	template: `<div>MY TEST DEBUG HERE!!!!!</div>`,
	props: ["app"]
})

class GameObject {
	x = 0
	y = 0
	components = []

	constructor(initX, initY) {
		this.x = initX
		this.y = initY
	}

	register(component) {
		this.components.push(component);
		component.gameObject = this;
	}

	update(dt) {
		for(var i = 0; i < this.components.length; i++) {
			this.components.update(dt)
		}
	}
}

const physicsScale = new planck.Vec2(0.6, 0.6);

class PlayerController extends GameObject {	
	box

	constructor(initX, initY, world) {
		var pl = planck, Vec2 = pl.Vec2;
		super(initX, initY)
		this.box = world.createBody().setDynamic()
		this.box.createFixture(pl.Box(25 * physicsScale.x, 25 * physicsScale.y));
		this.box.setPosition(Vec2(this.x, this.y));
		this.box.setMassData({ mass : 1, center : Vec2(), I : 1})
	}

	update(dt) {
		var pos = this.box.getPosition()
		this.x = pos.x
		this.y = pos.y
	}

	draw(p) {
		p.strokeWeight(1)
		p.stroke(100)
		p.rect(this.x, this.y, 25, 25)
	}
}

class Platform extends GameObject {
	body
	width
	height

	constructor(initX, initY, width, height, world) {
		var pl = planck, Vec2 = pl.Vec2;
		super(initX, initY)
		this.width = width
		this.height = height
		this.body = world.createBody()
		this.body.createFixture(pl.Box(width, height))
		this.body.setPosition(Vec2(this.x, this.y))
	}

	draw(p) {
		p.strokeWeight(1)
		p.stroke(100)
		p.rect(this.x, this.y, this.width, this.height)
	}
}

sketches["thomas"] = {
	id: "thomas",
	desc: "Small platformer",
	gameObjects: [],
	init(p) {
		console.log("INIT SKETCH", this.id)
		this.world = planck.World(planck.Vec2(0, 100))
		var player = new PlayerController(50, 50, this.world)
		this.gameObjects.push(player);
		var platform = new Platform(0, p.height - 100, p.width, 10, this.world)
		this.gameObjects.push(platform);
	},
	draw(p, t, dt) {
		// Update
		for(var i = 0; i < this.gameObjects.length; i++)
			this.gameObjects[i].update(dt)
		this.world.step(dt);

		// Draw
		p.background(0)
		for (var i = 0; i < this.gameObjects.length; i++) {
			this.gameObjects[i].draw(p)
		}
	}
}
