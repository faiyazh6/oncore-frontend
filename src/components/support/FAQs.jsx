// FAQs.jsx
import React, { useEffect, useState } from 'react';
import { Disclosure } from '@headlessui/react';
import { MinusIcon, PlusIcon } from '@heroicons/react/outline';

export const faqs = [
  {
    question: "How can I reset my password?",
    answer: "To reset your password, go to the login page and click on 'Forgot Password'. Follow the instructions sent to your email to reset your password.",
  },
  {
    question: "How do I schedule an appointment?",
    answer: "To schedule an appointment, navigate to the 'Daily Calendar' section and select an available slot. Fill in the necessary details and confirm the appointment.",
  },
  {
    question: "What is the patient to nurse ratio?",
    answer: "The patient to nurse ratio can be found in the 'Executive Reports' section under the 'Patient Care' tab. This ratio is updated daily to reflect current staffing levels.",
  },
  {
    question: "How do I add a new nurse to the system?",
    answer: "To add a new nurse, go to the 'Nursing Staff' section and click on 'Add New'. Fill in the nurse's details and click 'Submit'. The new nurse will be added to the system.",
  },
  {
    question: "How can I view executive reports?",
    answer: "Executive reports are available in the 'Executive Reports' section. You can filter the reports by date, department, and other criteria to get the information you need.",
  },
  {
    question: "How do I upload a schedule?",
    answer: "To upload a schedule, go to the 'Schedule Templates' section and click on 'Upload Schedule'. Follow the prompts to upload your schedule file.",
  },
  // More questions...
];

const FAQs = ({ selectedFaq }) => {
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    if (selectedFaq) {
      setOpenFaq(selectedFaq);
    }
  }, [selectedFaq]);

  return (
    <div id="faqs" className="bg-white py-16 sm:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-4xl mx-auto divide-y divide-gray-200">
          <h2 className="text-3xl font-bold leading-10 tracking-tight text-gray-900">Frequently Asked Questions</h2>
          <dl className="mt-10 space-y-6 divide-y divide-gray-200">
            {faqs.map((faq) => (
              <Disclosure as="div" key={faq.question} className="pt-6" open={openFaq === faq.question}>
                {({ open }) => (
                  <>
                    <dt>
                      <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900">
                        <span className="text-base font-semibold leading-7">{faq.question}</span>
                        <span className="ml-6 flex h-7 items-center">
                          {open ? (
                            <MinusIcon className="h-6 w-6" aria-hidden="true" />
                          ) : (
                            <PlusIcon className="h-6 w-6" aria-hidden="true" />
                          )}
                        </span>
                      </Disclosure.Button>
                    </dt>
                    <Disclosure.Panel as="dd" className="mt-2 pr-12">
                      <p className="text-base leading-7 text-gray-600">{faq.answer}</p>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default FAQs;