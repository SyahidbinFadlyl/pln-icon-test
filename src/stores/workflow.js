import { defineStore } from "pinia";
import {
  HTTP,
  SIMPLE,
  INLINE,
  getDefaultWorkflow,
} from "../utils/taskTemplates";

export const useWorkflowStore = defineStore("workflow", {
  state: () => ({
    workflow: getDefaultWorkflow(),
    counter: {
      SIMPLE: 0,
      HTTP: 0,
      INLINE: 0,
    },
  }),

  actions: {
    newWorkflow(name) {
      this.workflow = getDefaultWorkflow(name);
    },
    resetWorkflow() {
      this.workflow = getDefaultWorkflow();
    },
    setWorkflow(workflow) {
      this.workflow = workflow;
    },
    addStep(type, index) {
      let newStep;

      if (type === "HTTP") {
        this.counter.HTTP++;
        newStep = structuredClone(HTTP);
        newStep.taskReferenceName = `http_${this.counter.HTTP}`;
      } else if (type === "SIMPLE") {
        this.counter.SIMPLE++;
        newStep = structuredClone(SIMPLE);
        newStep.taskReferenceName = `simple_${this.counter.SIMPLE}`;
      } else if (type === "INLINE") {
        this.counter.INLINE++;
        newStep = structuredClone(INLINE);
        newStep.taskReferenceName = `inline_${this.counter.INLINE}`;
      }

      if (newStep) {
        this.workflow.tasks.splice(index, 0, newStep);
      }
    },

    deleteStep(index) {
      index = index - 1;
      const step = this.workflow.tasks[index];
      if (step.type !== "START" && step.type !== "END") {
        this.workflow.tasks.splice(index, 1);
      }
    },
  },
});
