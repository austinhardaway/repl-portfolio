let testMessage = "Available commands:\n#Bhelp# - See this message again\n#Babout# - Get basic information about me\n#Bcontact# - Get my contact information"
const colorRe = /#([A-Z])([^#]+)#/g

function parseColors(string){
    let newString = string
    
    newString = string.replace(colorRe, '<span class="$1">$2</span>')
    


    console.log(newString)
}

parseColors(testMessage)