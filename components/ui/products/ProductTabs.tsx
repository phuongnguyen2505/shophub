'use client';

import { useState } from 'react';

interface ProductTabsProps {
    description: string;
    specs: { label: string; value: string }[];
}

export default function ProductTabs({ description, specs }: ProductTabsProps) {
    const [activeTab, setActiveTab] = useState<'overview' | 'details'>('overview');

    return (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2 border-b border-slate-200">
                <button
                    onClick={() => setActiveTab('overview')}
                    className={`px-4 py-3 font-medium text-sm transition-colors relative ${
                        activeTab === 'overview'
                            ? 'text-blue-600'
                            : 'text-slate-600 hover:text-slate-900'
                    }`}
                >
                    Overview
                    {activeTab === 'overview' && (
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 rounded-t"></div>
                    )}
                </button>
                <button
                    onClick={() => setActiveTab('details')}
                    className={`px-4 py-3 font-medium text-sm transition-colors relative ${
                        activeTab === 'details'
                            ? 'text-blue-600'
                            : 'text-slate-600 hover:text-slate-900'
                    }`}
                >
                    Details
                    {activeTab === 'details' && (
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 rounded-t"></div>
                    )}
                </button>
            </div>
            <div className="mt-6">
                {activeTab === 'overview' && (
                    <section className="space-y-4 animate-fadeIn">
                        <h2 className="text-lg font-bold text-slate-900">Description</h2>
                        <p className="leading-relaxed text-slate-600 text-base">
                            {description}
                        </p>
                    </section>
                )}
                {activeTab === 'details' && (
                    <section className="space-y-4 animate-fadeIn">
                        <h2 className="text-lg font-bold text-slate-900">Specifications</h2>
                        {specs && specs.length > 0 ? (
                            <div className="grid gap-3 sm:grid-cols-2">
                                {specs.map((s) => (
                                    <div
                                        key={s.label}
                                        className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 hover:bg-slate-100 transition-colors"
                                    >
                                        <span className="text-sm text-slate-600 font-medium">
                                            {s.label}
                                        </span>
                                        <span className="text-sm font-semibold text-slate-900 text-right ml-2">
                                            {s.value}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-slate-500 text-sm">No specifications available</p>
                        )}
                    </section>
                )}
            </div>
        </div>
    );
}
