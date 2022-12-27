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
  let stopped = true;
  let finalState = null;

  const service = {
    start: () => {
      stopped = false;
    },
    stop: () => {
      stopped = true;
      finalState = machine.value;
    },
    send: ({ type: event }) => {
      if (!stopped) {
        machine.transition(machine.value, event);
      }
    },
    get state() {
      return stopped ? finalState : machine.value;
    }
  };

  return {
    ...service,
    get state() {
      return stopped ? machine.initialState : service.state;
    }
  };

}


