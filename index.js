//TODO:
// - Context
//
//

import { createMachine, interpret } from './lib.js'
import lightSwitchMachine from './lightSwitchMachine.js'
import greetingMachine from './greetingMachine.js'

const greeter = createMachine(greetingMachine)
const greetingService = interpret(greeter)
greetingService.start()

greetingService.send({type: 'GREET', payload: { name: 'world'}})

const light1 = createMachine(lightSwitchMachine)
const service = interpret(light1)

console.assert(service.state === 'off', 'Should be OFF')

service.start();
console.assert(service.state === 'off', 'Should be OFF')

service.send({ type: 'SWITCH' });
service.send({ type: 'SWITCH' });
service.send({ type: 'SWITCH' });
console.assert(service.state === 'on', 'Should be ON')

service.send({ type: 'SWITCH' });
console.assert(service.state === 'off', 'Should be OFF')

service.send({ type: 'SWITCH' });
console.assert(service.state === 'on', 'Should be ON')

service.stop();
console.assert(service.state === 'on', 'Should be ON')

console.log('DONE ✅')


