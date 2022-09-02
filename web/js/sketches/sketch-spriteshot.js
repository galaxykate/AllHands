Vue.component("controls-spriteshot", {
	template: `<div>
	<button @click='sketch.alien = sketch.alien.mutate()'>🧬</button>
	<button @click='sketch.alien = sketch.alien.mutateCA()'>🌳</button>
	<button @click='sketch.alien = sketch.alien.safeMutate()'>👍</button>
	<button @click='sketch.randRemove()'>💥</button>
	<button @click='sketch.randShootandFix()'>🤕</button>
	</div>`,
	props: ["app","sketch"]
})

Vue.component("debug-spriteshot", {
	// template: `<div>${invaders[0].X},${invaders[0].y}</div>`,
	// template: `<div>${invaders[0].X}</div>`,
	template: `<div>

	On Alien?: 
	{{sketch.overlapping}}
	</div>`,

	props: ["app","sketch"]
})

//ALIEN DESIGN
PX_SIZE = 16;
X = "x"
BASE_DESIGN = [
	[0,X,0,0,0,0,X,0],
	[0,0,X,X,X,X,0,0],
	[0,0,8,X,X,8,0,0],
	[0,0,X,X,X,X,0,0],
	[0,0,X,X,X,X,0,0],
	[0,0,X,X,X,X,0,0],
	[0,0,X,0,0,X,0,0],
	[0,0,0,0,0,0,0,0]
	]

COLORS = ["#bada55","#ED0003","#FF8600","#FEFE37","#01FE00","#3501FF","#8C00FC","#ffffff",'#000000']

BULLET2 = [
	[1,0,0,1],
	[0,0,0,0],
	[0,0,0,0],
	[1,0,0,1]
]


//make a new alien sprite
function Alien2(x,y,bc,grid){
	this.x = x;
	this.y = y;
	this.baseColor = bc
	this.grid = grid;
	this.tx = -1;
	this.ty = -1;
}

Alien2.prototype.draw = function(p) {
	p.push()
	p.translate(this.x, this.y)

	 // p.fill(0, 100, 50)
	 // p.circle(0,0,100)
	 // p.push()
	 // p.translate(-100,-100)
// Draw all pixels

// for (let i = 0; i < 10; i++) {
// 	p.translate(90, 10)
// 	p.rotate(10)
	for(let r=0;r<8;r++){
		for(let c=0;c<8;c++){
			// ggird value
			let v = this.grid[r][c]
			if (v == 0)  //skip transparent
				continue
			if (isNaN(v))
				v = this.baseColor
			p.fill(COLORS[v]);
			p.strokeWeight(1);
			p.stroke("#000000")
			p.rect(c*PX_SIZE,r*PX_SIZE,PX_SIZE,PX_SIZE);
		}
	}
	//show top left
	// p.fill(0,100,50)
	// p.circle(0,0,10)
// }
	// p.pop()

	p.pop()
}

//Need to fix this (maybe use premade sprites of varying colors)
Alien2.prototype.mutate = function(repairColor,prob=0.1){
	grid2 = [];
	for(let r=0;r<8;r++){
		let row=[];
		for(let c=0;c<8;c++){
			let v = this.grid[r][c]
			if(prob*(v==0?1:0.25) > Math.random()){   //more likely to add than delete a pixel
				row.push((Math.random() < 0.3 ? this.baseColor : repairColor))
				//row.push(Math.floor(Math.random()*9))
			}else{
				row.push(v)
			}
		}
		grid2.push(row)
	}
	return new Alien2(this.x,this.y,this.baseColor,grid2)
}

//count the non-zero neighbors for a cell grid
Alien2.prototype.ctNei = function(x,y){
	let n = 0;
	if(y-1>=0 && this.grid[y-1][x]!=0)
		n++;
	if(y+1<8 && this.grid[y+1][x]!=0)
		n++;
	if(x-1>=0 && this.grid[y][x-1]!=0)
		n++;
	if(x+1<8 && this.grid[y][x+1]!=0)
		n++;
	return n
}

//count the number of non-zero colors
Alien2.prototype.ctColor = function(){
	let c = 0;
	for(let r=0;r<8;r++){
		for(let c=0;c<8;c++){
			if(this.grid[r][c] != 0)
				c++
		}
	}
	return c;
}

//set the base color to the majority non-zero color
//NOT TESTED lol
Alien2.prototype.changeBase = function(){
	let colCt = [0] //first is base color (instead of zero)
	for(let o=0;o<COLORS.length;o++){
		colCt.push(0)
	}
	let total = 0;
	for(let r=0;r<8;r++){
		for(let c=0;c<8;c++){
			let v = this.grid[r][c];
			if(v == X){
				colCt[0]++;
				total++;
			}
			else if(v != 0){
				colCt[v]++;
				total++;
			}
		}
	}
	let newbase = colCt.indexOf(Math.max(...colCt));

	//change to new majority everything if base is not
	if(newbase != this.baseColor){
		//convert to normal
		for(let r=0;r<8;r++){
			for(let c=0;c<8;c++){
				let v = this.grid[r][c];
				if(v == X)
					this.grid[r][c] = this.baseColor;
			}
		}
		//convert to base color
		for(let r=0;r<8;r++){
			for(let c=0;c<8;c++){
				let v = this.grid[r][c];
				if(v == newbase)
					this.grid[r][c] = X;
			}
		}
		//change base
		this.baseColor = newbase;
	}
}

Alien2.prototype.newPart = function(prob=0.4){
	if(Math.random()<prob)
		return this.baseColor;
	else
		return Math.floor(Math.random()*7)+1
}


Alien2.prototype.mutateCA = function(repairColor,prob=0.5){
	grid2 = [];
	for(let r=0;r<8;r++){
		let row=[];
		for(let c=0;c<8;c++){
			let v = this.grid[r][c]
			if(v == 8){
				row.push(8)
				continue
			}
			let nnei = this.ctNei(c,r);
			if(nnei > 0 && nnei < 4){   //more likely to add than delete a pixel
				row.push((prob < Math.random() ? (Math.random() < 0.3 ? this.baseColor : repairColor) : 0))
				//row.push(Math.floor(Math.random()*9))
			}else if(nnei == 4 || nnei == 0){
				row.push(0);
				//row.push(v)
			}
		}
		grid2.push(row)
	}

	return new Alien2(this.x,this.y,this.baseColor,grid2)
}

//mutate with cellular automata but ensure there is enough pixels left in the sprite
Alien2.prototype.safeMutate = function(perc=0.5){
	let newAlien = this.mutateCA(this.newPart());
	//add the face back
	for(let r=1;r<4;r++){
		for(let c=2;c<6;c++){
			if(newAlien.grid[r][c] == 8)
				continue
			newAlien.grid[r][c] = newAlien.baseColor;
		}
	}
	//add more just in case
	let i = 0;
	for(let b=0;b<10;b++){
		if(newAlien.ctColor() < 64*0.5)
			break
		newAlien = newAlien.mutate(this.newPart());	
	}

	//replace majority color
	newAlien.changeBase();

	return newAlien

}

//remove a random chunk (circular) using binary operations
Alien2.prototype.remove = function(x,y,bullet){
	let s = bullet.length; //assume circular bullet
	for(let r=0;r<4;r++){
		for(let c=0;c<4;c++){
			if(bullet[r][c] == 1){
				console.log("hey")
				continue
			}
			let x2 = x+c;
			let y2 = y+r;
			//console.log(`${y2},${x2} -> ${r},${c}`)
			if(x2<8 && x2>=0 && y2<8 && y2>=0 && this.grid[y2][x2]!=8){
				// this.grid[y2][x2] = 8;
				this.grid[y2][x2] = 0;  //delete or keep the pixel
			}
		}
	}
}

//rebuild from a chunk blown off
Alien2.prototype.rebuild = function(X,y,bullet){
	let repairColor = this.newPart()
	let s = bullet.length; //assume circular bullet
	for(let r=0;r<s+1;r++){
		for(let c=0;c<s+1;c++){
			let x2 = X+c;
			let y2 = y+r;
			if(x2<8 && x2>=0 && y2<8 && y2>=0 && this.grid[y2][x2]!=8){
				let v = this.grid[y2][x2]
				let f = 0;
				let nnei = this.ctNei(y2,x2);
				if(nnei > 0 && nnei < 4){   //more likely to add than delete a pixel
					f = (0.7 < Math.random() ? (Math.random() < 0.6 ? this.baseColor : repairColor) : v)
					//row.push(Math.floor(Math.random()*9))
				}else if(nnei == 4 || nnei == 0){
					f = v;
				}
				this.grid[y2][x2] = f
			}
		}
	}
}

//check if bounding box overlapped
Alien2.prototype.canHit = function(barrel){
	let rw = PX_SIZE*8;
	let rh = PX_SIZE*8;
	let rx = this.x + PX_SIZE*4;
	let ry = this.y + PX_SIZE*4;
	let cx = Math.abs(barrel.x - rx)
	let cy = Math.abs(barrel.y - ry)

	if (cx > (rw/2 + barrel.r)){
		return false
	}
	if (cy > (rh/2+barrel.r)){
		console.log()
		return false
	}

	if (cx <= rw/2)
		return true;
	if (cy <= rh/2)
		return true;

	let cd = Math.pow((cx - rw/2),2) + Math.pow((cy-rh/2),2)
	return cd <= Math.pow(barrel.r,2)

}

//get the relative center position of an object
Alien2.prototype.relPos = function(t){
	return {x:Math.floor((t.x-this.x)/PX_SIZE),y:Math.floor((t.y-this.y)/PX_SIZE)}
}


sketches["spriteshot"] = {
	id: "spriteshot",
	desc: "Example things!",
	alien:null,
	overlapping:false,
	init(p) {
		console.log("INIT SKETCH", this.id)
		// this.alien = new Alien2(p.width/2,p.height/2,4,BASE_DESIGN);
		this.alien = new Alien2(p.width/2,p.height/2,4,BASE_DESIGN);
	},

	//randomly remove parts of the alien
	randRemove(){
		// let x = Math.floor(Math.random()*10)-2;
		// let y = Math.floor(Math.random()*10)-2;
		// let x = 3;
		// let y = 2;
		let x = 0;
		let y = 0;
		console.log(`BANG!: ${x},${y}`)
		this.alien.remove(x,y,BULLET2);
	},

	randShootandFix(){
		let x = Math.floor(Math.random()*10)-2;
		let y = Math.floor(Math.random()*10)-2;
		console.log(`BANG and FIX!: ${x},${y}`)
		this.alien.remove(x,y,BULLET2);
		this.alien.rebuild(x,y,BULLET2);
	},

	pow(mx,my){
		let target = {x:mx,y:my-20,r:16}
		if(!this.alien.canHit(target)){
			console.log("MISS!");
			return
		}
		apos = this.alien.relPos(target)
		this.alien.tx = apos.x;
		this.alien.ty = apos.y;
		console.log(`BANG BANG!: ${apos.x},${apos.y}`)
		this.alien.remove(apos.x,apos.y,BULLET2)
		
	},


	inRange(X,Y){
		let target = {x:X,y:Y-20,r:16}
		return this.alien.canHit(target)
	},


	draw(p, t, dt) {
		
		// let X = 30;
		// let y = 40;
		let xo = 0;
		let yo = 0;

		p.background(359)

		//draw some aliens
		p.push()
		p.translate()
		this.alien.draw(p)
		p.pop()


		//draw the gun
		let xp = p.mouseX-5;
		let yp = p.mouseY+5;

		p.textSize(16);
		p.fill(0)
		p.text("X",xp,yp);
		p.strokeWeight(2);
		p.fill(359,100,50,0.2)
		p.ellipse(p.mouseX,p.mouseY,16*2);

		this.overlapping = this.inRange(xp,yp);
		p.fill(0)
		p.text(`${this.alien.tx},${this.alien.ty}`,this.alien.x+5*PX_SIZE,this.alien.y+12*PX_SIZE)

		if(p.mouseIsPressed){
			this.pow(xp,yp);
		}

	}

}


