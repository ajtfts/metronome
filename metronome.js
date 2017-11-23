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

let beatList = [], bpmList = [], t

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
	bpmSlider.value = parseInt(bpmSlider.value) + 1
	m.bpm = bpmSlider.value
	worker.postMessage(m.bpm)
	bpmHeader.innerHTML = bpmSlider.value
}

minus1.onclick = () => {
	bpmSlider.value = parseInt(bpmSlider.value) - 1
	m.bpm = bpmSlider.value
	worker.postMessage(m.bpm)
	bpmHeader.innerHTML = bpmSlider.value
}

plus5.onclick = () => {
	bpmSlider.value = parseInt(bpmSlider.value) + 5
	m.bpm = bpmSlider.value
	worker.postMessage(m.bpm)
	bpmHeader.innerHTML = bpmSlider.value
}

minus5.onclick = () => {
	bpmSlider.value = parseInt(bpmSlider.value) - 5
	m.bpm = bpmSlider.value
	worker.postMessage(m.bpm)
	bpmHeader.innerHTML = bpmSlider.value
}

tap.onclick = () => {
	audio.currentTime = 0
	audio.play()
	clearTimeout(t)
	t = setTimeout(() => {beatList = []; bpmList = []}, 60000/40)
	beatList.push(performance.now())
	if (beatList.length > 1) {
		bpmList.push(beatList[beatList.length-1]-beatList[beatList.length-2])
	}
	let sum = 0
	for (let i = 0; i < bpmList.length; i++) {
		sum += bpmList[i]
	}
	let bpmAvg = sum/bpmList.length
	bpmSlider.value = 60000/bpmAvg
	m.bpm = bpmSlider.value
	worker.postMessage(m.bpm)
	bpmHeader.innerHTML = bpmSlider.value
}

toggleButton.onclick = () => {
	if (m.active) {
		m.stop()
	} else {
		m.start()
	}
}