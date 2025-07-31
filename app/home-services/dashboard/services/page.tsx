'use client';

import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover';
import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
  CommandEmpty,
} from '@/components/ui/command';

const subCategoriesData = [
  { id: '1', name: 'Plumbing' },
  { id: '2', name: 'Electrical' },
  { id: '3', name: 'Carpentry' },
];

const servicesData = [
  { id: '101', name: 'Leak Fixing', subCategoryId: '1' },
  { id: '102', name: 'Pipe Installation', subCategoryId: '1' },
  { id: '103', name: 'Wiring Repair', subCategoryId: '2' },
  { id: '104', name: 'Fan Installation', subCategoryId: '2' },
  { id: '105', name: 'Furniture Repair', subCategoryId: '3' },
  { id: '106', name: 'Door Installation', subCategoryId: '3' },
];

export default function Services() {
  const [selectedSubCategories, setSelectedSubCategories] = useState<string[]>([]);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const toggleSubCategory = (id: string) => {
    setSelectedSubCategories((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
    setSelectedServices([]); // Reset services on sub-category change
  };

  const toggleService = (id: string) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredServices = servicesData.filter((s) =>
    selectedSubCategories.includes(s.subCategoryId)
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    // Simulate storing data
    setTimeout(() => {
      setLoading(false);
      alert(JSON.stringify({
        subCategories: selectedSubCategories,
        services: selectedServices,
      }, null, 2));
    }, 2000);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-6 space-y-8">
      {/* Heading */}
      <div>
        <h2 className="text-xl font-semibold text-[#0077B6] dark:text-[#90e0ef] mb-2">
          Sign up as a Professional
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Connect with top Customers in your area
        </p>
      </div>

      {/* Sub-Categories */}
      <div className="sm:col-span-3">
        <label className="block text-sm font-medium text-gray-900 dark:text-white mb-1.5">
          Select Sub-Categories
        </label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full text-[13px] bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white justify-start"
            >
              {selectedSubCategories.length > 0
                ? `${selectedSubCategories.length} selected`
                : 'Select sub-categories'}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[100%]  p-0">
            <Command >
              <CommandInput className='rounded-[4px]' placeholder="Search sub-categories..." />
              <CommandEmpty>No sub-category found.</CommandEmpty>
              <CommandList >
                {subCategoriesData.map((item) => (
                  <CommandItem key={item.id} onSelect={() => toggleSubCategory(item.id)}>
                    <div className=" flex justify-between w-full text-sm">
                      <span className='py-1 rounded-[4px]'>{item.name}</span>
                      {selectedSubCategories.includes(item.id) && <span>✓</span>}
                    </div>
                  </CommandItem>
                ))}
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        <div className="mt-2 flex flex-wrap gap-2">
          {selectedSubCategories.map((id) => {
            const name = subCategoriesData.find((s) => s.id === id)?.name;
            return (
              <Badge key={id} className="bg-[#0077B6] rounded-[2px] text-white hover:bg-[#0077B6]">
                {name}
              </Badge>
            );
          })}
        </div>
      </div>

      {/* Services */}
      <div className="sm:col-span-3">
        <label className="block text-sm font-medium text-gray-900 dark:text-white mb-1.5">
          Select Services
        </label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full text-[13px] bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white justify-start"
              disabled={filteredServices.length === 0}
            >
              {selectedServices.length > 0
                ? `${selectedServices.length} selected`
                : 'Select services'}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[100%] p-0">
            <Command>
              <CommandInput placeholder="Search services..." />
              <CommandEmpty>No service found.</CommandEmpty>
              <CommandList>
                {filteredServices.map((item) => (
                  <CommandItem key={item.id} onSelect={() => toggleService(item.id)}>
                    <div className="flex justify-between w-full text-sm">
                      <span className='py-1 rounded-[4px]'>{item.name}</span>
                      {selectedServices.includes(item.id) && <span>✓</span>}
                    </div>
                  </CommandItem>
                ))}
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        <div className="mt-2 flex flex-wrap gap-2">
          {selectedServices.map((id) => {
            const name = servicesData.find((s) => s.id === id)?.name;
            return (
              <Badge key={id} className="bg-[#0077B6] rounded-[2px] text-white hover:bg-[#0077B6]">
                {name}
              </Badge>
            );
          })}
        </div>
      </div>

      {/* Submit + Help */}
      <div className="sm:col-span-3">
        <div className="pt-4 border-t border-gray-200 dark:border-gray-700 text-xs text-gray-600 dark:text-gray-300 space-y-1">
          <p className="font-medium text-[#0077B6] dark:text-[#90e0ef]">Need assistance?</p>
          <p>
            Call us at:{' '}
            <a href="tel:+12028304424" className="text-[#0077B6] hover:underline">
              +1 (202) 830-4424
            </a>
          </p>
          <p>
            Email:{' '}
            <a href="mailto:support@yelpax.com" className="text-[#0077B6] hover:underline">
              support@servicyee.com
            </a>
          </p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`mt-4 w-full py-2 px-4 text-sm font-medium rounded-[4px] transition-colors ${
            loading
              ? 'bg-[#0077B6]/70 dark:bg-[#0077B6]/50 cursor-not-allowed'
              : 'bg-[#0077B6] hover:bg-[#005f8e] text-white'
          }`}
        >
          {loading ? (
            <span className="flex items-center justify-center text-white">
              <Loader2 className="animate-spin mr-2 h-4 w-4 text-white" />
              Processing...
            </span>
          ) : (
            'Continue'
          )}
        </button>
      </div>
    </form>
  );
}
