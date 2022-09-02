Vue.component("controls-thomas", {
	template: `<div>MY TEST CONTROLS HERE</div>`,
	props: ["app"]
})

Vue.component("debug-thomas", {
	template: `<div>MY TEST DEBUG HERE!!!!!</div>`,
	props: ["app"]
})

const screenSpace = new planck.Vec2(25, 25)

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

	update(p, dt) {
		for(var i = 0; i < this.components.length; i++) {
			this.components.update(dt)
		}
	}
}

const physicsScale = new planck.Vec2(0.6, 0.6);

class PlayerController extends GameObject {	
	box
	height = 2
	width = 1
	speed = 10

	constructor(initX, initY, world) {
		var pl = planck, Vec2 = pl.Vec2;
		super(initX, initY)
		this.box = world.createBody().setDynamic()
		this.box.createFixture(pl.Box(this.width*0.5, this.height*0.5));
		this.box.setPosition(Vec2(this.x, this.y));
		this.box.setMassData({ mass : 1, center : Vec2(), I : 1})
	}

	update(p, dt) {
		var pos = this.box.getPosition()
		this.x = pos.x
		this.y = pos.y

		if (p.keyIsDown(p.LEFT_ARROW)) {
			this.box.move
		}
		if (p.keyIsDown(p.RIGHT_ARROW)) {
			this.x += this.speed * dt
		}
	}

	draw(p) {
		var dx = p.width / screenSpace.x 
		var dy = p.height / screenSpace.y
		p.fill(100)
		p.rect(this.x * dx, this.y * dy, this.width * dx, this.height * dy)
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
		this.body.createFixture(pl.Box(width*0.5, height))
		this.body.setPosition(Vec2(this.x, this.y))
	}

	draw(p) {
		var dx = p.width / screenSpace.x 
		var dy = p.height / screenSpace.y
		p.fill(30)
		p.rect(this.x * dx, this.y * dy, this.width * dx, this.height * dy)
	}
}

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
