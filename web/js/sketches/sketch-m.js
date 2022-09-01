



function Invader(x,y,txt){
	this.x = x;
	this.sy = y;
	this.y = y;
	this.txt = txt;
	this.vx = 1;     //x velocity
	this.wl = (Math.floor(Math.random()*9)+1);  //wavelength
	this.speed = (Math.floor(Math.random()*9)+1);
}


// let a;

sketches["m"] = {
	id: "m",
	desc: "Example things!",
	init(p) {
		console.log("INIT SKETCH", this.id)
		this.invaders = []
		this.numInvaders = 3;

		// sinv_img = p.loadImage('assets/imgs/space_invader.png');
		// sinv_img2 = p.loadImage('assets/imgs/space_invader2.png');
		for(let n=0;n<this.numInvaders;n++){
			// this.invaders.push(new Invader(Math.floor(Math.random()*20)+10,Math.random()*p.height,"👾"));
			// this.invaders.push(new Invader(Math.floor(Math.random()*(p.width-32))+32,Math.floor(Math.random()*(p.height-32))+32,"👾"));
			this.invaders.push(new Invader(20,(Math.random()*(p.height-32))+32,"👾"));
		}

		console.log(this.invaders[0].speed);
		console.log(this.invaders[1].speed);
		// a = p.loadImage('assets/imgs/space_invader.png')
	},
	draw(p, t, dt) {
		
		// for (var i = 0; i < 100; i++) {
		// 	let hue = (150 + i*20 + t*100)%360
		// 	// Set the inner color to be DARKER
		// 	p.fill(hue, 100, 50)

		// 	p.strokeWeight(2)
		// 	p.stroke(hue, 100, 80)
		// 	// Set the stroke color to be LIGHTER
		// 	p.rect(i*20, i*10, 100, 100)
		// }
		p.background(0);
		p.textSize(64);
		p.fill(100);

		//show little space invader dude doing the wave
		for(let i=0;i<this.invaders.length;i++){
			//left-right
			let inv = this.invaders[i];
			if (inv.x > p.width-64){
				inv.vx = -1*inv.speed
			}else if(inv.x < 0){
				inv.vx = 1*inv.speed
			}
			inv.x += inv.vx;
			

			//up-down
			// let wave = Math.sin(t*5)*5+inv.speed;
			// let off = (p.height*0.33*i)
			// inv.y = wave// + off;
			inv.y = inv.sy+Math.sin(t);

			//show the invaders
			p.text(inv.txt, inv.x, inv.y);
		}


	}

}

let r = "hello"

Vue.component("controls-m", {
	template: `<div>MY TEST CONTROLS HERE</div>`,
	props: ["app"]
})

Vue.component("debug-m", {
	// template: `<div>${invaders[0].x},${invaders[0].y}</div>`,
	// template: `<div>${invaders[0].x}</div>`,
	template: `<div>hehehe</div>`,

	props: ["app"]
})