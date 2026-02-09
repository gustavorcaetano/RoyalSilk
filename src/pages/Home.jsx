import React from 'react';
import { Hero } from '../components/Hero';
import { ModelGrid } from '../components/ModelGrid'; 
import { FinalCTA } from '../components/FinalCTA';
import '../App.css';

export const Home = () => { // Use export const para combinar com seu App.jsx
  return (
    <div className="home-wrapper">
      <Hero />
      <ModelGrid />
      <FinalCTA />
    </div>
  );
};