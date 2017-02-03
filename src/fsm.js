class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
      if (!config) throw console.Error();
      this.state = config.initial;
      this.config = config;
      this.history = [];
      this.history.pos = 0;
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
        this.history.push(this.state);
        this.history.pos++;
        this.state = state;
      }
      else throw console.Error();
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {

    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
      this.state = this.config.initial;
      this.clearHistory();
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {}

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
      if (this.history.pos === 0) return false;
      else {
        this.history.pos--;
        this.state = this.history[this.history.pos];
        return true;
      }
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
      if (this.history.pos === 0) return false;
      else if (this.history.pos === (this.history.length - 1)) return false;
      else {
        this.histoty.pos++;
        this.state = this.history[this.history.pos];
        return true;
      }

    }

    /**
     * Clears transition history
     */
    clearHistory() {
      this.history.length = 0;
      this.history.pos = 0;
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
