'use client';
import { Star, BadgeCheck, PackageOpen, IdCardLanyard, MousePointerClick, OctagonAlert } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface Professional {
  id: number;
  imageUrl: string;
  company: string;
  rating: string;
  guarantee: boolean;
  employee_count: number;
  total_hires: number;
  founded: number;
  background_check: boolean;
  status: string;
  description: string;
}

interface ProfessionalListProps {
  professionals: Professional[];
}

export default function ProfessionalList({ professionals }: ProfessionalListProps) {
  return (
    <div className="flex-2 w-full space-y-6">
      {professionals.map((data) => (
        <motion.div
          key={data.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          whileHover={{ scale: 1.01 }}
          className={`rounded-lg overflow-hidden shadow-md transition-colors duration-300 dark:bg-gray-800 dark:border-gray-700 bg-white border-gray-200 border`}
        >
          <div className="md:flex">
            <div className="md:w-1/3">
              <Image
                src={data.imageUrl}
                width={400}
                height={300}
                alt={data.company}
                className="w-full h-48 md:h-full object-cover"
              />
            </div>
            <div className="p-4 md:w-2/3">
              <div className="flex justify-between items-start">
                <h2 className="text-xl font-semibold">{data.company}</h2>
                <span className={`px-2 py-1 text-xs rounded-full ${data.status === 'Available' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100'}`}>
                  {data.status}
                </span>
              </div>
              
              <div className="flex items-center mt-1">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${i < Math.floor(Number(data.rating)) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300 dark:text-gray-500'}`}
                    />
                  ))}
                </div>
                <span className="ml-1 text-sm">{data.rating}</span>
              </div>
              
              <p className="mt-2 text-sm">{data.description}</p>
              
              <div className="grid grid-cols-2 gap-2 mt-4 text-xs">
                <div className={`flex items-center`}>
                  {data.guarantee ? (
                    <BadgeCheck className="w-4 h-4 text-green-500 dark:text-green-200 mr-1"/>
                  ) : (
                    <OctagonAlert className="w-4 h-4 text-red-500 dark:text-red-200 mr-1" />
                  )}
                  <span className={`${data.guarantee ? 'text-green-500 dark:text-green-200': 'dark:text-red-200 text-red-500'}`}>Guarantee</span>
                </div>
                <div className='flex justify-start items-center flex-row text-gray-500 dark:text-gray-200'>
                  <IdCardLanyard className="w-4 h-4 mr-1"/>
                  <span className="font-medium">Employees: </span>
                  {data.employee_count}
                </div>
                <div className='flex justify-start items-center flex-row text-gray-500 dark:text-gray-200'>
                  <PackageOpen className="w-4 h-4 mr-1"/>
                  <span className="font-medium">Founded: </span>
                  {data.founded}
                </div>
                <div className='flex justify-start items-center flex-row text-gray-500 dark:text-gray-200'>
                  <MousePointerClick className="w-4 h-4 mr-1"/>
                  <span className="font-medium">Hires: </span>
                  {data.total_hires}
                </div>
              </div>
              
              <div className="mt-4 flex justify-end">
                <Link 
                  href={`/home-services/professional-profile/${data.id}`}
                  className={`px-4 py-2 text-sm rounded transition-colors dark:bg-sky-600 dark:hover:bg-sky-700 bg-sky-500 hover:bg-sky-600 text-white`}
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}