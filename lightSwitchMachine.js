
const lightSwitchMachine = {
  initialState: 'off',
  off: {
    onEnter: () => {
       console.log('off: onEnter')
    },
    onExit: [
      () => { console.log('off: onExit 1 1 1 1 1 1 1') },
      () => { console.log('off: onExit 2 2 2 2 2 2 2') },
    ],
    on: {
      SWITCH: {
        target: 'on',
        actions: [() => {
           console.log('transition action for "SWITCH" in "off" state')
        }],
      },
    },
  },
  on: {
    onEnter: () => {
       console.log('on: onEnter')
    },
    onExit: () => {
       console.log('on: onExit')
    },
    on: {
      SWITCH: {
        target: 'off',
        actions: () => {
           console.log('transition action for "SWITCH" in "on" state')
        },
      },
    },
  },
}

export default lightSwitchMachine