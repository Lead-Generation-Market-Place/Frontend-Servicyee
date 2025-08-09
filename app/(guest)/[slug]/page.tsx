'use client'
import { useState } from "react";
import TicketSidebar from "@/components/common/TicketSidebar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogClose
} from "@/components/ui/dialog";
import Breadcrumb from "@/components/common/Breadcrumb";
import CustomBadge from "@/components/ui/custom-badge";
import ImagesDialogBox from "@/components/common/ImagesDialogBox";
import ServicesMedia from "@/components/common/ServicesMedia";
import { CustomTabs } from "@/components/ui/custom-tab";

const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Hom Services', href: '/home-services' },
    { label: 'Sight Seeing & Tours', href: 'sightseeing-and-tours' }, // current page, no link
    { label: 'Boat Tour', href: 'boat-tour' }, // current page, no link
  ]


const service = {
  title: "90-Minute Chicago Architecture Boat Tour & Cruise for One, Two, Three, or Four (Up to 41% Off)",
  location: "900 South Wells Street, Chicago",
  rating: 4.8,
  reviews: 8701,
  badges: ["Best Rated", "5,000+ Bought", "400+ bought today"],
  image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80",
  gallery: [
    "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80",
  ],
};

const ticketOptions = [
  {
    label: "90-Minute Chicago Architecture Boat Tour for One",
    original: "$49",
    price: "$29",
    discount: "-41%",
    promo: "$23.49",
    promoCode: "SUMMERFUN",
  },
  {
    label: "90-Minute Chicago Architecture Boat Tour for Two",
    original: "$98",
    price: "$58",
    discount: "-41%",
    promo: "$46.49",
    promoCode: "SUMMERFUN",
  },
  {
    label: "90-Minute Chicago Architecture Boat Tour for Three",
    original: "$147",
    price: "$87",
    discount: "-41%",
    promo: "$69.99",
    promoCode: "SUMMERFUN",
  },
  {
    label: "90-Minute Chicago Architecture Boat Tour for Four",
    original: "$196",
    price: "$116",
    discount: "-41%",
    promo: "$92.99",
    promoCode: "SUMMERFUN",
  },
];

const tabContent = {
  about: (
    <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
      <p>Picturesque Chicago river cruise is paired with architecture and history lessons about the city’s most popular landmarks</p>
      <ul className="list-disc pl-5">
        <li>What’s included: a leisurely architecture boat tour of downtown Chicago</li>
        <li>Departure times: See the schedule and availability as well as information on parking and directions.</li>
        <li>Alcoholic and nonalcoholic beverages and snacks are available for purchase onboard.</li>
        <li>Kids aged 3 and younger ride free, but must be included in your online reservation on the merchant website.</li>
        <li>Parking: located right next to the marina.</li>
        <li>Vessel: full-service bathrooms, bars, and staff assist with passenger’s needs</li>
        <div>
        Introducing the Tiki Pontoon—your go-to cozy boat to take in the Chicago skyline up close with 11 of your closest friends in a cozy, intimate setting!
        Featuring a waterslide, lily pad, inflatable floaties, a clean restroom, 
        a gas grill, and a spacious cooler with 20 lbs of ice, it’s perfect for a laid-back day on the water. Weekday cruises 
        run Monday-Thursday from 11 a.m. to 2 p.m., 3 p.m. to 6 p.m., and 7 p.m. to 10 p.m., with weekend options on Friday and Sunday 
        evenings from 7 p.m. to 10 p.m. Bring your own food, drinks, and even your Bluetooth stereo for a personalized cruising experience!
        Why You Should Grab The Offer
        Get ready for an unforgettable adventure on the waters of Chicago! This exclusive offer lets you experience the city’s iconic
        fireworks from the water, with breathtaking views of the skyline and architectural wonders—perfect for design enthusiasts. 
        Whether youre celebrating a bachelorette party or just seeking a unique outing, our customizable experience ensures every moment feels personal
        . Enjoy stress-free fun aboard our well-equipped boats with BBQs, music systems, phone chargers, and more.
        With our dedicated team handling all the details, all you need to do is kick back, enjoy the slides
        , savor the BBQ, and create unforgettable memories on Lake Michigan!
        </div>
      </ul>
    </div>
  ),
  need: (
    <div className="space-y-8">
      {/* Additional Info */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 text-gray-700 mr-2">
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
          </span>
          <span className="font-semibold">Additional Info</span>
        </div>
        <div className="text-sm text-gray-700 dark:text-gray-300">
          Note- Captain not included in pricing. Captains fee is an additional $300. Due to USCG bare boat regulations, you must choose your captain at checkout, and pay the captains fee directly to them on the day of your rental. They accept cash or Zelle only. Not valid on Saturdays.
        </div>
      </div>
      {/* Terms & Conditions */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 text-gray-700 mr-2">
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 12l2 2l4-4"/><rect width="18" height="18" x="3" y="3" rx="2"/></svg>
          </span>
          <span className="font-semibold">Terms & Conditions</span>
        </div>
        <div className="text-sm text-gray-700 dark:text-gray-300">
          Valid only for option purchased.<br />
          Must use promotional value in 1 visit.
        </div>
      </div>
      {/* Legal Disclosures */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 text-gray-700 mr-2">
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 8v4"/><path d="M12 16h.01"/><circle cx="12" cy="12" r="10"/></svg>
          </span>
          <span className="font-semibold">Legal Disclosures</span>
        </div>
        <div className="text-sm text-gray-700 dark:text-gray-300">
          Promotional value expires Dec 31, 2025. Amount paid never expires.<br />
          Merchant is solely responsible to purchasers for the care and quality of the advertised goods and services.<br />
          Learn about <a href="#" className="text-blue-700 underline">Strike-Through Pricing and Savings</a>
        </div>
      </div>
      <hr className="my-6 border-gray-200" />
      {/* Company Info */}
      <div>
        <div className="font-semibold mb-1">About Chicago Tiki Boat Inc.</div>
        <div className="text-sm text-gray-700 dark:text-gray-300 mb-1">
          Founded by Pablo, a Santiago, Chile native, Chicago Tiki Boat was born in 2012, evolving from a hobby into a platform for creating lifelong memories through boat parties and lake adventures. With a commitment to providing high customer satisfaction, Chicago Tiki Boat ensures that every guest has a positive and memorable experience.
        </div>
        <a href="#" className="text-blue-700 underline text-sm">Company Website</a>
      </div>
    </div>
  ),
  redeem: (
    <div className="space-y-6">
      {/* Map section (iframe for demo) */}
      <div className="rounded-xl overflow-hidden border w-full max-w-xl mb-4">
        <iframe
          title="Chicago Redeem Locations Map"
          src="https://www.openstreetmap.org/export/embed.html?bbox=-87.630692%2C41.881551%2C-87.610692%2C41.901551&amp;layer=mapnik"
          className="w-full h-64"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>
      {/* Locations list */}
      <div className="space-y-6">
        {/* Location 1 */}
        <div className="flex items-start justify-between border-b pb-4">
          <div>
            <div className="font-semibold">Shoreline Sightseeing Michigan Ave Dock</div>
            <div className="text-xs text-gray-500 mb-1">401 N. Michigan Ave, Chicago</div>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-red-600 font-semibold">● Closed</span>
              <span className="text-gray-500">· Opening at 10:00 AM</span>
            </div>
          </div>
          <div className="text-xs text-gray-500 flex items-center gap-1"> <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg> 3.0 mi</div>
        </div>
        {/* Location 2 */}
        <div className="flex items-start justify-between border-b pb-4">
          <div>
            <div className="font-semibold">Shoreline Sightseeing Navy Pier</div>
            <div className="text-xs text-gray-500 mb-1">600 East Grand Avenue, Chicago</div>
          </div>
          <div className="text-xs text-gray-500 flex items-center gap-1"> <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg> 3.4 mi</div>
        </div>
        {/* Location 3 */}
        <div className="flex items-start justify-between">
          <div>
            <div className="font-semibold">Navy Pier</div>
            <div className="text-xs text-gray-500 mb-1">124 North Streeter Drive, Chicago</div>
          </div>
          <div className="text-xs text-gray-500 flex items-center gap-1"> <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg> 3.5 mi</div>
        </div>
      </div>
    </div>
  ),
  reviews: (
    <div className="space-y-8 w-ful">
      {/* Header */}
      <div>
        <div className="font-bold text-lg mb-1">Customer Reviews</div>
        <div className="flex items-center gap-3 mb-1">
          <span className="text-3xl font-bold text-yellow-500">4.9</span>
          <span className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <svg key={i} width="22" height="22" fill="currentColor" className="text-yellow-400" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.454a1 1 0 00-1.175 0l-3.38 2.454c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z"/></svg>
            ))}
          </span>
          <span className="text-gray-500 text-base">based on Groupon 3,477 reviews</span>
        </div>
      </div>
      {/* Verified Reviews Box */}
      <div className="bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 flex items-center gap-3">
        <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-green-600 text-white mr-2"><svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg></span>
        <div>
          <div className="font-semibold">100% Verified Reviews</div>
          <div className="text-xs text-gray-500">All Groupon reviews are from people who have redeemed deals with this merchant. Review requests are sent by email to customers who purchased the deal.</div>
        </div>
      </div>
      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-2">
        {["tour", "tour guide", "guide", "experience", "staff", "Show more"].map((tag, i) => (
          <button key={i} className="px-3 py-1 rounded border text-xs bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition">{tag}</button>
        ))}
      </div>
      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Review 1 */}
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-lg text-gray-600">G</div>
            <div>
              <div className="font-semibold">Guest</div>
              <div className="text-xs text-gray-500">3 ratings | 3 reviews</div>
            </div>
            <span className="ml-auto text-xs text-gray-400">1 day ago</span>
          </div>
          <div className="flex items-center gap-1 text-yellow-400 text-sm mb-1">{[...Array(5)].map((_, i) => <span key={i}>★</span>)}</div>
          <div className="text-sm">Friendly staff! Great view!</div>
        </div>
        {/* Review 2 */}
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-lg text-gray-600">K</div>
            <div>
              <div className="font-semibold">Kristal</div>
              <div className="text-xs text-gray-500">4 ratings | 2 reviews</div>
            </div>
            <span className="ml-auto text-xs text-gray-400">8 days ago</span>
          </div>
          <div className="flex items-center gap-1 text-yellow-400 text-sm mb-1">{[...Array(5)].map((_, i) => <span key={i}>★</span>)}</div>
          <div className="text-sm">We were late because of the NASCAR and fireworks crowds. They were friendly and accommodating. We were booked on the next boat. The tour was informative and the...</div>
          <a href="#" className="text-xs text-blue-700 underline">Read More</a>
        </div>
        {/* Review 3 */}
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-lg text-gray-600">C</div>
            <div>
              <div className="font-semibold">Courtney</div>
              <div className="text-xs text-gray-500">6 ratings | 3 reviews</div>
            </div>
            <span className="ml-auto text-xs text-gray-400">18 days ago</span>
          </div>
          <div className="flex items-center gap-1 text-yellow-400 text-sm mb-1">{[...Array(5)].map((_, i) => <span key={i}>★</span>)}</div>
          <div className="text-sm">We loved the tour!! 7:30pm was a perfect time to enjoy it during day time and as the evening city lights came alive. Highly recommend.</div>
        </div>
        {/* Review 4 */}
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-lg text-gray-600">E</div>
            <div>
              <div className="font-semibold">Ellen <span className="ml-1 px-1 bg-gray-200 text-xs rounded">Top reviewer</span> <span className="ml-1 px-1 bg-gray-200 text-xs rounded">Helpful reviewer</span></div>
              <div className="text-xs text-gray-500">42 ratings | 36 reviews</div>
            </div>
            <span className="ml-auto text-xs text-gray-400">27 days ago</span>
          </div>
          <div className="flex items-center gap-1 text-yellow-400 text-sm mb-1">{[...Array(5)].map((_, i) => <span key={i}>★</span>)}</div>
          <div className="text-sm">Price was good, people were very friendly & nice. The guide & captain on board were very good too. Highly recommended</div>
        </div>
        {/* Review 5 */}
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-lg text-gray-600">G</div>
            <div>
              <div className="font-semibold">Guest</div>
              <div className="text-xs text-gray-500">1 rating | 1 review</div>
            </div>
            <span className="ml-auto text-xs text-gray-400">43 days ago</span>
          </div>
          <div className="flex items-center gap-1 text-yellow-400 text-sm mb-1">{[...Array(5)].map((_, i) => <span key={i}>★</span>)}</div>
          <div className="text-sm">It was very nice. Smooth transaction</div>
        </div>
        {/* Review 6 */}
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-lg text-gray-600">S</div>
            <div>
              <div className="font-semibold">Sannyu</div>
              <div className="text-xs text-gray-500">5 ratings | 2 reviews</div>
            </div>
            <span className="ml-auto text-xs text-gray-400">52 days ago</span>
          </div>
          <div className="flex items-center gap-1 text-yellow-400 text-sm mb-1">{[...Array(5)].map((_, i) => <span key={i}>★</span>)}</div>
          <div className="text-sm">Our tour guide was amazing in knowledge that she shared! The captain made the trip smooth and we enjoyed it very much!!</div>
        </div>
      </div>
      {/* See all reviews button with dialog */}
      <Dialog >
        <DialogTrigger asChild>
          <Button variant="outline" className="px-6 py-2 rounded-full border font-semibold">See all reviews (3,477)</Button>
        </DialogTrigger>
        <DialogContent className="p-0 overflow-hidden w-[90vw] !max-w-6xl">
          <div className="flex flex-col md:flex-row h-[80vh]">
            {/* Left column: rating summary */}
            <div className="bg-gray-50 dark:bg-gray-900 p-8 w-full md:w-1/3 flex flex-col gap-6 border-r border-gray-200 dark:border-gray-800">
              <div>
                <div className="font-bold text-lg mb-1">Customer Reviews</div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-3xl font-bold text-yellow-500">4.9</span>
                  <span className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} width="22" height="22" fill="currentColor" className="text-yellow-400" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.454a1 1 0 00-1.175 0l-3.38 2.454c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z"/></svg>
                    ))}
                  </span>
                </div>
                <div className="text-gray-500 text-base mb-4">based on Groupon 3,477 reviews</div>
                {/* Star breakdown */}
                <div className="space-y-1">
                  {[5,4,3,2,1].map((star, i) => (
                    <div key={star} className="flex items-center gap-2 text-xs">
                      <span className="w-4 font-semibold">{star}</span>
                      <svg width="14" height="14" fill="currentColor" className="text-yellow-400" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.454a1 1 0 00-1.175 0l-3.38 2.454c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z"/></svg>
                      <div className="flex-1 bg-gray-200 rounded h-2 mx-2 overflow-hidden">
                        <div className={`bg-yellow-400 h-2 rounded`} style={{width: ["93%","4%","1%","0%","2%"][i]}}></div>
                      </div>
                      <span className="w-8 text-right">{["93%","4%","1%","0%","2%"][i]}</span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Verified box */}
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 flex items-center gap-3 mt-8">
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-green-600 text-white mr-2"><svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg></span>
                <div>
                  <div className="font-semibold">100% Verified Reviews</div>
                  <div className="text-xs text-gray-500">All Groupon reviews are from people who have redeemed deals with this merchant. Review requests are sent by email to customers who purchased the deal.</div>
                </div>
              </div>
            </div>
            {/* Right column: reviews list */}
            <div className="flex-1 p-8 overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <div className="font-semibold text-gray-700">from Groupon</div>
                <select className="border rounded px-2 py-1 text-xs">
                  <option>Sort by: Highest Rated</option>
                  <option>Sort by: Most Recent</option>
                </select>
              </div>
              <div className="mb-4">
                <span className="text-green-700 font-bold text-2xl">GROU<span className="text-black dark:text-white">PON</span></span>
              </div>
              {/* Review cards (repeat for demo) */}
              {[{
                name: "Guest", ratings: 3, reviews: 3, date: "1 day ago", text: "Friendly staff! Great view!"
              }, {
                name: "Kristal", ratings: 4, reviews: 2, date: "8 days ago", text: "We were late because of the NASCAR and fireworks crowds. They were friendly and accommodating. We were booked on the next boat. The tour was informative and the views were amazing."
              }, {
                name: "Courtney", ratings: 6, reviews: 3, date: "18 days ago", text: "We loved the tour!! 7:30pm was a perfect time to enjoy it during day time and as the evening city lights came alive. Highly recommend."
              }, {
                name: "Ellen", ratings: 42, reviews: 36, date: "27 days ago", text: "Price was good, people were very friendly & nice. The guide & captain on board were very good too. Highly recommended", badges: ["Top reviewer", "Helpful reviewer"]
              }].map((r, i) => (
                <div key={i} className="flex gap-3 py-4 border-b last:border-b-0">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-lg text-gray-600">{r.name[0]}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{r.name}</span>
                      {r.badges && r.badges.map((b, j) => (
                        <span key={j} className="ml-1 px-1 bg-gray-200 text-xs rounded">{b}</span>
                      ))}
                      <span className="ml-2 text-xs text-gray-500">{r.ratings} ratings | {r.reviews} reviews</span>
                      <span className="ml-auto text-xs text-gray-400">{r.date}</span>
                    </div>
                    <div className="flex items-center gap-1 text-yellow-400 text-sm mb-1">{[...Array(5)].map((_, i) => <span key={i}>★</span>)}</div>
                    <div className="text-sm">{r.text}</div>
                  </div>
                </div>
              ))}
              {/* Pagination */}
              <div className="flex justify-center mt-6">
                <nav className="flex items-center gap-1">
                  <button className="w-8 h-8 rounded-full bg-green-600 text-white font-bold">1</button>
                  <button className="w-8 h-8 rounded-full bg-gray-200 text-gray-700">2</button>
                  <button className="w-8 h-8 rounded-full bg-gray-200 text-gray-700">3</button>
                  <span className="px-2">...</span>
                  <button className="w-8 h-8 rounded-full bg-gray-200 text-gray-700">306</button>
                </nav>
              </div>
            </div>
            <DialogClose className="absolute top-4 right-4 text-gray-400 hover:text-gray-700">
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  ),
};


const tabList = [
  { key: "about", label: "About" },
  { key: "need", label: "Need To Know Info" },
  { key: "redeem", label: "Where To Redeem" },
  { key: "reviews", label: "Reviews" },
];
const bageItems = [
   { title: "Best Rated" ,bgColor:"bg-[#ffe066]" ,textColor:"text-black"},
   { title:"5,000+ Bought" , bgColor:"bg-red-100", textColor:"bg-red-700"},
   { title:"400+ bought today" ,bgColor:"bg-blue-100", textColor:"text-blue-700"}
]

export default function ServicesDetailsPage() {
  const [selectedOption, setSelectedOption] = useState(0);
  const [galleryDialogOpen, setGalleryDialogOpen] = useState(false);


  return (
    <div className="max-w-7xl mx-auto px-2 py-6">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 w-full">
      <div className="col-span-8 w-full">
        {/* LEFT: Image, Title, Badges, Gallery, Info */}
        <div className="flex-1 min-w-0 w-full">
          {/* Breadcrumbs (optional) */}
          <div className="text-xs text-gray-500 mb-2 flex flex-wrap gap-1">
          <Breadcrumb items={breadcrumbItems} />
          </div>
          {/* Title */}
          <h1 className="text-2xl md:text-3xl font-bold mb-2 leading-tight">{service.title}</h1>
          {/* Location, rating, reviews */}
          <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600 mb-2">
            <span>Tours and Boats - Architecture Tour - Chicago</span>
            <span>·</span>
            <a href="#" className="underline hover:text-blue-700">{service.location}</a>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-yellow-400 font-bold">★ {service.rating}</span>
            <a href="#" className="text-xs text-blue-700 underline">({service.reviews.toLocaleString()} reviews)</a>
          </div>
          {/* Badges */}
          <div className="flex gap-2 mb-3 flex-wrap">
            {bageItems.map((item,index)=> <CustomBadge key={index} title={item.title} bgColor={item.bgColor} textColor={item.textColor} />)}
            
          </div>
          <ServicesMedia mainImage={service.image} images={service.gallery}  onClick={(i)=>{
                    setGalleryDialogOpen(true);
                    setSelectedOption(i);
                }} />
        </div>
         {/* Tabs Section (unchanged) */}
         
         <CustomTabs tabList={tabList} tabContent={tabContent}/>
      </div>
       {/* RIGHT: Ticket Options, Promo, Buy Button */}
        <div className="col-span-12 md:col-span-4 w-full">
       <TicketSidebar ticketOptions={ticketOptions} />
       </div>
      </div>
      <ImagesDialogBox selectIndex={selectedOption} open={galleryDialogOpen} title="Gallery" onOpenChange={setGalleryDialogOpen} images={service.gallery} />
    </div>
  );
}