import { notFound } from 'next/navigation';
import { ProjectClient } from './project-client';

const projects: Record<
  string,
  {
    title: string;
    category: string;
    description: string;
    fullDescription: string;
    image: string;
    tags: string[];
    client: string;
    year: string;
    challenge: string;
    solution: string;
    results: string[];
    gallery: string[];
  }
> = {
  'fintech-dashboard': {
    title: 'FinTech Dashboard',
    category: 'Web App',
    description:
      'A comprehensive financial management platform with real-time analytics and trading capabilities.',
    fullDescription:
      'We developed a state-of-the-art financial dashboard that provides real-time market data, portfolio management, and advanced trading capabilities for institutional investors.',
    image: '/modern-fintech-dashboard-dark-theme.jpg',
    tags: ['React', 'Node.js', 'PostgreSQL', 'WebSocket', 'D3.js'],
    client: 'TechVentures Inc.',
    year: '2024',
    challenge:
      'The client needed a high-performance platform capable of handling millions of real-time data points while maintaining sub-second response times.',
    solution:
      'We implemented a microservices architecture with WebSocket connections for real-time updates, Redis caching for frequently accessed data, and D3.js for interactive visualizations.',
    results: [
      '99.9% uptime achieved',
      '50% reduction in trade execution time',
      'Real-time data processing for 1M+ daily transactions',
      '40% increase in user engagement',
    ],
    gallery: [
      '/fintech-dashboard-analytics.png',
      '/fintech-trading-interface-dark.jpg',
      '/fintech-portfolio-management-screen.jpg',
    ],
  },
  'healthcare-platform': {
    title: 'AI Healthcare Platform',
    category: 'AI/ML',
    description:
      'Intelligent healthcare management system with AI-powered diagnostics and patient monitoring.',
    fullDescription:
      'A revolutionary healthcare platform that leverages artificial intelligence to assist medical professionals in diagnostics, patient monitoring, and treatment recommendations.',
    image: '/healthcare-ai-platform-interface.jpg',
    tags: ['Python', 'TensorFlow', 'React', 'FastAPI', 'PostgreSQL'],
    client: 'MedTech Solutions',
    year: '2024',
    challenge:
      'Healthcare providers needed an AI-powered system that could analyze medical images and patient data while maintaining strict HIPAA compliance.',
    solution:
      'We built a HIPAA-compliant platform with custom ML models for medical image analysis, real-time patient monitoring, and a secure data architecture.',
    results: [
      '95% accuracy in preliminary diagnostics',
      '60% reduction in diagnosis time',
      'HIPAA compliant architecture',
      'Serving 50+ healthcare facilities',
    ],
    gallery: [
      '/healthcare-ai-diagnostics-interface.jpg',
      '/medical-patient-monitoring-dashboard.jpg',
      '/healthcare-analytics-platform-dark.jpg',
    ],
  },
  'ecommerce-suite': {
    title: 'E-Commerce Suite',
    category: 'E-commerce',
    description:
      'Full-featured e-commerce platform with inventory management and analytics dashboard.',
    fullDescription:
      'A comprehensive e-commerce solution that combines a beautiful storefront with powerful inventory management, analytics, and multi-channel selling capabilities.',
    image: '/modern-ecommerce-platform-dark.jpg',
    tags: ['Next.js', 'Stripe', 'MongoDB', 'Redis', 'AWS'],
    client: 'RetailPro',
    year: '2023',
    challenge:
      'The client required a scalable e-commerce platform that could handle Black Friday traffic spikes while maintaining fast page loads.',
    solution:
      'We implemented edge caching, database sharding, and a microservices architecture that auto-scales based on traffic patterns.',
    results: [
      '3x increase in conversion rate',
      'Sub-second page load times',
      '99.99% uptime during peak sales',
      '$10M+ in processed transactions',
    ],
    gallery: [
      '/ecommerce-storefront-modern-dark.jpg',
      '/ecommerce-admin-dashboard-inventory.jpg',
      '/ecommerce-analytics-sales-charts.jpg',
    ],
  },
};

export async function generateStaticParams() {
  return Object.keys(projects).map((id) => ({ id }));
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = projects[id];

  if (!project) {
    notFound();
  }

  return <ProjectClient project={project} />;
}
