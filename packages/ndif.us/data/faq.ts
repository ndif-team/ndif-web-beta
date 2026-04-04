export interface FAQItem {
  question: string;
  answer: string;
}

export const faq: FAQItem[] = [
  {
    question: "When can I use NDIF?",
    answer:
      "NDIF is available for you to use today. Get started here: https://ndif-team.github.io/ndif-web-beta/get-started",
  },
  {
    question: "How does NDIF compare to commercial AI inference services?",
    answer:
      "Commercial AI inference services such as ChatGPT, Claude, and Gemini only provide black-box access to large AI models—you can send inputs and receive outputs, but you cannot observe or alter any internal computations. In contrast, NDIF provides full transparency for AI inference, allowing users to fully examine and modify every step of the internal computation of large AI models using the NNsight library.",
  },
  {
    question: "How can I cite NDIF resources in my research?",
    answer:
      'Please cite: Jaden Fried Fiotto-Kaufman et al., "NNsight and NDIF: Democratizing Access to Foundation Model Internals," ICLR 2025. When you publish work using NNsight or NDIF resources, please also email us at info@ndif.us to tell us about your work.',
  },
  {
    question: "How does NDIF compare to traditional HPC computing resources?",
    answer:
      "Traditional HPC systems support coarse-grained computing jobs and do not natively support fine-grained sharing of pretrained AI models. NDIF provides a shared deep inference fabric, allowing many users to access shared AI models in a fine-grained manner—submitting specialized deep inference tasks that may run for as briefly as a fraction of a second, sharing preloaded models simultaneously.",
  },
  {
    question: "How does NDIF compare to writing experiments in PyTorch?",
    answer:
      "NDIF's API, NNsight, is built on PyTorch, so it will be familiar to any PyTorch user. However, NNsight defines Python contexts where models can be run with interventions that are defined locally but executed either locally or remotely. This enables a workflow where you develop methods at small scale locally and then deploy the same code at large scale on NDIF.",
  },
  {
    question: "Who can use NDIF?",
    answer:
      "NNsight, the open-source software underlying NDIF, is available worldwide and can be used with your own hardware. The NSF-funded computing resources will be available to educational and research users with a U.S. affiliation or collaborator after account creation via CILogin.",
  },
  {
    question: "Do I need to know how to code?",
    answer:
      "If you’d prefer to access NDIF resources without coding, check out Workbench, our web app! You can run experiments on NDIF models remotely, all from a browser. Try it today: https://workbench.ndif.us/",
  },
  {
    question: "Are you hiring?",
    answer:
      "For information on open positions, including full-time, part-time, co-op, and volunteer roles, see the Jobs section of our Community page.",
  },
];
