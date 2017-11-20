let audio = new Audio('metronome.wav')
let toggleButton = document.getElementById("toggle")
let bpmField = document.getElementById("bpm")
let metronomeActive = false

bpmField.value = 60

function metronome() {

	function tick() {
		let dt = Date.now() - self.expected
		console.log(60000/self.bpm-dt)
		self.expected += 60000/self.bpm
		let timeout = setTimeout(() => {audio.currentTime = 0; audio.play(); tick()}, 60000/self.bpm - dt)
	}

	const self = {
		start : function start() {
			self.active = true
			self.expected = Date.now() + 60000/self.bpm
			console.log(self.expected)
			tick()
		},
		stop : function stop() {
			self.active = false
			clearTimeout(timeout)
		},
		bpm : bpmField.value,
		expected : null,
		active : false
	}
	return self
}

m = metronome()

bpmField.addEventListener("keyup", (event) => {
	if (event.keyCode == 13) {
		m.bpm = bpmField.value
	}
})

toggleButton.onclick = () => {
	if (m.active) {
		m.stop()
	} else {
		m.start()
	}
}