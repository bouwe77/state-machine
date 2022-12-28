export function createMachine(stateMachineDefinition) {
  const machine = {
    // The initial state when the machine is created.
    initialState: stateMachineDefinition.initialState,

    // The current state of the machine at any given point in time.
    value: stateMachineDefinition.initialState,

    // Pure function for transitioning the machine's state, ny giving a
    // state to transition from, and an event to describe the transistion.
    // The function updates the state of the machine, and returns that state.
    transition(currentState, event) {
      const currentStateDefinition = stateMachineDefinition[currentState]
      const destinationTransition = currentStateDefinition.transitions[event]

      if (!destinationTransition) return

      const destinationState = destinationTransition.target
      const destinationStateDefinition = stateMachineDefinition[destinationState]

      destinationTransition.actions()
      currentStateDefinition.onExit()
      destinationStateDefinition.onEnter()

      machine.value = destinationState

      return machine.value
    },
  }

  return machine
}

// Interpreting a (created) machine means creating an instance of a machine,
// so we can keep track of the current state, and persist it in memory.
// After the interpreted machine is started, it also allows for sending events to
// it, so state transitions can be performed.
export function interpret(machine) {
  let started = false

  const service = {
    start: () => started = true,
    stop: () => started = false,
    send: ({ type: event }) => {
      if (started) machine.transition(machine.value, event);
    },
    get state() {
      return machine.value;
    }
  };

  return service
}
