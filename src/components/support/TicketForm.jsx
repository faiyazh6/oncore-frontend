import React, { useState } from 'react';

const TicketForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    subject: '',
    description: '',
    priority: 'low', // Default to 'low'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const data = {
    "data": [
      {
        "id": "2f173cfa-28ed-4051-99fc-6225c9734628",
        "name": "Sruthi Kurada",
        "email": "skurada@wharton.upenn.edu"
      },
      {
        "id": "55a447f8-cd60-4667-b146-c68c342de7b7",
        "name": "Abhinav Kurada",
        "email": "kurada@wharton.upenn.edu"
      },
      {
        "id": "a0e9c48d-76c9-4082-8a03-8763e9112fb9",
        "name": "Shubham Kamdar",
        "email": "kamdar@seas.upenn.edu"
      }
    ],
    "request_id": "31cc04d3-88a3-4cb3-8b92-149d2b9a4894"
  };
  
  function getAssigneeId(email) {
    const user = data.data.find(user => user.email === email);
    return user ? user.id : null;
  }
  
  // Example usage
  const assigneeEmail = "kamdar@seas.upenn.edu";
  const assigneeId = getAssigneeId(assigneeEmail);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      account_id: 'e0f94066-c6ca-4d1f-853d-5e1805f7a6d1', // Provided account ID
      requester_email: formData.email,
      requester_name: formData.name,
      requester_avatar_url: '', // Optional: URL to the requester's avatar
      title: formData.subject,
      body_html: `<p>${formData.description}</p>`,
      assignee_id: assigneeId, // Provided assignee ID
      priority: formData.priority, // Include priority in the request
    };

    console.log('Submitting the following data:', data); // Log the data being sent

    try {
      const response = await fetch('http://localhost:3001/api/issues', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log('Response from proxy server:', result); // Log the response from the proxy server

      if (response.ok) {
        console.log('Issue created successfully:', result);
        alert('Issue created successfully'); // Alert the user of successful submission
      } else {
        console.error('Error creating issue:', result);
        alert('Error creating issue'); // Alert the user of an error
      }
    } catch (error) {
      console.error('Error submitting the form', error);
      alert('Error submitting the form'); // Alert the user of a submission error
    }
  };

  return (
    <div className="bg-white shadow-md rounded-md p-6">
      <h2 className="text-2xl font-bold leading-7 text-gray-900 mb-6">Submit a Request</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
              Your Name
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="name"
                id="name"
                autoComplete="given-name"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="company" className="block text-sm font-medium leading-6 text-gray-900">
              Company
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="company"
                id="company"
                autoComplete="organization"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="sm:col-span-6">
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Email Address <span className="text-red-500">*</span>
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="sm:col-span-6">
            <label htmlFor="subject" className="block text-sm font-medium leading-6 text-gray-900">
              Subject
            </label>
            <div className="mt-2">
              <select
                id="subject"
                name="subject"
                autoComplete="subject"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={handleChange}
              >
                <option>Select</option>
                <option>Issue</option>
                <option>Feedback</option>
                <option>Other</option>
              </select>
            </div>
          </div>

          <div className="sm:col-span-6">
            <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
              Description
            </label>
            <div className="mt-2">
              <textarea
                id="description"
                name="description"
                rows="4"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Write down here"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="sm:col-span-6">
            <label htmlFor="priority" className="block text-sm font-medium leading-6 text-gray-900">
              Urgency of Issue
            </label>
            <div className="mt-2">
              <select
                id="priority"
                name="priority"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={handleChange}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
          </div>

          <div className="sm:col-span-6">
            <button className="mt-6 w-full bg-[#222E93] text-white py-2 rounded-md">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TicketForm;