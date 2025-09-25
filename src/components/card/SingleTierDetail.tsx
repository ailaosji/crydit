import React from 'react';
import type { CardTier } from '../../types';
import TierGrid from './TierGrid';

const SingleTierDetail = ({ tier }: { tier: CardTier }) => (
    <div className="bg-white rounded-3xl shadow-xl p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
            {tier.name}
        </h2>
        <TierGrid tiers={[tier]} />
    </div>
);

export default SingleTierDetail;