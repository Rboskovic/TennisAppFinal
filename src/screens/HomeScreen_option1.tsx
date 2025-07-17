        {/* Quick Stats - Monochromatic emerald theme */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {/* Matches */}
          <div className="relative overflow-hidden bg-gradient-to-br from-emerald-400/20 to-emerald-500/15 backdrop-blur-sm rounded-2xl p-3.5 border border-white/10">
            <div className="relative z-10">
              <span className="text-[11px] text-white/60 font-medium block mb-1">Ovaj mesec</span>
              <p className="text-2xl font-bold">12</p>
              <p className="text-xs text-white/80">Mečeva</p>
            </div>
            <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-emerald-400/10 rounded-full blur-xl"></div>
          </div>
          
          {/* Tournaments */}
          <button 
            onClick={() => navigate("/turniri")}
            className="relative overflow-hidden bg-gradient-to-br from-teal-400/20 to-emerald-400/15 backdrop-blur-sm rounded-2xl p-3.5 border border-white/10 hover:bg-white/15 transition-colors text-left"
          >
            <div className="relative z-10">
              <span className="text-[11px] text-white/60 font-medium block mb-1">Aktivno</span>
              <p className="text-2xl font-bold">3</p>
              <p className="text-xs text-white/80">Turniri</p>
            </div>
            <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-teal-400/10 rounded-full blur-xl"></div>
          </button>
          
          {/* Rank */}
          <div className="relative overflow-hidden bg-gradient-to-br from-green-400/20 to-emerald-400/15 backdrop-blur-sm rounded-2xl p-3.5 border border-white/10">
            <div className="relative z-10">
              <span className="text-[11px] text-white/60 font-medium block mb-1">Rank</span>
              <p className="text-2xl font-bold">#47</p>
              <p className="text-xs text-white/80">Beograd</p>
            </div>
            <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-green-400/10 rounded-full blur-xl"></div>
          </div>
        </div>
