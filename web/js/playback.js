/**
 * Playback and recording for the handtracking
 **/

class Finger {
	constructor() {
		this.joints = []
		for (var i = 0; i < 4; i++) {
			this.joints[i] = new Vector(Math.random()*100, Math.random()*100)
		}
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
 	setFromFrame(data) {
 		this.data = data
 		// console.log(data.length)
 		this.wrist.setTo(data[0])
 		// First 5 are thumb
 		this.fingers.forEach((finger,fingerIndex) => {
 			for (var i = 0; i < finger.joints.length; i++) {
 				let i2 = i + fingerIndex*4 + 1
 				finger.joints[i].setTo(data[i2])
 			}
 		})
 	}
}


class Hands {
 	constructor() {
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

 	setFromFrame(data) {
 		// console.log(data)
 		// Ok, we have N hands
 		for (var i = 0; i < data.length; i++) {
 			if (this.hands.length -1 < i) {
 				console.log("Not enough hands for data, adding hand #", this.hands.length)
 				this.hands.push(new Hand())
 			}
 			let hand = this.hands[i]
 			hand.setFromFrame(data[i])
 		}
 	}

 	setFromArray(data) {

 	}

 	toFrame(data) {

 	}

 	toArray(data) {

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
	template: `<div>
		<!-- PLAYBACK UI -->
		<div  class="section">
			<span class="label">Play recording</span>
			<select v-model="recordingID">
				<option v-for="id in Object.keys(recordedHandData)">{{id}}</option>
			</select>

			<button class="emoji-button" @click="togglePlayback">
				<span v-if="mode='playback'">⏸</span>
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
			if (!app.paused) {
				this.step += 1
				this.step %= this.playbackData.length
				app.hands.setFromFrame(this.playbackData[this.step])
			}
		}, 100) 
				
	},
	methods: {
		togglePlayback() {

		},
		toggleRecording() {
			
		}

	},
	computed: {
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
			recordedHandData: recordedHandData,
			step: 0,
			// "playback", "live"
			isRecording: false,
			mode: "playback",
			recordingBuffer: [],
			recordingID: "myhands",
			playbackID: "test"
		}
	},
	
})

