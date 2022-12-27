export function createMachine(stateMachineDefinition) {
  const machine = {
    initialState: stateMachineDefinition.initialState,
    value: stateMachineDefinition.initialState,
    transition(currentState, event) {
      const currentStateDefinition = stateMachineDefinition[currentState]
      const destinationTransition = currentStateDefinition.transitions[event]
      if (!destinationTransition) {
        return
      }
      const destinationState = destinationTransition.target
      const destinationStateDefinition =
        stateMachineDefinition[destinationState]

      machine.value = destinationState
      destinationTransition.action()
      currentStateDefinition.actions.onExit()
      destinationStateDefinition.actions.onEnter()

      return machine.value
    },
  }

  return machine
}

export function interpret(machine) {
  let started = false

  const service = {
    start: () => {
      started = true
    },
    stop: () => {
      started = false
    },
    send: ({ type: event }) => {
      if (started) {
        machine.transition(machine.value, event);
      }
    },
    get state() {
      return machine.value;
    }
  };

  return service
}


