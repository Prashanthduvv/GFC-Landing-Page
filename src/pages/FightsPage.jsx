import TicketModal from "../components/TicketModal";
import { useTicketModal } from "../hooks/useTicketModal";

export default function FightsPage() {
  const { isOpen: isTicketModalOpen, closeModal: closeTicketModal } = useTicketModal();

  return (
    <>
      <TicketModal isOpen={isTicketModalOpen} onClose={closeTicketModal} />
      
      <div className="bg-black text-white min-h-screen font-sans overflow-x-hidden">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center px-6 py-24 border-b border-red-900/30">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(220,38,38,0.25),transparent_45%)]"></div>
          <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=1974&auto=format&fit=crop')] bg-cover bg-center"></div>

          <div className="relative z-10 max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block px-4 py-2 border border-red-700 rounded-full text-sm tracking-widest uppercase mb-6 text-red-400">
                Founding Community Applications Open
              </div>
              <h1 className="text-5xl md:text-7xl font-black leading-none tracking-tight uppercase">
                India <span className="text-red-600">Becomes</span><br />The Stage.
              </h1>
              <p className="mt-8 text-lg md:text-xl text-gray-300 leading-relaxed max-w-xl">
                Become part of the founding GFC Community — a movement built around combat sports, premium experiences, real stories, and the future of fighting culture in India.
              </p>
              <div className="flex flex-wrap gap-4 mt-10">
                <button onClick={() => window.dispatchEvent(new CustomEvent("openTicketModal"))} className="bg-red-600 hover:bg-red-700 transition-all px-8 py-4 rounded-2xl text-lg font-bold shadow-2xl shadow-red-900/40">
                  APPLY TO JOIN
                </button>
                <button className="border border-gray-600 hover:border-red-500 hover:text-red-400 transition-all px-8 py-4 rounded-2xl text-lg font-semibold">
                  Explore GFC
                </button>
              </div>
              <div className="mt-10 flex flex-wrap gap-6 text-sm text-gray-400 uppercase tracking-widest">
                <span>Fights</span><span>Stories</span><span>Legacy</span>
              </div>
            </div>

            <div className="relative flex justify-center">
              <div className="absolute inset-0 bg-red-600 blur-3xl opacity-20 rounded-full"></div>
              <div className="relative bg-gradient-to-b from-red-900/30 to-black border border-red-900/30 rounded-[32px] p-8 backdrop-blur-sm shadow-2xl shadow-red-900/20">
                <img src="https://images.unsplash.com/photo-1517438984742-1262db08379e?q=80&w=1974&auto=format&fit=crop" alt="MMA Cage" className="rounded-2xl object-cover h-[500px] w-full" />
              </div>
            </div>
          </div>
        </section>

        {/* Intro Section */}
        <section className="max-w-6xl mx-auto px-6 py-24">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-red-500 uppercase tracking-[0.3em] text-sm mb-4">More Than Fans</p>
              <h2 className="text-4xl md:text-5xl font-black uppercase leading-tight">We're Building <br />A Movement.</h2>
            </div>
            <div>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">GFC (GlobaX Fighting Championship) is a next-generation combat sports platform focused on fighters, storytelling, entertainment, and community-driven growth.</p>
              <p className="text-gray-400 text-lg leading-relaxed">The GFC Community is the foundation behind this movement — a network of ambitious individuals, fight enthusiasts, creators, professionals, entrepreneurs, and supporters who want to be part of something meaningful from the beginning.</p>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="bg-zinc-950 border-y border-red-900/20 py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-red-500 uppercase tracking-[0.3em] text-sm mb-4">Why Join</p>
              <h2 className="text-4xl md:text-6xl font-black uppercase">Founding Member Benefits</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: 'Exclusive Events', desc: 'Access private networking gatherings, community launches, and premium GFC experiences.' },
                { title: 'VIP Opportunities', desc: 'Priority access to selected GFC shows, launches, and future live experiences.' },
                { title: 'Insider Access', desc: 'Get behind-the-scenes updates, early announcements, and exclusive reveals.' },
                { title: 'Community & Networking', desc: 'Connect with entrepreneurs, creators, professionals, and fight enthusiasts.' },
                { title: 'Be Part of the Growth', desc: 'Help shape a long-term sports platform from the ground level.' },
                { title: 'Recognition', desc: 'Become part of the founding circle before large-scale expansion begins.' },
              ].map((item, idx) => (
                <div key={idx} className="bg-black border border-zinc-800 hover:border-red-700 transition-all rounded-3xl p-8">
                  <div className="h-14 w-14 rounded-2xl bg-red-600/10 border border-red-600/20 flex items-center justify-center text-red-500 text-2xl font-black mb-6">{idx + 1}</div>
                  <h3 className="text-2xl font-bold mb-4 uppercase">{item.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Who This Is For */}
        <section className="max-w-6xl mx-auto px-6 py-24">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-red-500 uppercase tracking-[0.3em] text-sm mb-4">Built For</p>
              <h2 className="text-4xl md:text-5xl font-black uppercase leading-tight mb-8">The People Who <br />Want To Build Early.</h2>
              <p className="text-gray-400 text-lg leading-relaxed">Whether you're a sports enthusiast, entrepreneur, creator, working professional, student, marketer, or simply someone who believes India deserves world-class combat sports platforms — there is a place for you inside the GFC Community.</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {['Fight Enthusiasts', 'Entrepreneurs', 'Creators', 'Students', 'Sports Lovers', 'Professionals', 'Marketers', 'Early Supporters'].map((item, idx) => (
                <div key={idx} className="border border-zinc-800 hover:border-red-700 transition-all rounded-2xl p-6 text-center bg-zinc-950">
                  <span className="font-semibold text-lg">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Community Vision */}
        <section className="relative py-28 px-6 bg-gradient-to-b from-black to-zinc-950 border-y border-red-900/20 overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=1974&auto=format&fit=crop')] bg-cover bg-center"></div>
          <div className="relative max-w-5xl mx-auto text-center">
            <p className="text-red-500 uppercase tracking-[0.3em] text-sm mb-4">Community Vision</p>
            <h2 className="text-5xl md:text-7xl font-black uppercase leading-none mb-10">One Community. <br />Many Cities. <br /><span className="text-red-600">One Movement.</span></h2>
            <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">The GFC Community is designed to expand across India through local chapters, networking circles, live experiences, and community-led engagement.</p>
          </div>
        </section>

        {/* Membership */}
        <section className="max-w-6xl mx-auto px-6 py-24">
          <div className="bg-zinc-950 border border-red-900/30 rounded-[40px] p-10 md:p-16 text-center shadow-2xl shadow-red-900/10">
            <p className="text-red-500 uppercase tracking-[0.3em] text-sm mb-4">Founding Membership</p>
            <h2 className="text-5xl md:text-7xl font-black uppercase mb-6">₹5,000</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">Become part of the founding GFC Community and gain early access to premium experiences, networking opportunities, insider updates, and future GFC initiatives.</p>
            <div className="grid md:grid-cols-3 gap-6 text-left mb-12">
              {[
                'Official GFC WhatsApp Community Access',
                'Exclusive Community Event Invitations',
                'VIP Opportunities For Future Experiences',
                'Behind-The-Scenes Updates & Announcements',
                'Networking & Collaboration Opportunities',
                'Founding Member Recognition',
              ].map((item, idx) => (
                <div key={idx} className="border border-zinc-800 rounded-2xl p-5 bg-black">
                  <span className="text-gray-200">• {item}</span>
                </div>
              ))}
            </div>
            <button onClick={() => window.dispatchEvent(new CustomEvent("openTicketModal"))} className="bg-red-600 hover:bg-red-700 transition-all px-10 py-5 rounded-2xl text-xl font-black shadow-2xl shadow-red-900/40 uppercase tracking-wide">
              Apply To Join The Community
            </button>
            <p className="mt-6 text-gray-500 text-sm uppercase tracking-widest">Limited Founding Membership Intake</p>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-zinc-800 py-12 px-6 text-center bg-black">
          <h3 className="text-3xl md:text-5xl font-black uppercase mb-4">GFC</h3>
          <p className="text-gray-400 text-lg mb-4">GlobaX Fighting Championship</p>
          <p className="text-red-500 uppercase tracking-[0.3em] text-sm mb-8">Fights • Stories • Legacy</p>
          <div className="flex justify-center gap-8 text-gray-500 text-sm uppercase tracking-widest flex-wrap">
            <span>@GFCGlobal</span><span>Instagram</span><span>YouTube</span><span>WhatsApp Community</span>
          </div>
        </footer>
      </div>
    </>
  );
}