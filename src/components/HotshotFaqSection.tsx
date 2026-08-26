"use client";

import React, { useState } from "react";

const FAQS: { question: string; answer: string }[] = [
  {
    question: "What kinds of things can you transport?",
    answer: "Here at Expedited Transport Services, we pride ourselves on our ability to accommodate a wide range of different shipments. From food products to building supplies and clothing, there is almost nothing that we can’t transport for you. If you would like to confirm if we can handle your freight, don’t hesitate to contact us for more information.",
  },
  {
    question: "How do I get an estimate for a shipment?",
    answer: "We make it extremely easy and straightforward to get an upfront estimate on the expected costs of your shipment. All you need to do is reach out to us through our website or over the phone, and one of our knowledgeable staff members will be happy to listen to the details of your shipment and provide you with the information you need.",
  },
  {
    question: "What’s the difference between less than truckload and full truckload? Which one do I need?",
    answer: "Less than truckload (LTL) refers to shipments that will not fill an entire trailer, usually combined with other cargo that is headed in a similar direction to help save money. On the other hand, full truckload is when your shipment alone will be the only thing being transported because it fills an entire truck. No matter what service you need, you can always count on getting it at a budget-friendly price with us.",
  },
  {
    question: "How should I package my items?",
    answer: "This will depend on the type of items you are transporting. Typically, you should have your items in boxes or palletized to ensure they are kept secure during transit and to speed up the process. If you have any questions about how you should prepare your items, feel free to get in touch with us for some professional tips.",
  },
  {
    question: "Is my freight likely to get damaged?",
    answer: "Absolutely not. Here at Expedited Transport Services, we do everything in our power to keep all of our cargo safe and secure while in our care. We plan carefully and utilize reliable safety measures to eliminate risks and ensure that our clients never have anything to worry about.",
  },
  {
    question: "Will you need specialized equipment to deliver my goods?",
    answer: "This all depends on what you are transporting and the size of your freight. That being said, we possess a wide range of different trucking equipment to help us provide the most complete transportation service possible.",
  },
  {
    question: "How do I know what the transit time is?",
    answer: "Once you have supplied us with the details of your freight and its destination, we will gladly provide you with a time frame estimate. If you need your cargo to reach its destination by a particular deadline, our hotshot and expedited shipping options might be what you are looking for.",
  },
];

function PlusIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      style={{
        color: open ? "var(--c-dark-green)" : "#c2c2c2",
        transform: open ? "rotate(45deg)" : "rotate(0deg)",
        transition: "transform 0.3s cubic-bezier(0.39, 0.575, 0.565, 1), color 0.3s ease",
        flexShrink: 0,
      }}
    >
      <rect x="10.91" y="0" width="2.182" height="24" fill="currentColor" />
      <rect x="24" y="10.91" width="2.182" height="24" transform="rotate(90 24 10.91)" fill="currentColor" />
    </svg>
  );
}

export function HotshotFaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section style={{ padding: "90px 0", backgroundColor: "#ffffff" }}>
      <div
        className="faq-wrapper"
        style={{
          display: "grid",
          gridTemplateColumns: "0.8fr 1fr",
          gap: "7.75rem",
          maxWidth: "1800px",
          margin: "0 auto",
          padding: "0 70px",
          alignItems: "start",
        }}
      >
        {/* Left: heading + subtitle, sticky while the FAQ list scrolls */}
        <div className="faq-sticky" style={{ position: "sticky", top: "120px" }}>
          <h2
            style={{
              margin: 0,
              lineHeight: 1.2,
              fontFamily: "var(--font-primary)",
              fontSize: "clamp(2.25rem, 3.2vw, 2.85rem)",
              fontWeight: 400,
              color: "var(--c-dark-green)",
            }}
          >
            FAQs
          </h2>
          <p
            style={{
              marginTop: "1.5rem",
              fontFamily: "var(--font-primary)",
              fontSize: "1.42rem",
              fontWeight: 400,
              lineHeight: 1.26,
              color: "var(--c-dark-green)",
              maxWidth: "34ch",
            }}
          >
            Here are the most common questions our customers have before booking a shipment.
          </p>
        </div>

        {/* Right: accordion */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          {FAQS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={item.question} style={{ position: "relative" }}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "2rem",
                    padding: "32px 0",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-primary)",
                      fontSize: "clamp(1.15rem, 1.6vw, 1.856rem)",
                      fontWeight: 400,
                      lineHeight: 1.46,
                      color: "var(--c-dark-green)",
                    }}
                  >
                    {item.question}
                  </span>
                  <PlusIcon open={isOpen} />
                </button>

                <div
                  style={{
                    display: "grid",
                    gridTemplateRows: isOpen ? "1fr" : "0fr",
                    transition: "grid-template-rows 0.35s cubic-bezier(0.39, 0.575, 0.565, 1)",
                  }}
                >
                  <div style={{ overflow: "hidden" }}>
                    <p
                      style={{
                        margin: "0 0 32px",
                        fontFamily: "var(--font-primary)",
                        fontSize: "18px",
                        fontWeight: 400,
                        lineHeight: "25.2px",
                        color: "var(--c-dark-green)",
                        maxWidth: "70ch",
                      }}
                    >
                      {item.answer}
                    </p>
                  </div>
                </div>

                {/* Red glow divider */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "1px",
                    background: "linear-gradient(90deg, rgba(227,30,36,0), rgba(227,30,36,0.75), rgba(227,30,36,0))",
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .faq-wrapper {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
            padding: 0 1.5rem !important;
          }
          .faq-sticky {
            position: static !important;
          }
        }
      `}</style>
    </section>
  );
}
