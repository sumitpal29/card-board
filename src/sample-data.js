export default {
  id: "customBoard",
  type: "board",
  innerChildren: [
    {
      identifier: "column025043",
      type: "column",
      header: "Todo",
      innerChildren: [
        {
          id: "card_498174",
          type: "card",
          header: "Route based examples",
          description: "",
          properties: { priority: "green" },
        },
      ],
      id: "customBoard_column025043",
      parentId: "customBoard",
    },
    {
      identifier: "column120669",
      type: "column",
      header: "In Progress",
      innerChildren: [],
      id: "customBoard_column120669",
      parentId: "customBoard",
    },
    {
      identifier: "column238924",
      type: "column",
      header: "In review",
      innerChildren: [
        {
          id: "card_002778",
          type: "card",
          header: "Make sample board",
          description: "",
          properties: {},
        },
      ],
      id: "customBoard_column238924",
      parentId: "customBoard",
    },
    {
      identifier: "column229886",
      type: "column",
      header: "Done",
      innerChildren: [
        {
          id: "card_055605",
          type: "card",
          header: "Add delete feature",
          description: "Add column and card delete feature",
          properties: { priority: "yellow" },
        },
      ],
      id: "customBoard_column229886",
      parentId: "customBoard",
    },
    {
      identifier: "column626627",
      type: "column",
      header: "Released",
      innerChildren: [
        {
          id: "card_890730",
          type: "card",
          header: "Initial version of the app",
          description:
            "Drag and drop feature,\nLocal-storage feature,\nHandling corner cases",
          properties: { priority: "red" },
        },
      ],
      id: "customBoard_column626627",
      parentId: "customBoard",
    },
  ],
  isCachingEnabled: true,
};
