import React, { useState, useEffect } from 'react';
import { 
  Zap, 
  Battery, 
  Smartphone, 
  Car, 
  ChevronDown, 
  Menu, 
  X, 
  Play,
  Pause,
  BarChart3,
  Clock,
  Thermometer,
  Activity,
  MapPin,
  Calendar,
  ExternalLink
} from 'lucide-react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [chargingProgress, setChargingProgress] = useState(0);
  const [isCharging, setIsCharging] = useState(false);
  const [visibleSections, setVisibleSections] = useState(new Set());

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setVisibleSections(prev => new Set([...prev, entry.target.id]));
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    });

    document.querySelectorAll('section[id]').forEach(section => {
      observer.observe(section);
    });

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isCharging) {
      interval = setInterval(() => {
        setChargingProgress(prev => {
          if (prev >= 100) {
            setIsCharging(false);
            return 100;
          }
          return prev + 2;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isCharging]);

  const startCharging = () => {
    setChargingProgress(0);
    setIsCharging(true);
  };

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const specs = [
    { icon: Battery, label: 'Material', value: 'Graphene Cement', desc: 'Advanced composite material' },
    { icon: Zap, label: 'Capacitance', value: '10 F', desc: 'High capacity energy storage' },
    { icon: Clock, label: 'Charge Time', value: '< 10s', desc: '80% charge in under 10 seconds' },
    { icon: Activity, label: 'Voltage', value: '5 V', desc: 'Optimized for wireless charging' },
    { icon: BarChart3, label: 'Cycle Life', value: '100k+', desc: 'Charge cycles' },
    { icon: Thermometer, label: 'Temperature Range', value: '-40°C to 85°C', desc: 'Stable performance' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-slate-900/95 backdrop-blur-md py-2' : 'bg-gradient-to-r from-slate-900 to-blue-900 py-3'
      }`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-white tracking-wide">2D Nano</h1>
            </div>
            
            <nav className="hidden md:flex space-x-8">
              {['overview', 'demo', 'specs', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="text-slate-200 hover:text-white transition-colors duration-200 capitalize font-medium relative group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-400 transition-all duration-300 group-hover:w-full"></span>
                </button>
              ))}
            </nav>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-white p-2"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-slate-700">
              <nav className="flex flex-col space-y-2 pt-4">
                {['overview', 'demo', 'specs', 'contact'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className="text-slate-200 hover:text-white transition-colors duration-200 capitalize font-medium text-left py-2"
                  >
                    {item}
                  </button>
                ))}
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800"
          style={{
            backgroundImage: `url('https://images.pexels.com/photos/159201/circuit-circuit-board-resistor-computer-159201.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-blue-900/85 to-slate-800/90"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="animate-fade-in-up">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
              Instant Wireless
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-400">
                Charging
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-slate-200 mb-8 max-w-3xl mx-auto leading-relaxed">
              Powered by revolutionary graphene cement supercapacitors for rapid energy transfer
            </p>
            <button
              onClick={() => scrollToSection('demo')}
              className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2 mx-auto"
            >
              <Play className="w-5 h-5" />
              <span>View Live Demo</span>
            </button>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-white/60" />
        </div>
      </section>

      {/* Overview Section */}
      <section id="overview" className={`py-20 transition-all duration-1000 ${
        visibleSections.has('overview') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              Project Overview
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-emerald-500 to-blue-500 mx-auto mb-6"></div>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Experience the future of energy storage with our graphene cement supercapacitors
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-slate-800 mb-4">
                Wireless Charging Innovation
              </h3>
              <p className="text-slate-600 text-lg leading-relaxed">
                This demonstration showcases our revolutionary graphene cement supercapacitors enabling rapid wireless charging of an RC car at the Birmingham Battery System Expo 2025.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { icon: Zap, text: 'Qi-compatible wireless charging pad' },
                  { icon: Battery, text: 'Instant energy transfer to supercapacitors' },
                  { icon: Activity, text: 'Real-time charging indicators' },
                  { icon: Smartphone, text: 'Public phone charging station' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm">
                    <item.icon className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                    <span className="text-slate-700">{item.text}</span>
                  </div>
                ))}
              </div>

              <p className="text-slate-600 text-lg leading-relaxed">
                The RC car moves to the charging station when energy is low, demonstrating our supercapacitors' ability to charge in seconds while stationary.
              </p>
            </div>

            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden transform hover:scale-105 transition-transform duration-300">
                <img 
                  src="https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
                  alt="RC Car Technology Demo"
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h4 className="text-xl font-bold mb-1">RC Car Demo Track</h4>
                  <p className="text-slate-200">Circular track with wireless charging station</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section id="demo" className={`py-20 bg-gradient-to-br from-slate-800 to-blue-900 transition-all duration-1000 ${
        visibleSections.has('demo') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 flex items-center justify-center space-x-3">
              <span>Live Demo</span>
              <div className="w-4 h-4 bg-emerald-400 rounded-full animate-pulse"></div>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-emerald-400 to-blue-400 mx-auto mb-6"></div>
            <p className="text-xl text-slate-200 max-w-3xl mx-auto">
              Witness the power of instant charging at the Birmingham Battery System Expo 2025
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold text-white mb-6 text-center">
                  Interactive Charging Simulator
                </h3>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between text-white">
                    <span>Charging Progress</span>
                    <span className="font-mono">{chargingProgress.toFixed(0)}%</span>
                  </div>
                  
                  <div className="w-full bg-slate-700 rounded-full h-4 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 transition-all duration-300 relative"
                      style={{ width: `${chargingProgress}%` }}
                    >
                      <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <button
                      onClick={startCharging}
                      disabled={isCharging}
                      className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 disabled:from-slate-500 disabled:to-slate-600 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 flex items-center space-x-2"
                    >
                      {isCharging ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                      <span>{isCharging ? 'Charging...' : 'Start Charging Demo'}</span>
                    </button>
                  </div>

                  <div className="text-center text-slate-300 text-sm">
                    Simulates 0-80% charge in under 10 seconds
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white mb-6">
                Demo Experience
              </h3>
              <p className="text-slate-200 text-lg leading-relaxed mb-6">
                Visitors to our booth will experience:
              </p>
              
              <div className="space-y-4">
                {[
                  { icon: Car, text: 'RC car completing laps and charging instantly on the circular track' },
                  { icon: Smartphone, text: 'Interactive phone charging station in the center of the track' },
                  { icon: BarChart3, text: 'Real-time energy transfer visualization and performance metrics' },
                  { icon: Activity, text: 'Live comparison with traditional battery charging methods' }
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                    <item.icon className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-1" />
                    <span className="text-slate-200 leading-relaxed">{item.text}</span>
                  </div>
                ))}
              </div>

              <div className="bg-emerald-500/20 border border-emerald-400/30 rounded-lg p-4 mt-6">
                <p className="text-emerald-100 font-medium">
                  The demonstration highlights how our supercapacitors enable ultra-fast charging while the RC car is stationary at the dedicated charging station.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Highlight */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-blue-900 to-slate-900"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-400 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-400 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Graphene Cement Supercapacitors
          </h3>
          <p className="text-xl text-slate-200 leading-relaxed mb-8 max-w-3xl mx-auto">
            Our breakthrough technology combines the conductivity of graphene with the structural properties of cement to create supercapacitors with unprecedented energy density and charging speed.
          </p>
          <div className="inline-block bg-white/10 backdrop-blur-md border-2 border-emerald-400 px-8 py-3 rounded-full">
            <span className="text-white font-semibold text-lg">
              Charging the Future of Energy Storage
            </span>
          </div>
        </div>
      </section>

      {/* Technical Specifications */}
      <section id="specs" className={`py-20 transition-all duration-1000 ${
        visibleSections.has('specs') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              Technical Specifications
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-emerald-500 to-blue-500 mx-auto mb-6"></div>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Cutting-edge performance metrics of our supercapacitor technology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {specs.map((spec, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300 hover:shadow-xl"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="bg-gradient-to-r from-slate-800 to-blue-800 p-4 text-center">
                  <spec.icon className="w-8 h-8 text-white mx-auto mb-2" />
                  <h3 className="text-white font-semibold text-lg">{spec.label}</h3>
                </div>
                <div className="p-6 text-center">
                  <div className="text-3xl font-bold text-blue-800 mb-2">{spec.value}</div>
                  <p className="text-slate-600">{spec.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className={`py-20 bg-slate-50 transition-all duration-1000 ${
        visibleSections.has('contact') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              Contact & Expo Information
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-emerald-500 to-blue-500 mx-auto mb-6"></div>
            <p className="text-xl text-slate-600">
              Visit us at the Birmingham Battery System Expo 2025
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-slate-800 mb-4">
                Experience the Demo Live
              </h3>
              <p className="text-slate-600 text-lg">
                Visit our booth to see our wireless charging technology in action and interact with our RC car demonstration.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-emerald-500" />
                  <span className="text-slate-700">July 9-10, 2025</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-emerald-500" />
                  <span className="text-slate-700">Birmingham, UK - Booth #203</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Activity className="w-5 h-5 text-emerald-500" />
                  <span className="text-slate-700">Live RC car demonstrations every 30 minutes</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                  <h4 className="font-semibold text-emerald-800 mb-2">What to Expect:</h4>
                  <ul className="text-emerald-700 text-sm space-y-1">
                    <li>• Interactive RC car charging demo</li>
                    <li>• Phone charging station experience</li>
                    <li>• Technical presentations</li>
                    <li>• Meet the engineering team</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://www.imperial.ac.uk/news/257015/new-spinout-produce-2d-materials-sustainably/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-slate-800 to-blue-800 hover:from-slate-900 hover:to-blue-900 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 text-center flex items-center justify-center space-x-2"
              >
                <span>Request Information</span>
                <ExternalLink className="w-4 h-4" />
              </a>
              <button className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300">
                Schedule Meeting
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-slate-900 to-blue-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold">2D Nano</h3>
              </div>
              <p className="text-slate-300 leading-relaxed">
                Pioneering advanced energy storage solutions with graphene cement technology for a sustainable future.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                {['Overview', 'Live Demo', 'Technical Specs', 'Expo Info'].map((link) => (
                  <button
                    key={link}
                    onClick={() => scrollToSection(link.toLowerCase().replace(' ', '-'))}
                    className="block text-slate-300 hover:text-emerald-400 transition-colors duration-200"
                  >
                    {link}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Expo Details</h4>
              <div className="space-y-2 text-slate-300">
                <p>Birmingham Battery System Expo 2025</p>
                <p>July 9-10, 2025</p>
                <p>Birmingham, UK</p>
                <p className="text-emerald-400 font-semibold">Booth #203</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-slate-700 pt-8 text-center">
            <p className="text-slate-400">
              © 2025 2D Nano. All rights reserved. | Revolutionizing energy storage with graphene cement technology.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;