const copy = {
  tooltipCopy: (designation?: string, state?: string) =>
    `Total number of ${state || ""} ${designation || "NPS unit"}s visited.`,
  designationLabel: "Select a designation",
  stateLabel: "State",
  allDesignationTitle: "National Park Unit",
};

export default copy;
