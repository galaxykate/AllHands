Vue.component("controls-spriteshot", {
	template: `<div><button @click='sketch.alien = sketch.alien.mutate()'>🧬</button></div>`,
	props: ["app","sketch"]
})

Vue.component("debug-spriteshot", {
	// template: `<div>${invaders[0].x},${invaders[0].y}</div>`,
	// template: `<div>${invaders[0].x}</div>`,
	template: `<div>hehehe</div>`,

	props: ["app"]
})

//ALIEN DESIGN
PX_SIZE = 16;
BASE_DESIGN = [
	[0,4,0,0,0,0,4,0],
	[0,0,4,4,4,4,0,0],
	[0,0,8,4,4,8,0,0],
	[0,0,4,4,4,4,0,0],
	[0,4,4,4,4,4,4,0],
	[0,4,4,4,4,4,4,0],
	[0,0,4,0,0,4,0,0],
	[0,0,0,0,0,0,0,0]
	]

COLORS = ["#bada55","#ED0003","#FF8600","#FEFE37","#01FE00","#3501FF","#8C00FC","#ffffff",'#000000']

//make a new alien sprite
function Alien(x,y,grid){
	this.x = x;
	this.y = y;
	this.grid = grid;
}

//Need to fix this (maybe use premade sprites of varying colors)
Alien.prototype.mutate = function(prob=0.1){
	grid2 = [];
	for(let r=0;r<8;r++){
		let row=[];
		for(let c=0;c<8;c++){
			let v = this.grid[r][c]
			if(prob*(v==0?1:0.25) > Math.random()){   //more likely to add than delete a pixel
				console.log("heyo")
				row.push(Math.floor(Math.random()*9))
			}else{
				row.push(v)
			}
		}
		grid2.push(row)
	}
	console.log(grid2)
	return new Alien(this.x,this.y,grid2)
}

//remove a random chunk (circular)
Alien.prototype.remove = function(x,y,size=3){
	for(let r=0;r<area[1];r++){
		for(let c=0;c<area[0];c++){
			let x2 = x+r;
			let y2 = y+c;
			if(x2<8 && x2>=0 && y2<8 && y2>=0)
				this.grid[y2][x2] = 0;  //delete the pixel
		}
	}
}

//rebuild from a chunk
Alien.prototype.rebuild = function(section){

}



sketches["spriteshot"] = {
	id: "spriteshot",
	desc: "Example things!",
	alien:null,
	init(p) {
		console.log("INIT SKETCH", this.id)
		this.alien = new Alien(p.width/2-64,p.height/2-64,BASE_DESIGN);
		
	},




	draw(p, t, dt) {
		
		let x = 30;
		let y = 40;

		//
		p.background(359)
		for(let r=0;r<8;r++){
			for(let c=0;c<8;c++){
				let v = this.alien.grid[r][c]
				if (v == 0)  //skip transparent
					continue

				p.fill(COLORS[v]);
				p.stroke("#000000")
				p.rect(x+c*PX_SIZE,y+r*PX_SIZE,PX_SIZE,PX_SIZE);
			}
		}

	}

}


