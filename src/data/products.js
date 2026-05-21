import headphonesImg from '../assets/headphones.png';
import keyboardImg from '../assets/keyboard.png';
import smartwatchImg from '../assets/smartwatch.png';
import chargingDockImg from '../assets/charging_dock.png';

export const products = [
  {
    id: 1,
    name: "Aura Soundwave Pro",
    category: "Audio",
    price: 299.99,
    image: headphonesImg,
    description: "Premium active noise-cancelling wireless headphones with dynamic spatial audio tuning, ultra-comfortable leatherette earcups, and up to 40 hours of high-fidelity playback.",
    rating: 4.9,
    reviewsCount: 128,
    features: [
      "Hybrid Active Noise Cancellation",
      "40-Hour Battery with Fast Charge",
      "Spatial Audio & Dynamic Head Tracking",
      "Multipoint Bluetooth Connection"
    ],
    specs: {
      "Driver Unit": "40mm Custom Dynamic",
      "Frequency Range": "10Hz - 40,000Hz",
      "Connectivity": "Bluetooth 5.2 / 3.5mm Jack",
      "Weight": "250g"
    }
  },
  {
    id: 2,
    name: "Aura Cyberkey TKL",
    category: "Keyboard",
    price: 189.99,
    image: keyboardImg,
    description: "Sleek, high-performance mechanical keyboard featuring hot-swappable brown tactile switches, dynamic cyber-cyan per-key RGB backlighting, and double-shot PBT keycaps.",
    rating: 4.8,
    reviewsCount: 84,
    features: [
      "Hot-Swappable Switch Sockets",
      "Per-Key Cyber-Cyan RGB Lighting",
      "Double-shot PBT Cherry Profile Keycaps",
      "Triple-Mode (2.4Ghz / Bluetooth 5.0 / USB-C)"
    ],
    specs: {
      "Form Factor": "Tenkeyless (75% layout)",
      "Switches": "Aura Tactile Brown (Pre-lubed)",
      "Battery Capacity": "4000mAh Lithium-polymer",
      "Weight": "920g"
    }
  },
  {
    id: 3,
    name: "Aura Chronos Smartwatch",
    category: "Wearables",
    price: 249.99,
    image: smartwatchImg,
    description: "A cyberpunk-inspired smartwatch built from aerospace-grade aluminum. Features a borderless AMOLED display, advanced fitness/health monitoring, and customized dials.",
    rating: 4.7,
    reviewsCount: 95,
    features: [
      "Borderless Always-On AMOLED Display",
      "Real-time Heart Rate & SpO2 Monitoring",
      "5ATM Water & Dust Resistance",
      "Up to 7 Days of Battery Life"
    ],
    specs: {
      "Display Size": "1.43\" AMOLED (466x466 px)",
      "Case Material": "Aerospace Aluminum",
      "Strap Material": "Hypoallergenic Cyber-Silicone",
      "Sensors": "PPG Sensor, 6-axis Accelerometer"
    }
  },
  {
    id: 4,
    name: "Aura PowerGrid Multi-Dock",
    category: "Chargers",
    price: 89.99,
    image: chargingDockImg,
    description: "An elegant, space-saving multi-device wireless charging station. Power your phone, earbuds, and smartwatch concurrently with intelligent wattage distribution.",
    rating: 4.6,
    reviewsCount: 62,
    features: [
      "15W High-Speed Qi Charging",
      "Concurrently Charge 3 Devices",
      "Intelligent Power Allocation",
      "Amber Ambient Breathing Glow"
    ],
    specs: {
      "Input Interface": "USB Type-C (Power Delivery)",
      "Output Wattage": "Phone: 15W, Buds: 5W, Watch: 5W",
      "Material": "Anodized Aluminum & Acrylic",
      "Protection": "Over-voltage, Short-circuit protection"
    }
  },
  {
    id: 5,
    name: "Aura Soundwave Sport",
    category: "Audio",
    price: 159.99,
    image: headphonesImg, // reuse image
    description: "Lightweight, water-resistant version of our signature headphones designed for intense movement. Features reinforced frame stability and optimized sweat protection.",
    rating: 4.5,
    reviewsCount: 43,
    features: [
      "IPX4 Sweat & Splash Resistant",
      "Secure-fit Headband with Silicone Padding",
      "24-Hour Battery Life",
      "Engineered Punchy Bass EQ Profile"
    ],
    specs: {
      "Driver Unit": "32mm Dynamic",
      "Frequency Range": "20Hz - 20,000Hz",
      "Connectivity": "Bluetooth 5.1",
      "Weight": "190g"
    }
  },
  {
    id: 6,
    name: "Aura Cyberkey Mini 60%",
    category: "Keyboard",
    price: 129.99,
    image: keyboardImg, // reuse image
    description: "An ultra-compact 60% layout keyboard designed to maximize mouse movement space. Fitted with fast, linear red switches perfect for precision gaming and typing.",
    rating: 4.7,
    reviewsCount: 51,
    features: [
      "Ultra-Compact 60% Form Factor",
      "Linear Red Silent Mechanical Switches",
      "Detachable Braided Type-C Cable",
      "Full N-Key Rollover Anti-Ghosting"
    ],
    specs: {
      "Form Factor": "60% Layout",
      "Switches": "Aura Linear Red",
      "Connectivity": "Wired (Detachable USB-C)",
      "Weight": "580g"
    }
  }
];
