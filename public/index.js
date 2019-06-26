let history = []
let historyCounter = 0

window.onkeydown = (event) =>{
	if(event.keyCode===38){
		document.getElementById('u_input').value = history[historyCounter]
		if(historyCounter -1 >=0){
			historyCounter -= 1
		}
	}
	if(event.keyCode === 40){
		
		if(historyCounter+1 < history.length){
			historyCounter += 1
		}
		document.getElementById('u_input').value = history[historyCounter]
	}
}

function mockservercall(){
    return 'sample.txt'
}

function addTextToOut(string){
    let newOut = document.createElement('p')
    newOut.innerHTML = string
    document.getElementById('output').appendChild(newOut)
    updateScroll()
    return false
}

function updateScroll(){
    let element = document.getElementById("output");
    element.scrollTop = element.scrollHeight;
}

function evaluateReplCmd(){
    let cmd = document.getElementById('u_input').value
    history.push(cmd)
    historyCounter = history.length-1
    if(cmd === 'clear'){
        document.getElementById('output').innerHTML = ''
        document.getElementById('u_input').value = ''
        return false
    }
    document.getElementById('u_input').value = ''
    addTextToOut(`<span class="G">></span> ${cmd}`)
    fetch('/repl', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({cmd:cmd})
    })
    .then(res =>{
        res.json()
            .then(data =>{
                for(let s of data.output.split('\n')){
                    addTextToOut(s)
                }
            })
    })
    .catch(err=>{
        console.log(err)
        return false
    })
}
addTextToOut('Welcome to my portfolio!')
addTextToOut('This command line allows you to learn more about me!')
addTextToOut('Type the \'<span class="G">help</span>\' command and press \'<span class="B">enter</span>\' for a list of available commands.')
