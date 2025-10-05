import { Users, Code, Video, Zap, Star, Github, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/Button';

const features = [
  {
    icon: <Code className="w-6 h-6" />,
    title: "Real-time Collaboration",
    description: "Code together with live editing, voice, and video calls.",
  },
  {
    icon: <Video className="w-6 h-6" />,
    title: "Voice & Video Calls",
    description: "Communicate seamlessly while coding with built-in calls.",
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "AI-powered Assistance",
    description: "Get smart code suggestions and instant help while coding.",
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Multi-file Projects",
    description: "Work on complex projects with full file tree support.",
  },
];

const testimonials = [
  {
    text: "RN Live has transformed how our team collaborates on code. The real-time editing with voice calls is a game-changer.",
    author: "Sarah Chen",
    role: "Lead Developer",
    company: "TechCorp",
  },
  {
    text: "Finally, a platform where we can code together seamlessly. The AI assistance is incredibly helpful too.",
    author: "Mike Johnson",
    role: "Full Stack Developer",
    company: "StartupXYZ",
  },
  {
    text: "The video calls while coding feature saves us so much time. No more switching between tools.",
    author: "Emily Rodriguez",
    role: "Software Engineer",
    company: "DevStudio",
  },
];

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      {/* Header */}
      <header className="relative z-10 bg-gray-900/50 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded flex items-center justify-center">
                <span className="text-white text-sm font-bold">RN</span>
              </div>
              <span className="text-white text-xl font-semibold">RN Live</span>
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-gray-300 hover:text-white transition-colors">
                Features
              </a>
              <a href="#testimonials" className="text-gray-300 hover:text-white transition-colors">
                Testimonials
              </a>
              <a href="#pricing" className="text-gray-300 hover:text-white transition-colors">
                Pricing
              </a>
            </nav>
            <div className="flex items-center gap-4">
              <a href="/signin">
                <Button variant="ghost" className="text-white hover:bg-white/10">
                  Sign In
                </Button>
              </a>
              <a href="/signup">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  Get Started
                </Button>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
            Code Together in
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {' '}Real-Time
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Collaborate seamlessly with voice, video, and live code editing. Build amazing projects together with RN Live.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/playground">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg">
                Start Coding Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </a>
            <a href="https://github.com/your-repo" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="lg" className="border-gray-600 text-white hover:bg-white/10 px-8 py-4 text-lg">
                <Github className="w-5 h-5 mr-2" />
                View on GitHub
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4">
              Collaborate Like Never Before
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Experience seamless real-time collaboration with voice calls, video chat, live code editing, and instant previews.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700 hover:border-blue-500/50 transition-colors"
              >
                <div className="bg-blue-600/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4 text-blue-400">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4">
              Loved by Developers
            </h2>
            <p className="text-xl text-gray-300">See what developers are saying about RN Live</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700"
              >
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 mb-4 italic">"{testimonial.text}"</p>
                <div>
                  <p className="text-white font-semibold">{testimonial.author}</p>
                  <p className="text-gray-400 text-sm">
                    {testimonial.role} at {testimonial.company}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4">Simple Pricing</h2>
            <p className="text-xl text-gray-300">Choose the plan that fits your team</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free Plan */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-8 border border-gray-700">
              <h3 className="text-2xl font-bold text-white mb-2">Free</h3>
              <p className="text-gray-300 mb-6">Perfect for personal projects</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-white">$0</span>
                <span className="text-gray-300">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="text-gray-300 flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  Up to 3 collaborators
                </li>
                <li className="text-gray-300 flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  Basic voice calls
                </li>
                <li className="text-gray-300 flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  Public projects
                </li>
              </ul>
              <Button className="w-full bg-gray-700 hover:bg-gray-600 text-white">
                Get Started
              </Button>
            </div>

            {/* Pro Plan */}
            <div className="bg-gradient-to-b from-blue-600/20 to-purple-600/20 rounded-lg p-8 border border-blue-500/50 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Pro</h3>
              <p className="text-gray-300 mb-6">For professional teams</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-white">$20</span>
                <span className="text-gray-300">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="text-gray-300 flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  Unlimited collaborators
                </li>
                <li className="text-gray-300 flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  HD video calls
                </li>
                <li className="text-gray-300 flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  Private projects
                </li>
                <li className="text-gray-300 flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  Advanced AI features
                </li>
              </ul>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                Start Free Trial
              </Button>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-8 border border-gray-700">
              <h3 className="text-2xl font-bold text-white mb-2">Enterprise</h3>
              <p className="text-gray-300 mb-6">For large organizations</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-white">Custom</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="text-gray-300 flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  Everything in Pro
                </li>
                <li className="text-gray-300 flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  SSO & SAML
                </li>
                <li className="text-gray-300 flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  Dedicated support
                </li>
                <li className="text-gray-300 flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  Custom integrations
                </li>
              </ul>
              <Button variant="outline" className="w-full border-gray-600 text-white hover:bg-white/10">
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
            Start Collaborating Today
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of developers who build amazing projects together with real-time collaboration.
          </p>
          <a href="/playground">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg">
              Get Started for Free
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded flex items-center justify-center">
                  <span className="text-white text-sm font-bold">RN</span>
                </div>
                <span className="text-white text-xl font-semibold">RN Live</span>
              </div>
              <p className="text-gray-400">
                Real-time collaborative coding platform with voice and video calls.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#features" className="text-gray-400 hover:text-white transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="text-gray-400 hover:text-white transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="/playground" className="text-gray-400 hover:text-white transition-colors">
                    Playground
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">© 2025 RN Live. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
