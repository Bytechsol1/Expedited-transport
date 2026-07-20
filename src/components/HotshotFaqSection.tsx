"use client";

import React, { useState } from "react";
import { Plus, Minus, MessageSquare } from "lucide-react";

const WHITE_BG = "#ffffff";
const DARK_GREEN = "#051e24";
const LIME = "#b6f000";

const faqs = [
  {
    question: "What kinds of things can you transport?",
    answer: "Here at Expedited Transport Services, we pride ourselves on our ability to accommodate a wide range of different shipments. From food products to building supplies and clothing, there is almost nothing that we can’t transport for you. If you would like to confirm if we can handle your freight, don’t hesitate to contact us for more information."
  },
  {
    question: "How do I get an estimate for a shipment?",
    answer: "We make it extremely easy and straightforward to get an upfront estimate on the expected costs of your shipment. All you need to do is reach out to us through our website or over the phone, and one of our knowledgeable staff members will be happy to listen to the details of your shipment and provide you with the information you need."
  },
  {
    question: "What’s the difference between less than truckload and full truckload? Which one do I need?",
    answer: "Less than truckload (LTL) refers to shipments that will not fill an entire trailer, usually combined with other cargo that is headed in a similar direction to help save money. On the other hand, full truckload is when your shipment alone will be the only thing being transported because it fills an entire truck. No matter what service you need, you can always count on getting it at a budget-friendly price with us."
  },
  {
    question: "How should I package my items?",
    answer: "This will depend on the type of items you are transporting. Typically, you should have your items in boxes or palletized to ensure they are kept secure during transit and to speed up the process. If you have any questions about how you should prepare your items, feel free to get in touch with us for some professional tips."
  },
  {
    question: "Is my freight likely to get damaged?",
    answer: "Absolutely not. Here at Expedited Transport Services, we do everything in our power to keep all of our cargo safe and secure while in our care. We plan carefully and utilize reliable safety measures to eliminate risks and ensure that our clients never have anything to worry about."
  },
  {
    question: "Will you need specialized equipment to deliver my goods?",
    answer: "This all depends on what you are transporting and the size of your freight. That being said, we possess a wide range of different trucking equipment to help us provide the most complete transportation service possible."
  },
  {
    question: "How do I know what the transit time is?",
    answer: "Once you have supplied us with the details of your freight and its destination, we will gladly provide you with a time frame estimate. If you need your cargo to reach its destination by a particular deadline, our hotshot and expedited shipping options might be what you are looking for."
  }
];

export function HotshotFaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section style={{ padding: "120px 0", backgroundColor: WHITE_BG, color: DARK_GREEN, position: "relative", overflow: "hidden", fontFamily: "'Inter', sans-serif" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 10 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "64px" }}>
          
          {/* Left Column: Title & Contact Card */}
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>
            <div style={{ position: "sticky", top: "120px" }}>

              <h2 style={{ fontSize: "clamp(36px, 4vw, 60px)", fontWeight: 800, lineHeight: 1.1, marginBottom: "32px", color: DARK_GREEN }}>
                Frequently <br />
                Asked <br />
                <span style={{ background: "linear-gradient(135deg, #b6f000 0%, #8cae00 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Questions</span>
              </h2>
              
            </div>
          </div>

          {/* Right Column: FAQs Accordion */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              
              return (
                <div 
                  key={index} 
                  id={`faq-${index}`}
                  style={{
                    borderRadius: "24px", transition: "background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease", overflow: "hidden",
                    backgroundColor: isOpen ? "#ffffff" : "#fcfcfc",
                    border: `1px solid rgba(0, 0, 0, ${isOpen ? "0.08" : "0.04"})`,
                    boxShadow: isOpen ? "0 10px 40px -10px rgba(0,0,0,0.1)" : "0 4px 10px rgba(0,0,0,0.02)"
                  }}
                >
                  <div
                    style={{
                      width: "100%", display: "flex", alignItems: "flex-start", justifyContent: "space-between", 
                      padding: "28px 36px", textAlign: "left", position: "relative"
                    }}
                  >
                    <div 
                      style={{ flex: 1, cursor: "pointer", display: "flex", alignItems: "center" }}
                      onClick={() => toggleFaq(index)}
                    >
                      <span style={{ 
                        fontSize: "clamp(18px, 2vw, 20px)", fontWeight: "600", paddingRight: "32px", 
                        transition: "color 0.3s ease", color: isOpen ? DARK_GREEN : "#2d3748"
                      }}>
                        {faq.question}
                      </span>
                    </div>
                    
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", flexShrink: 0 }}>
                      {/* Expand/Collapse Icon */}
                      <button 
                        onClick={() => toggleFaq(index)}
                        style={{ 
                          marginTop: "2px", width: "40px", height: "40px", borderRadius: "50%", 
                          display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.3s ease",
                          backgroundColor: isOpen ? LIME : "#f1f5f9",
                          color: isOpen ? "#000" : DARK_GREEN,
                          transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                          border: "none", cursor: "pointer", outline: "none"
                        }}
                      >
                        {isOpen ? <Minus size={20} /> : <Plus size={20} />}
                      </button>
                    </div>
                  </div>
                  
                  <div 
                    style={{
                      display: "grid",
                      gridTemplateRows: isOpen ? "1fr" : "0fr",
                      transition: "grid-template-rows 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease",
                      opacity: isOpen ? 1 : 0
                    }}
                  >
                    <div style={{ overflow: "hidden" }}>
                      <div style={{ padding: "0 36px 36px 36px" }}>
                        <div style={{ height: "1px", width: "100%", background: `linear-gradient(to right, rgba(0, 0, 0, 0.1), transparent)`, marginBottom: "24px" }} />
                        <p style={{ color: "#4a5568", lineHeight: 1.7, fontSize: "16px", fontWeight: 400, margin: 0 }}>
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
