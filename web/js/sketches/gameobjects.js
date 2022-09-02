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
			this.box.setLinearVelocity(pl.Vec2(-this.speed * dt, 0))
		}
		if (p.keyIsDown(p.RIGHT_ARROW)) {
			this.box.setLinearVelocity(pl.Vec2(this.speed * dt, 0))
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
