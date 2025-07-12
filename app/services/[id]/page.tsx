import { notFound } from 'next/navigation';

const services = {
  web: {
    title: 'Web Development',
    description: 'Building responsive and modern websites using React, Next.js, and Tailwind CSS.',
  },
  design: {
    title: 'UI/UX Design',
    description: 'Designing user-friendly interfaces and experiences for web and mobile applications.',
  },
  seo: {
    title: 'SEO Optimization',
    description: 'Improving website visibility and ranking on search engines with proven SEO strategies.',
  },
  consulting: {
    title: 'IT Consulting',
    description: 'Providing expert advice and solutions for your business technology needs.',
  },
};

type Params = {
  params: {
    id: string;
  };
};

export default function ServicePage({ params }: Params) {
  const service = services[params.id as keyof typeof services];

  if (!service) {
    notFound();
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-xl w-full">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">{service.title}</h1>
        <p className="text-gray-700 text-lg">{service.description}</p>
      </div>
    </main>
  )
}