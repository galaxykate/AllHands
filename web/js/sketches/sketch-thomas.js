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

class PlayerController extends GameObject {	
	body

	constructor(initX, initY, world) {
		super(initX, initY)
		var pl = planck, Vec2 = pl.Vec2;
		this.world = world
		var box = world.createBody().setDynamic()
		box.createFixture(pl.Box(0.5, 0.5));
		box.setPosition(Vec2(this.x, this.y));
		box.setMassData({mass : 1, center : Vec2(), I : 1})
	}

	update(dt) {
		
	}
}

sketches["thomas"] = {
	id: "thomas",
	desc: "Small platformer",
	gameObjects: [],
	init(p) {
		console.log("INIT SKETCH", this.id)
		this.world = planck.World(planck.Vec2(0, -10))
		player = new PlayerController(50, 50, this.world)
		this.gameObjects.push(player);
	},
	draw(p, t, dt) {
		// Update
		for(var i = 0; i < this.gameObjects.length; i++)
		{
			this.gameObjects[i].update(dt)
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