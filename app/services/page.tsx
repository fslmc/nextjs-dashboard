import Link from 'next/link';

const services = [
  { id: 'web', title: 'Web Development' },
  { id: 'design', title: 'UI/UX Design' },
  { id: 'seo', title: 'SEO Optimization' },
  { id: 'consulting', title: 'IT Consulting' },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">Our Services</h1>
      <ul className="grid gap-6 md:grid-cols-2 max-w-2xl w-full">
        {services.map((service) => (
          <li key={service.id} className="bg-white rounded-lg shadow p-6 flex flex-col items-start">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">{service.title}</h2>
            <Link
              href={`/services/${service.id}`}
              className="mt-2 text-blue-500 hover:underline font-medium"
            >
              Learn More
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}