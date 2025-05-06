// @ts-check

import React from 'react';
import OrganizerStartCard from '../../../components/organizer/OrganizerStartCard';
import OrganizerSolutionsCard from '../../../components/organizer/OrganizerSolutionsCard';
import OrganizerOfferCard from '../../../components/organizer/OrganizerOfferCard';
import OrganizerFeature from '../../../components/organizer/OrganizerFeature';
import OrganizerFeatureNews from '../../../components/organizer/OrganizerFeatureNews';
import TestimonialSection from '../../../components/TestimonialSection';
import SubscribeSection from '../../../components/SubscribeCard';
import Authorized from '../../../components/Authorized';

const testimonialsData = [
  {
    avatar: 'https://via.placeholder.com/100?text=Avatar+1',
    name: 'Alice Johnson',
    role: 'Product Manager',
    stars: 5,
    description: 'This product exceeded my expectations. Truly outstanding!',
  },
  {
    avatar: 'https://via.placeholder.com/100?text=Avatar+2',
    name: 'Bob Smith',
    role: 'Designer',
    stars: 4,
    description: 'A great experience with a few minor hiccups. Would recommend.',
  },
  {
    avatar: 'https://via.placeholder.com/100?text=Avatar+3',
    name: 'Charlie Lee',
    role: 'Developer',
    stars: 5,
    description: 'Amazing quality and support. Highly satisfied with my purchase!',
  },
  // Add more testimonials as needed
];

const OrganizerHomepage = () => {
  return (
    <div>
      <Authorized role="organizer" />

      {/* Main Content */}
      <OrganizerStartCard />
      <OrganizerSolutionsCard />
      <OrganizerOfferCard />
      <OrganizerFeature />
      <OrganizerFeatureNews />
      <TestimonialSection testimonials={testimonialsData} />
      <SubscribeSection />
    </div>
  );
}

export default OrganizerHomepage;
