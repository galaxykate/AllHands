/**
 * Playback and recording for the handtracking
 **/

class Finger {
	constructor() {
		this.pointingVector = new Vector(0,0)
		this.joints = []
		for (var i = 0; i < 4; i++) {
			this.joints[i] = new Vector(Math.random()*100, Math.random()*100)
			this.joints[i].visible = true
		}

		this.fingerTip = this.joints[3]
	}

	get angle() {
		return this.pointingVector.angle
	}

	update() {
		this.pointingVector.setToDifference(this.joints[3], this.joints[2])
	}
}

class Hand {
	constructor() {
		this.data = []	
		this.fingers = []
		this.wrist = new Vector(0,0)
		for (var i = 0; i < 5; i++) {
			this.fingers[i] = new Finger()
		}


	}

	forEachFinger(fxn) {
 		this.fingers.forEach(fxn)
 	}

 	forEachFingertip(fxn) {
 		this.fingers.forEach((f,fingerIndex) => fxn(f.fingerTip, fingerIndex))
 	}

 	setFromFrame(data, hf) {

 		this.data = data
 		// console.log("Hand data", data.length, data)

 		function setPt(v, pt) {
 			if (hf) {
				// Handsfree is in format {x,y,visiblity}
				let pos = [-(pt.x)*canvasW + canvasW, (pt.y)*canvasH]
				v.setTo(pos)
				
			} else
				v.setTo(pt[0] + canvasW/2, pt[1] + canvasW/2)
 		}
 		setPt(this.wrist, data[0])
 		// this.wrist.setTo(data[0])
 		// First 5 are thumb
 		this.fingers.forEach((finger,fingerIndex) => {
 			for (var i = 0; i < finger.joints.length; i++) {
 				let i2 = i + fingerIndex*4 + 1
 				let pt = data[i2]
 				if (pt) {
 					setPt(finger.joints[i], pt)
 				}
 			}
 			finger.update()
 		})


 	}
}


class Hands {


 	constructor() {
 		this.recordingBuffer = []
 		this.hands = []
 	}

 	forEachHand(fxn) {
 		this.hands.forEach(fxn)
 	}

 	get left() {
 		return this.hands[0]
 	}

 	get right() {
 		return this.hands[1]
 	}

 	setFromFrame(data, hf) {
 		// console.log("Set from frame", data, hf)
 		// Ok, we have N hands
 		for (var i = 0; i < data.length; i++) {
 			if (this.hands.length -1 < i) {
 				console.log("Not enough hands for data, adding hand #", this.hands.length)
 				this.hands.push(new Hand())
 			}
 			let hand = this.hands[i]
 			hand.setFromFrame(data[i], hf)
 		}
 	}

 	setFromArray(data) {

 	}

 	toFrame(data) {

 	}

 	toArray(data) {

 	}

 	applyHandsFreeData(data) {
 		if (!app.paused) {
	 		this.setFromFrame(data, true)
	 		this.recordingBuffer.push(data)
	 	}
 		// add to 
 	}
 }

 let recordedHandData = {
 	test: testHandData
 }

 // playback: {
	// 	isActive: true,
	// 	paused: false,
	// 	pct: 0,
	// 	step: 0,
	// 	fps: 20,
	// 	id: "test",
	// 	toggle() {
	// 		app.playback.isActive = !app.playback.isActive
	// 		console.log("playback", app.playback, )
	// 	},
	// },
	// recording: {
	// 	isActive: false,
	// 	toggle() {
	// 		app.recording.isActive = !app.recording.isActive
	// 		console.log("recording", app.recording.id, app.recording.isActive)
	// 	},
	// 	saveRecording() {
	// 		// TODO: add to recordedHandData and also 
	// 	},
	// 	id: "myhands"
	// },
	// recordedHandData: {
	// 	test: testHandData
	// 	// TODO: load from localstorage too
	// },


Vue.component("playback", {
	template: `<div style="display:flex">

		

		<div>
			<button @click="toggleHF">ENABLE LIVE TRACKING</button>
			<span class="label">HF:</span>{{handsfreeStatus}}
			<span class="label">MODE:</span>{{mode}}

		</div>



		<!-- PLAYBACK UI -->
		<div  class="section">
			<span class="label">Play recording</span>
			<select v-model="recordingID">
				<option v-for="id in Object.keys(recordedHandData)">{{id}}</option>
			</select>

			<button class="emoji-button" @click="togglePlayback">
				<span v-if="mode==='playback'">⏸</span>
				<span v-else>▶️</span>
			</button>
			<input class="slider" type="range" v-model="pct">
		</div>

		<!-- RECORDING UI -->
		<div  class="section">
			<span class="label">Record as</span>
			<input v-model="recordingID" />
			<button class="emoji-button" @click="toggleRecording">
				<span v-if="isRecording">⏸</span>
				<span v-else>⏺</span>
			</button>

			<span v-if="isRecording" class="alert">RECORDING</span>

		</div >

	</div>`,

	mounted() {

		this.step = 50
		console.log(this.playbackData)
		app.hands.setFromFrame(this.playbackData[10])

		// When to increment the hand data
		setInterval(() => {
			if (!app.paused && this.mode === "playback") {
				this.step += 1
				this.step %= this.playbackData.length
				app.hands.setFromFrame(this.playbackData[this.step])
			}
		}, 100) 
				
	},
	methods: {
		toggleHF() {
			if (this.mode !== "live") {

				this.mode = "live"
				initHandsFree()
			} else {
				this.mode = "playback"
			}
		},
		togglePlayback() {

		},
		toggleRecording() {
			
		}

	},
	computed: {
		handsfreeStatus() {
			let statusWords = ["inactive", "loading", "active", "hands detected"]
			return statusWords[app.handsfreeStatus]
		},
		playbackData() {
			return recordedHandData.test
		},
		pct: {
			get() {

			},
			set(pct) {

			}
		}
	},
	data() {
		return {
			app: app,
			recordedHandData: recordedHandData,
			step: 0,
			// "playback", "live"
			isRecording: false,
			mode: "playback",
			
			recordingID: "myhands",
			playbackID: "test"
		}
	},
	
})

