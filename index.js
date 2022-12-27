import { createMachine } from './createMachine.js'
import lightSwitchMachine from './lightSwitchMachine.js'

const light1 = createMachine(lightSwitchMachine)

let state = light1.value
console.assert(state === 'off', 'light1 is off')
state = light1.transition(state, 'switch')
console.assert(state === 'on', 'light1 is on')
state = light1.transition(state, 'switch')
console.assert(state === 'off', 'light1 is off')

console.log('✅')

