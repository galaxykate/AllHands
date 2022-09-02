
Vue.component("controls-yash", {
	
	template: `<div>

		<button @click="chaos">😭</button>
		<input type="range" min = "1" max ="127" v-model="sketch.soundNum" />
		<input type="color" />
	</div>`,
	methods: {
		togglePause() {

		},
		chaos() {
			console.log("CHAOS")

			context = new AudioContext();
			context.resume()

			// var synth = new Tone.AMSynth().toDestination()

			const note = Tone.Time(this.sketch.freq).toNotation() 
			const tune = this.sketch.soundNum

			this.sketch.synth.triggerAttack(Tone.Midi(tune).toMidi(), note)

			var intervalId = window.setInterval(this.c_music, this.sketch.freq*1000);
			
					},
		c_music(){
			const tune = this.sketch.sounds[5]+40
			const note = Tone.Time(this.sketch.freq).toNotation() 
			this.sketch.synth.setNote(Tone.Midi(tune).toMidi(), note);
		}			
	},
	props: ["app", "sketch"]
})

Vue.component("debug-yash", {
	template: `<div>

		MY KATE DEBUG HERE!!!!!
		<h3>ID: {{sketch.id}}</h3>
		{{sketch.frame}}
		<div>sn: {{sketch.soundNum}}</div>
		<div>
			<div  v-for="pt in sketch.sounds">
				{{pt.toFixed(2)}}
			</div>
		</div>
	</div>`,
	props: ["app","sketch"]
})


sketches["yash"] = {
	id: "yash",
	desc: "Example things!",
	soundNum: 40,
	freq: 0.4,
	sounds: [],
	synth : new Tone.Synth().toDestination(),
	init(p) {
		console.log("INIT SKETCH", this.id)
		for(var i=0; i<10; i++){
			this.sounds.push(20*i)
		}
	},
	draw(p, t, dt) {
		this.frame += 1
		// p.background(0)
		p.fill(0, 0, 0, 1)
		p.rect(0, 0, p.width, p.height)

		p.push()
		p.translate(p.width/2, p.height/2)


		app.hands.forEachHand((hand, handIndex) => {
				hand.forEachFinger((finger, fingerIndex) => {
					var samp = finger.fingerTip.v[1] - hand.wrist.v[1]
					samp=(samp+(p.height/2))*127/p.height
					
				this.sounds[fingerIndex+handIndex*5] = samp
				// Vue(this.sounds[fingerIndex+handIndex*5],samp)
				
				p.noFill()
				p.strokeWeight(1)
				p.stroke(fingerIndex*20 + 150*handIndex, 100, 50, .8)
				finger.fingerTip.draw(p, 5)
			}) 	
				
		})

		p.pop()
	}
}