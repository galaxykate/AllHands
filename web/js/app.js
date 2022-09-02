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



let app = {
	paused: false,

	hands: new Hands(),
	
	// Location of the mouse
	mouse: new Vector(),
}




// Setup and Vue things
document.addEventListener("DOMContentLoaded", function(){
	


	/**
	 * VUE INSTANCE FOR THE WHOLE APP
	 **/

	new Vue({
		el : "#app",
		template: `<div id="app" >
			<div class="header app-header">
				
				<!-- SKETCH SELECTOR -->
				<div class="header-section">
					<span class="label">Select sketch</span>
					<select v-model="currentID">
						<option v-for="id in sketchIDs">{{id}}</option>
					</select>
				</div>

				<playback />
			
				<!-- SPEED/PAUSE UI -->
				<div  class="header-section">
					<span v-if="app.paused">paused</span>
				</div>
			</div>

			<div id="main-columns"> 
				<div class="main-column">
					<div class="p5-holder" ref="p5"></div>
					<div class="controls" ref="controls">
						-- custom controls here --
						<component v-if="current" :is="'controls-' + currentID" :app="app" :sketch="current" />
					</div>
				</div>
				<div class="main-column">
					<div>CurrentID:{{currentID}}</div>
				
					-- debug features here --
					

					<component v-if="current" :is="'debug-' + currentID"  :app="app" :sketch="current" />

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
				// Draw

			
				p.draw = () => {
					// TIME
					let t = p.millis()*.001
					let dt = p.deltaTime*.001

					// HAND PLAYBACK
				

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
				app: app,
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
		app.paused = !app.paused
		console.log("paused", app.paused)
	}
});
