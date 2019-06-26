const data = require('./data')
const colorRe = /#([A-Z])([^#]+)#/g
const anchorRe = /#A([^#]+)#/g
const emailRe = /#E([^#]+)#/g


function parseTokens(string){
    let result = string.replace(emailRe, '<a href="mailto:$1">$1</a>')
    result = result.replace(anchorRe, '<a href="$1">$1</a>')
    result = result.replace(colorRe, '<span class="$1">$2</span>')
    return result
}



module.exports = {
    parse: function(cmd) {
        switch (cmd.split(' ')[0]) {
            case 'help':
                return parseTokens(data.help)
                break
            case 'contact':
                return parseTokens(data.contact)
                break
            case 'about':
                return parseTokens(data.about)
                break
            case 'education':
            	return parseTokens(data.education)
            	break;
        	case 'experience':
        		let res = ''
        		if (cmd.split(' ')[1]==='-v'){
        			return parseTokens(`#BAT&T#\n${data.experience.att}\n#GMacys#\n${data.experience.macys}\n#GWoodmen#\n${data.experience.woodmen}`)
        		}
        		else if(cmd.split(' ')[1] && cmd.split(' ')[1]!=='-l'){
        			switch (cmd.split(' ')[1]){
        				case 'macys':
        					return parseTokens(data.experience.macys)
        					break;
    					case 'woodmen':
    						return parseTokens(data.experience.woodmen)
    						break;
						case 'uga':
							return parseTokens(data.experience.uga)
							break;
						default:
							return parseTokens('#RExperience option not found#\nPlease use the experience command to see a list of valid options')
							break;
        			}
        			
        		} else {
        			res = parseTokens(data.experience_list)
        		}
        		return res
        		break;
    		case 'projects':
    			return parseTokens(data.project_list)
    			break;
            default:
                return parseTokens('#RInvalid command.#\nUse "#Yhelp#" for a list of valid commands')
                break
        }
    }
}



