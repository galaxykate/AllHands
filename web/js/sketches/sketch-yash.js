
Vue.component("controls-yash", {
	
	template: `<div>

		<button @click="chaos">PLAY!!</button>
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

			// this.sketch.synth.triggerAttack(Tone.Midi(tune).toMidi(), note)

			var intervalId = window.setInterval(this.c_music, this.sketch.freq*1000);
			
					},
		c_music(){
			// const tune = this.sketch.sounds[5]+40
			const note = Tone.Time(this.sketch.freq).toNotation() 
			const now = Tone.now()
			const tune = this.sketch.sounds_x[0]

			var tunee = Tone.Frequency( this.sketch.music[Math.floor(this.sketch.sounds_x[0])], "midi").toNote()
			// this.sketch.synth.setNote(tunee); // "C5");
			this.sketch.synth.triggerAttackRelease([tunee,Tone.Midi(tunee).transpose(this.sketch.sounds[5])],note)
			
		}			
	},
	props: ["app", "sketch"]
})

Vue.component("debug-yash", {
	template: `<div>
		sounds!! music..??

		left hand to change pitches, right hand to change harmonies

		{{sketch.frame}}
	</div>`,
	props: ["app","sketch"]
})


sketches["yash"] = {
	id: "yash",
	desc: "Example things!",
	soundNum: 40,
	freq: 2,
	sounds: [],
	sounds_x: [],
	music: [],
	synth : new Tone.PolySynth(Tone.AMSynth).toDestination(),
	init(p) {
		console.log("INIT SKETCH", this.id)
		for(var i=0; i<10; i++){
			this.sounds.push(20*i)
		}
		for(var i=0; i<10; i++){
			this.sounds_x.push(20*i)
		}
		for(var i=0; i<100; i++){
				this.music.push(i+10)
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
					
					var samp_x = finger.fingerTip.v[0]
					samp_x = samp_x*90/p.width

					var samp = finger.fingerTip.v[1]
					samp = samp*6/p.height
				this.sounds[fingerIndex+handIndex*5] = samp
				this.sounds_x[fingerIndex+handIndex*5] = samp_x
				
				p.noFill()
				p.strokeWeight(1)
				p.stroke(fingerIndex*20 + 150*handIndex, 100, 50, .8)
				finger.fingerTip.draw(p, 5)
			}) 	
				
		})
		p.background(100)
		// p.fill(0, 0, 100, .1)
		// p.rect(0, 0, p.width, p.height)

		p.push()
		// p.translate(p.width/2, p.height/2)

		// console.log(app.hands)
		// app.hands.forEachHand((hand, handIndex) => {
		// 	p.noStroke()
		// 	p.fill(handIndex*100, 100, 50)
		// 	hand.data.forEach((v,vIndex) => {
		// 		// console.log(v)
		// 		p.circle(...v, 50)
		// 		p.fill(0)
		// 		p.text(vIndex, ...v)
		// 	})
		// })

		



		app.hands.forEachHand((hand, handIndex) => {
			// Draw as circles
			hand.forEachFinger((finger, fingerIndex) => {
				finger.joints.forEach((joint, jointIndex) => {
					
					

				})
				p.strokeWeight(3)
				finger.pointingVector.drawArrow({
					p: p,
					center: finger.fingerTip,
				})
				p.fill(0)
				p.text("ANGLE" + finger.angle.toFixed(2), ...finger.fingerTip.v )
			}) 
		

			// Draw as tube
			hand.forEachFinger((finger, fingerIndex) => {
				p.strokeWeight(10)
				p.noFill()
				p.stroke(fingerIndex*20 + 150*handIndex, 100, 50, 1)
				p.beginShape()
				finger.joints.forEach((joint, jointIndex) => {
					joint.vertex(p)
					// joint.draw(p, 10)
				})
				p.endShape()
			}) 
			p.noStroke()
				
			// Just fingertips
			// hand.forEachFinger((finger, fingerIndex) => {
			// 	p.noFill()
			// 	p.strokeWeight(1)
			// 	p.stroke(fingerIndex*20 + 150*handIndex, 100, 50, .4)
			// 	finger.fingerTip.draw(p, 50)
			// }) 
		})

		p.pop()

		p.pop()
	}
}