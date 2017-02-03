class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
      if (!config) throw console.Error();
      this.config = config;
      this.state = config.initial;
      this.history = [this.state];
      this.history.pos = 1;
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
      return this.state;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
      if (state in this.config.states) {
        this.state = state;
        this.history.push(this.state);
        this.history.pos = this.history.length;
      }
      else throw console.Error();
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
      if (event in this.config.states[this.state].transitions) {
        this.changeState(this.config.states[this.state].transitions[event]);
      }
      else throw console.Error();
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
      this.state = this.config.initial;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
      var array = [];
      if (!event) {
        return array;
      }
      else if (event in this.config) {
        return array;
      }
      else if (!(event in this.config)) return array;
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
      if (this.history.pos === 1) return false;
      else {
        this.history.pos--;
        this.state = this.history[this.history.pos - 1];
        return true;
      }
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
      if (this.history.pos === this.history.length) return false;
      else {
        this.history.pos++;
        this.state = this.history[this.history.pos - 1];
        return true;
      }
    }

    /**
     * Clears transition history
     */
    clearHistory() {
      this.history.length = 1;
      this.history.pos = 1;
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
