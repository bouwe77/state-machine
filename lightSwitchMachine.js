
const lightSwitchMachine = {
  initialState: 'off',
  off: {
    actions: {
      onEnter() {
        // console.log('off: onEnter')
      },
      onExit() {
        // console.log('off: onExit')
      },
    },
    transitions: {
      SWITCH: {
        target: 'on',
        action() {
          // console.log('transition action for "SWITCH" in "off" state')
        },
      },
    },
  },
  on: {
    actions: {
      onEnter() {
        // console.log('on: onEnter')
      },
      onExit() {
        // console.log('on: onExit')
      },
    },
    transitions: {
      SWITCH: {
        target: 'off',
        action() {
          // console.log('transition action for "SWITCH" in "on" state')
        },
      },
    },
  },
}

export default lightSwitchMachine