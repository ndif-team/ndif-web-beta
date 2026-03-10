export interface FAQItem {
  question: string;
  answer: string;
}

export const faq: FAQItem[] = [
  {
    question: "When can I use NDIF?",
    answer:
      "You can start using NDIF today! NDIF is a four-year project running from 2024–2028, with many capabilities still to be developed, but an early version of NDIF is available for you to use today. Your participation is an essential part of the project—by getting involved early, you get a jump start on using leading-edge AI research methods, and you can help the NDIF team learn how to design the Fabric to be helpful for your research.",
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
    question: "Who will be able to use NDIF?",
    answer:
      "NNsight, the open-source software underlying NDIF, is available worldwide and can be used with your own hardware. The NSF-funded computing resources will be available to educational and research users with a U.S. affiliation after account creation via CILogin. There will eventually be a way to allocate high-capacity blocks for very large-scale projects.",
  },
  {
    question: "Are you hiring?",
    answer:
      "For information on open positions, including full-time, part-time, co-op, and volunteer roles, see the Jobs section of our Community page.",
  },
];
