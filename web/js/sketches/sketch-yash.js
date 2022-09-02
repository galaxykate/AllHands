
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
			// const tune = this.sketch.sounds[5]+40
			const note = Tone.Time(this.sketch.freq).toNotation() 
			const now = Tone.now()
			const tune = this.sketch.sounds_x[0]

			// this.sketch.synth.triggerAttack(Tone.Frequency(tune, "midi").toNote())
			// this.sketch.synth.triggerAttack(Tone.Midi(Tone.Frequency(tune, "midi").toNote()).transpose(3))
			// this.sketch.synth.triggerAttack(Tone.Midi(Tone.Frequency(tune, "midi").toNote()).transpose(6))
			// this.sketch.synth.triggerAttack(Tone.Midi(Tone.Frequency(tune, "midi").toNote()).transpose(9))
			// this.sketch.synth.releaseAll(now + this.sketch.freq);
			synth.setNote("F#6");
			
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
		<div>
			<div  v-for="pt in sketch.sounds_x">
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
	freq: 0.3,
	sounds: [],
	sounds_x: [],
	music: [],
	synth : new Tone.Synth().toDestination(),

	init(p) {
		console.log("INIT SKETCH", this.id)
		for(var i=0; i<10; i++){
			this.sounds.push(20*i)
		}
		for(var i=0; i<10; i++){
			this.sounds_x.push(20*i)
		}
		for(var i=0; i<30; i++){
			
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
					
					var samp_x = finger.fingerTip.v[1]
					samp_x=(samp_x+(p.height/2))*20/p.height + 50

				this.sounds[fingerIndex+handIndex*5] = samp
				this.sounds_x[fingerIndex+handIndex*5] = samp_x
				
				p.noFill()
				p.strokeWeight(1)
				p.stroke(fingerIndex*20 + 150*handIndex, 100, 50, .8)
				finger.fingerTip.draw(p, 5)
			}) 	
				
		})

		p.pop()
	}
}