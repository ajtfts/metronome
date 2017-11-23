let worker = new Worker("/worker.js")
let audio = new Audio('metronome.wav')
let toggleButton = document.getElementById("toggle")
let bpmHeader = document.getElementById("bpmHeader")
let pulse = document.getElementById("pulse")
let bpmSlider = document.getElementById("bpmSlider")
let plus1 = document.getElementById("plus1")
let minus1 = document.getElementById("minus1")
let plus5 = document.getElementById("plus5")
let minus5 = document.getElementById("minus5")
let tap = document.getElementById("tap")

bpmHeader.innerHTML = bpmSlider.value

function metronome() {

	const self = {
		start : function start() {
			self.active = true
			tap.disabled = true
			worker.postMessage(self.bpm)
			worker.postMessage("start")
		},
		stop : function stop() {
			self.active = false
			tap.disabled = false
			worker.postMessage("stop")
		},
		bpm : 60,
		active : false
	}
	return self
}

m = metronome()

worker.onmessage = (e) => {
	audio.currentTime = 0
	audio.play()
	pulse.setAttribute("opacity", 0.2)
	setTimeout(() => {pulse.setAttribute("opacity", 0)}, 100)
}

bpmSlider.oninput = () => {
	m.bpm = parseInt(bpmSlider.value)
	worker.postMessage(m.bpm)
	bpmHeader.innerHTML = bpmSlider.value
}

plus1.onclick = () => {
	m.bpm += 1
	worker.postMessage(m.bpm)
	bpmSlider.value = parseInt(bpmSlider.value) + 1
	bpmHeader.innerHTML = bpmSlider.value
}

minus1.onclick = () => {
	m.bpm -= 1
	worker.postMessage(m.bpm)
	bpmSlider.value = parseInt(bpmSlider.value) - 1
	bpmHeader.innerHTML = bpmSlider.value
}

plus5.onclick = () => {
	m.bpm += 5
	worker.postMessage(m.bpm)
	bpmSlider.value = parseInt(bpmSlider.value) + 5
	bpmHeader.innerHTML = bpmSlider.value
}

minus5.onclick = () => {
	m.bpm -= 5
	worker.postMessage(m.bpm)
	bpmSlider.value = parseInt(bpmSlider.value) - 5
	bpmHeader.innerHTML = bpmSlider.value
}

tap.onclick = () => {
	audio.currentTime = 0
	audio.play()
}

toggleButton.onclick = () => {
	if (m.active) {
		m.stop()
	} else {
		m.start()
	}
}