
const greetingMachine = {
  initialState: 'idle',
  idle: {
    on: {
      GREET: {
        actions: [({name}) => {
           console.log('👋 HELLO, ' + name)
        }],
      },
    },
  },
}

export default greetingMachine