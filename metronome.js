let audio = new Audio('metronome.wav')
let toggleButton = document.getElementById("toggle")
let bpmHeader = document.getElementById("bpmHeader")
let bpmSlider = document.getElementById("bpmSlider")
bpmHeader.innerHTML = bpmSlider.value

function metronome() {

	let timeout;

	function tick() {
		let dt = Date.now() - self.expected
		if (self.active) {
			timeout = setTimeout(() => {tick(); audio.currentTime = 0; audio.play()}, 60000/self.bpm-dt)
		}
		self.expected += 60000/self.bpm
	}

	const self = {
		start : function start() {
			self.active = true
			self.expected = Date.now()
			audio.currentTime = 0
			audio.play()
			tick()
		},
		stop : function stop() {
			self.active = false
			if (timeout) {
				clearTimeout(timeout)
			}
		},
		bpm : bpmSlider.value,
		expected : null,
		active : false
	}
	return self
}

m = metronome()

bpmSlider.oninput = () => {
	m.bpm = bpmSlider.value
	bpmHeader.innerHTML = bpmSlider.value
}

toggleButton.onclick = () => {
	if (m.active) {
		m.stop()
	} else {
		m.start()
	}
}