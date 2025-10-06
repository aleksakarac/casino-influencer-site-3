'use client';

import { motion } from 'framer-motion';

const placeholderGames = [
  { id: 1, title: 'Game Slot 1', tag: 'NEW', gradient: 'from-purple-600 to-blue-600' },
  { id: 2, title: 'Game Slot 2', tag: 'HOT', gradient: 'from-red-600 to-orange-600' },
  { id: 3, title: 'Game Slot 3', tag: 'EXCLUSIVE', gradient: 'from-green-600 to-teal-600' },
  { id: 4, title: 'Game Slot 4', tag: 'NEW', gradient: 'from-pink-600 to-purple-600' },
  { id: 5, title: 'Game Slot 5', tag: 'HOT', gradient: 'from-yellow-600 to-orange-600' },
  { id: 6, title: 'Game Slot 6', tag: 'EXCLUSIVE', gradient: 'from-indigo-600 to-blue-600' }
];

export default function GameCards() {
  return (
    <section className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-3 gap-6">
          {placeholderGames.map((game, index) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.03 }}
              className="relative group cursor-pointer"
            >
              {/* Card */}
              <div className="relative h-64 rounded-2xl overflow-hidden border border-amber-500/20 hover:border-amber-500/50 transition-all duration-300">
                {/* Gradient Background (placeholder) */}
                <div className={`absolute inset-0 bg-gradient-to-br ${game.gradient}`} />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300" />

                {/* Tag */}
                <div className="absolute top-4 right-4 px-3 py-1 bg-amber-500 text-black text-xs font-bold rounded-full">
                  {game.tag}
                </div>

                {/* Title */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent">
                  <h3 className="text-white text-xl font-bold">{game.title}</h3>
                  <p className="text-gray-300 text-sm mt-1">Phase 2: Bonus codes will appear here</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
