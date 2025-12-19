import React from "react";
import ModelCard from "./ModelCard";
import { FaMeta } from "react-icons/fa6";
import { AiFillOpenAI } from "react-icons/ai";
import { IoMdChatbubbles } from "react-icons/io";
import { RiImageAiFill } from "react-icons/ri";

const ModelCards = () => {
  const models = [
    {
      icon: FaMeta,
      title: "Llama-3.1-405B",
      parameters: "405B",
      type: "Language",
    },
    {
      icon: AiFillOpenAI,
      title: "gpt-oss-20B",
      parameters: "20B",
      type: "Language",
    },
    {
      icon: IoMdChatbubbles,
      title: "gpt-j-6b",
      parameters: "8B",
      type: "Language",
    },
    {
      icon: RiImageAiFill,
      title: "FLUX.1-Schnell",
      parameters: "12B",
      type: "Image Generation",
    },
  ];
  
  return (
    <section id="remote-model-access" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="relative rounded-3xl overflow-hidden bg-white/50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/50 backdrop-blur-sm shadow-xl dark:shadow-none">
          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-accent-500/10 dark:bg-accent-600/20 rounded-full blur-[80px]"></div>

          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-10 md:p-16 flex flex-col justify-center">
              <h3 className="font-display text-3xl font-bold mb-6 text-slate-900 dark:text-white">
                Remote Model Access
              </h3>
              <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                Access and modify open-source model internals remotely. 
                Deploy models on-demand, including checkpoints.
              </p>
              {/* TO DO: Add some call-to-action buttons here. Free access/Docs? */}
            </div>

            <div className="bg-slate-50/50 dark:bg-slate-900/50 p-10 md:p-16 flex items-center justify-center border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-slate-700/50">
              <div className="mt-10">
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-1 lg:grid-cols-2">
                  {models.map((feature, index) => (
                    <ModelCard key={index} {...feature} />
                  ))}
                </div>
              </div>
            </div>

            {/* Card 1: Llama-3.1-405B */}
            {/* <div className="card-glass p-8 rounded-2xl">
              <div className="w-14 h-14 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-6 text-brand-600 dark:text-brand-400 border border-slate-200 dark:border-slate-700">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Meta_Platforms_Inc._logo_%28cropped%29.svg/960px-Meta_Platforms_Inc._logo_%28cropped%29.svg.png?20230731184236"
                  alt="Meta Llama"
                  className="w-10 h-7"
                />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">Llama-3.1-405B-Instruct</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Chat Model | 405 Billion Parameters | TO DO: Add more model information here
              </p>
            </div> */}

            {/* Card 2: DeepSeek */}
            {/* <div className="card-glass p-8 rounded-2xl">
              <div className="w-14 h-14 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-6 text-accent-600 dark:text-accent-400 border border-slate-200 dark:border-slate-700">
                <img
                  src="https://cdn.jsdelivr.net/npm/heroicons@latest/24/outline/magnifying-glass.svg"
                  alt="Magnifying Glass"
                  className="w-7 h-7"
                />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">Support AI Research</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Foster a collaborative research environment supporting interdisciplinary and public-interest work.
                NDIF partners with universities and research teams to advance responsible, transparent, and
                reproducible AI research together.
              </p>
            </div> */}

            {/* Card 3: Illuminate Deep Neural Networks */}
            {/* <div className="card-glass p-8 rounded-2xl">
              <div className="w-14 h-14 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-6 text-teal-600 dark:text-teal-400 border border-slate-200 dark:border-slate-700">
                <img
                  src="https://cdn.jsdelivr.net/npm/heroicons@latest/24/outline/light-bulb.svg"
                  alt="Light Bulb"
                  className="w-7 h-7"
                />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">Illuminate Deep Neural Networks</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                In the era of large-scale deep learning, the most interesting AI models are massive black boxes.
                We illuminate how these systems process inputs and make demystifying the "black box" of AI inference possible,
                enabling clearer, safer, and more explainable systems.
              </p>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModelCards;
