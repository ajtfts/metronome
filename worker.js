let timeout, dt, expected, bpm = 60

function tick() {
	postMessage("play")
	dt = performance.now() - expected
	timeout = setTimeout(tick, 60000/bpm-dt)
	expected += 60000/bpm
}

onmessage = (e) => {
	console.log(e)
	if (e.data == "start") {
		expected = performance.now()
		tick()
	} else if (e.data == "stop") {
		clearTimeout(timeout)
	} else {
		bpm = e.data
	}
}