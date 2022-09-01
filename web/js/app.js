/**
 * TEAM all hands on deck
 * Members:
 **/
 
let sketches = {

}


// Moving noise into the global scope so its not attached to P5
let noise = () => {}
const canvasW = 700
const canvasH = 480



let controls = {

	startMask: "theater",
	paused: false,
	playingRecordedData: true,
	playingFrame: 0,
	recording: false,

	maskOffset: new Vector(0,0),
	maskZoom: 1,
}

let app = {
	
	// 
	recordingData: {hand:[],face:[]},

	// Location of the mouse
	mouse: new Vector(),


	

	// draw(p) {
		
	// 	p.push()
	// 	p.translate(p.width/2, p.height/2)
		

	// 	// Set the relative offset based on the current offset
	// 	// console.log(app.mouse)
	// 	let relOffset = Vector.add(controls.maskOffset, app.mouse.dragOffset)
	// 	relOffset.mult(-1)
	// 	controls.zoom = (SLIDER.zoom*8)**1.5 + 1

	// 	p.scale(controls.zoom, controls.zoom)
	// 	p.translate(...relOffset)

	// 	let t = p.millis()*.001
	// 	let dt = p.deltaTime*.001
		
		
	// 	if (app.maskFxn) {
	// 		if (!controls.paused)
	// 			app.maskFxn(p)
	// 	}

	// 	if (app.maskInstance) {
	// 		if (!controls.paused)
	// 			app.maskInstance.update(t, dt, p.frameCount, p)	
	// 		app.maskInstance.draw(p)	
	// 	}
	
		
		
	// },

	// updateFace(p) {
		
	// 	// Run some update code every frame

	// 	// If we are recording, 
	// 	//   push a copy of the current face/hand points onto the recording data
	// 	if (controls.recording) {
	// 		app.recordingData.face.push(face.points.map(pt => pt.slice(0)))

	// 		let handData = hand.map(h => h.points.map(pt => pt.slice(0)))
	// 		app.recordingData.hand.push(handData)
	// 	} 

	// 	// If we are *playing* recorded data, 
	// 	//  use the current frame of the recorded data to set the hands/face
	// 	if (controls.playingRecordedData) {
			
	// 		if (!controls.paused && p.frameCount%3 == 1) {
	// 			controls.playingFrame++
	// 			// console.log(frame)
	// 			let frame = controls.playingFrame%testFaceData.length
	// 			let faceData = testFaceData[frame]
	// 			face.points.forEach((pt,i) => pt.copy(faceData[i]))
				
	// 			let handData = testHandData[frame]
	// 			hand.forEach((h,index) => {
	// 				h.points.forEach((pt,i) => pt.copy(handData[index][i]))
	// 			})

				
	// 			calculateMetaTrackingData()
	// 		}
	// 	} else {
	// 		// Currently using Handsfree, its updated on its own schedule
	// 	}
	// }
}





// Setup and Vue things
document.addEventListener("DOMContentLoaded", function(){
	


	/**
	 * VUE INSTANCE FOR THE WHOLE APP
	 **/

	new Vue({
		el : "#app",
		template: `<div id="app" >
			<div class="header">
					-- meta controls here --

					<select v-model="currentID">
						<option v-for="id in sketchIDs">{{id}}</option>
					</select>
			</div>

			<div id="main-columns"> 
				<div class="main-column">
					<div class="p5-holder" ref="p5"></div>
					<div class="controls" ref="controls">
						-- custom controls here --
						<component v-if="current" :is="'controls-' + currentID" />
					</div>
				</div>
				<div class="main-column">
					<div>CurrentID:{{currentID}}</div>
					Current sketch data: {{current}}
					-- debug features here --
					

					<component v-if="current" :is="'debug-' + currentID" />

				</div>
			</div>

			
		</div>`,
		watch: {
			current() {
				
				this.current.init(app.p5)
			},
			currentID() {
				console.log("Sketch id changed:", this.currentID)
				localStorage.setItem("lastSketch", this.currentID)
			}
		},
		computed: {
			current() {
				return this.sketches[this.currentID]
			},
			sketchIDs() {
				return Object.keys(this.sketches)
			}
		},

		mounted() {
			// Do lots of P5 setup
			app.p5 = new p5((p) => {
				// Save the noise fxn
				noise = p.noise
				// Save a mouse position
				
				
				// Basic P5 setup
				p.setup = () => {
					p.createCanvas(canvasW, canvasH)
					p.colorMode(p.HSL)
					p.ellipseMode(p.RADIUS)

					if (this.current)
						this.current.init(p)
				}

				//-------------------------------------------
				// Mouse things

				app.mouse.dragStart = new Vector(0,0)
				app.mouse.dragOffset = new Vector(0,0)


				// Utility fxn to test if mouse in p5
				function mouseInP5() {
					return p.mouseX > 0 && p.mouseX < canvasW && p.mouseY > 0 && p.mouseY < canvasH
				}

				p.mousePressed = () => {
					if (mouseInP5()) {
						app.mouse.dragging = true
						app.mouse.dragStart.setTo(p.mouseX, p.mouseY)
					}
				}
				p.mouseReleased = () => {
					// Stopped dragging? Update the offset
					app.mouse.dragging = false
					controls.maskOffset[0] += app.mouse.dragOffset[0]
					controls.maskOffset[1] += app.mouse.dragOffset[1]
					app.mouse.dragOffset.setTo(0, 0)
				}
				
				p.mouseMoved = () => { app.mouse.setTo(p.mouseX, p.mouseY) }
				p.mouseDragged = () => {
					app.mouse.setTo(p.mouseX, p.mouseY)
					if (app.mouse.dragging) {
						app.mouse.dragOffset.setToDifference(app.mouse.dragStart, app.mouse)
				
					}
				}
				p.doubleClicked = () => {}

				p.mouseClicked = () => {}

				//-------------------------------------------
				// Draw

				let recordedFrame = 0

				p.draw = () => {
					let t = p.millis()*.001
					let dt = p.deltaTime*.001
					// Draw whatever the current's drawing is
					if (this.current.draw) {
						
						this.current.draw(p, t, dt)
					}
					else {
						console.warn(`${this.currentID} has no draw fxn`)
					}
				}

			}, this.$refs.p5)


		},
		
		data() {
			return {
				sketches: sketches,

				// Set the current sketch to the last sketch opened
				// (or the first sketch in the list if there isn't one)
				currentID: localStorage.getItem("lastSketch")||Object.keys(sketches)[0],
				
			}
		}
		
	}) 
})

document.addEventListener('keyup', function(e){
	
	console.log(e)
	if (e.key === "Shift") {
		// Clear all the shift-selected
		app.shiftDown = false
		// Vue.set(app, "shiftSelected", [])
	}
});  

document.addEventListener('keydown', function(e){
	if (e.key === "Shift") {
		app.shiftDown = true
		Vue.set(app, "shiftSelected", [])
	}
	if (e.code === "Space") {
		controls.paused = !controls.paused
		console.log("paused", controls.paused)
	}
});
