let audio = new Audio('metronome.wav')
let toggleButton = document.getElementById("toggle")
let bpmField = document.getElementById("bpm")
let metronomeActive = false

bpmField.value = 60

function metronome() {
	
	let timeout

	function tick() {
		timeout = setTimeout(() => {audio.currentTime = 0; audio.play(); tick()}, 60000/self.bpm)
	}

	const self = {
		start : function start() {
			tick()
			self.active = true
		},
		stop : function stop() {
			self.active = false
			clearTimeout(timeout)
		},
		bpm : bpmField.value,
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