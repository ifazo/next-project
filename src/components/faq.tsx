import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion";
  
  const FAQ = () => {
    const faqs = [
      {
        question: "What tech do you use for build the website?",
        answer: "We use Next.js, Shadcn ui, Tailwind CSS, Next auth, Stripe and TypeScript for building the website.",
      },
      {
        question: "What is  can a buyer do?",
        answer: "A buyer can browse products, add them to their cart, and purchase them using a credit card or other payment method.",
      },
      {
        question: "What can a seller do?",
        answer: "A seller can create a shop, add products to their shop, and manage orders from customers.",
      },
      {
        question: "What can an admin do?",
        answer: "An admin can manage users, shops, products, and orders. They can also view reports and analytics.",
      },
    ];
  
    return (
      <section className="py-6">
        <div className="container">
          <h1 className="mb-4 text-3xl font-bold">
            Frequently asked questions
          </h1>
          {faqs.map((faq, index) => (
            <Accordion key={index} type="single" collapsible>
              <AccordionItem value={`item-${index}`}>
                <AccordionTrigger className="hover:text-foreground/60 hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </div>
      </section>
    );
  };
  
  export default FAQ;
  