let audio = new Audio('metronome.wav')
let toggleButton = document.getElementById("toggle")
let bpmHeader = document.getElementById("bpmHeader")
let bpmSlider = document.getElementById("bpmSlider")
let ball = document.getElementById("ball")
let plus1 = document.getElementById("plus1")
let minus1 = document.getElementById("minus1")
let plus5 = document.getElementById("plus5")
let minus5 = document.getElementById("minus5")
bpmHeader.innerHTML = bpmSlider.value
ball.disabled = true

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
			ball.value = 0
			self.expected = Date.now()
			audio.currentTime = 0
			audio.play()
			tick()
		},
		stop : function stop() {
			self.active = false
			ball.value = 50
			if (timeout) {
				clearTimeout(timeout)
			}
		},
		bpm : parseInt(bpmSlider.value),
		expected : null,
		active : false
	}
	return self
}

m = metronome()

bpmSlider.oninput = () => {
	m.bpm = parseInt(bpmSlider.value)
	bpmHeader.innerHTML = bpmSlider.value
}

plus1.onclick = () => {
	m.bpm += 1
	bpmSlider.value = parseInt(bpmSlider.value) + 1
	bpmHeader.innerHTML = bpmSlider.value
}

minus1.onclick = () => {
	m.bpm -= 1
	bpmSlider.value = parseInt(bpmSlider.value) - 1
	bpmHeader.innerHTML = bpmSlider.value
}

plus5.onclick = () => {
	m.bpm += 5
	bpmSlider.value = parseInt(bpmSlider.value) + 5
	bpmHeader.innerHTML = bpmSlider.value
}

minus5.onclick = () => {
	m.bpm -= 5
	bpmSlider.value = parseInt(bpmSlider.value) - 5
	bpmHeader.innerHTML = bpmSlider.value
}

toggleButton.onclick = () => {
	if (m.active) {
		m.stop()
	} else {
		m.start()
	}
}