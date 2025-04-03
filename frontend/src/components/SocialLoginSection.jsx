import React from 'react';
import SocialLoginCard from './SocialLoginCard';

const SocialLoginSection = () => {
  return (
    <div style={{ padding: '2rem' }}>
      {/* Example: Google login */}
      <SocialLoginCard
        icon="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
        name="Google"
      />

      {/* Example: Facebook login */}
      <SocialLoginCard
        icon="https://upload.wikimedia.org/wikipedia/commons/4/44/Facebook_Logo.png"
        name="Facebook"
      />
    </div>
  );
};

export default SocialLoginSection;
