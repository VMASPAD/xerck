import React from 'react';
import { Button } from './Button';

export const ButtonsShowcase = () => {
  return (
    <div className="p-8 bg-background max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Buttons UI Library</h1>
      
      {/* Standard Variants */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4 border-b pb-2">Standard Variants</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Button variant="normal" label="Primary" />
          <Button variant="secondary" label="Secondary" />
          <Button variant="outline" label="Outline" />
          <Button variant="danger" label="Danger" />
        </div>
      </section>
      
      {/* Status Variants */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4 border-b pb-2">Status Variants</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Button variant="success" label="Success" />
          <Button variant="info" label="Info" />
          <Button variant="warning" label="Warning" />
        </div>
      </section>
      
      {/* Special Variants */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4 border-b pb-2">Special Variants</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Button variant="ghost" label="Ghost" />
          <Button variant="link" label="Link Button" />
          <Button variant="subtle" label="Subtle" />
          <Button variant="gradient" label="Gradient" />
        </div>
      </section>
      
      {/* Sizes */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4 border-b pb-2">Size Variants</h2>
        <div className="flex flex-col space-y-4">
          <Button size="sm" label="Small Button" />
          <Button size="md" label="Medium Button" />
          <Button size="lg" label="Large Button" />
        </div>
      </section>
      
      {/* States */}
      <section>
        <h2 className="text-xl font-semibold mb-4 border-b pb-2">Button States</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button label="Default Button" />
          <Button disabled label="Disabled Button" />
        </div>
      </section>
    </div>
  );
};
