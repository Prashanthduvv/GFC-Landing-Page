import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaGift, FaTrophy, FaStar, FaMedal, FaCheckCircle, FaLock, 
  FaHeart, FaFire, FaGem, FaCrown, FaWallet, FaChartLine,
  FaCalendarCheck, FaUserFriends, FaUserCheck, FaRocket, FaAward, FaShare 
} from "react-icons/fa";

export default function RewardsDashboard({ userId }) {
  const [points, setPoints] = useState(0);
  const [achievements, setAchievements] = useState([]);
  const [showDashboard, setShowDashboard] = useState(false);
  const [claimedRewards, setClaimedRewards] = useState([]);
  const [pointsHistory, setPointsHistory] = useState([]);

  useEffect(() => {
    // Load data from localStorage
    const savedPoints = localStorage.getItem("gfc_points") || "0";
    const savedAchievements = JSON.parse(localStorage.getItem("gfc_achievements") || "[]");
    const savedClaimed = JSON.parse(localStorage.getItem("gfc_claimed_rewards") || "[]");
    const savedHistory = JSON.parse(localStorage.getItem("gfc_points_history") || "[]");
    
    setPoints(parseInt(savedPoints));
    setAchievements(savedAchievements);
    setClaimedRewards(savedClaimed);
    setPointsHistory(savedHistory);
  }, []);

  // Listen for reward events
  useEffect(() => {
    const handlePointsUpdate = () => {
      const updatedPoints = localStorage.getItem("gfc_points") || "0";
      setPoints(parseInt(updatedPoints));
    };
    
    window.addEventListener("pointsUpdated", handlePointsUpdate);
    window.addEventListener("openRewards", () => setShowDashboard(true));
    
    return () => {
      window.removeEventListener("pointsUpdated", handlePointsUpdate);
      window.removeEventListener("openRewards", () => setShowDashboard(true));
    };
  }, []);

  const availableRewards = [
    { id: 1, name: "Early Bird Badge", points: 100, icon: FaStar, color: "from-yellow-500 to-orange-500", description: "Be among the first supporters" },
    { id: 2, name: "Community Supporter", points: 250, icon: FaHeart, color: "from-pink-500 to-red-500", description: "Active community member" },
    { id: 3, name: "Fight Fanatic", points: 500, icon: FaTrophy, color: "from-purple-500 to-pink-500", description: "True fight enthusiast" },
    { id: 4, name: "Loyal Member", points: 1000, icon: FaMedal, color: "from-blue-500 to-cyan-500", description: "Long-term commitment" },
    { id: 5, name: "Legend Status", points: 2500, icon: FaCrown, color: "from-yellow-600 to-yellow-400", description: "Elite member status" },
    { id: 6, name: "Ultimate Champion", points: 5000, icon: FaGem, color: "from-red-600 to-purple-600", description: "Ultimate achievement" },
  ];

  const handleClaimReward = (reward) => {
    if (points >= reward.points && !claimedRewards.includes(reward.id)) {
      const newPoints = points - reward.points;
      setPoints(newPoints);
      localStorage.setItem("gfc_points", newPoints.toString());
      
      setClaimedRewards([...claimedRewards, reward.id]);
      localStorage.setItem("gfc_claimed_rewards", JSON.stringify([...claimedRewards, reward.id]));
      
      const newAchievement = {
        name: reward.name,
        date: new Date().toISOString(),
        points: reward.points,
        icon: reward.icon.name
      };
      
      const updatedAchievements = [...achievements, newAchievement];
      setAchievements(updatedAchievements);
      localStorage.setItem("gfc_achievements", JSON.stringify(updatedAchievements));
      
      // Dispatch event for notification
      window.dispatchEvent(new CustomEvent("rewardClaimed", { detail: reward }));
      
      // Dispatch points update event
      window.dispatchEvent(new CustomEvent("pointsUpdated"));
    }
  };

  const totalPointsEarned = pointsHistory.reduce((sum, h) => sum + h.points, 0) + points;
  const rank = points >= 5000 ? "Diamond" : points >= 2500 ? "Platinum" : points >= 1000 ? "Gold" : points >= 500 ? "Silver" : "Bronze";

  return (
    <>
      {/* Rewards Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowDashboard(true)}
        className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-full p-3 shadow-2xl hover:shadow-lg transition-all duration-300"
      >
        <FaGift size={22} />
        {points > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
            {points}
          </span>
        )}
      </motion.button>

      {/* Rewards Dashboard Modal */}
      <AnimatePresence>
        {showDashboard && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md" onClick={() => setShowDashboard(false)}>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-3xl w-full max-h-[85vh] overflow-y-auto bg-gradient-to-br from-zinc-900 to-black border border-red-900/30 rounded-2xl p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => setShowDashboard(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white transition text-2xl z-10">✕</button>
              
              {/* Header */}
              <div className="text-center mb-6">
                <h2 className="text-2xl sm:text-3xl font-black uppercase">Your Rewards</h2>
                <p className="text-gray-400 text-sm mt-1">Earn points, unlock achievements, get rewards</p>
              </div>
              
              {/* Points Card */}
              <div className="bg-gradient-to-r from-yellow-600 to-orange-600 rounded-xl p-5 text-center mb-6">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-white/80 text-sm">Your Rank</span>
                  <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold">{rank}</span>
                </div>
                <p className="text-5xl font-black text-white">{points}</p>
                <p className="text-white/80 text-sm mt-1">Total Points Earned: {totalPointsEarned}</p>
                <div className="mt-3 h-2 bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full bg-white rounded-full" style={{ width: `${(points / 5000) * 100}%` }} />
                </div>
              </div>
              
              {/* Available Rewards */}
              <h3 className="text-lg font-bold uppercase mb-3 flex items-center gap-2"><FaGift /> Available Rewards</h3>
              <div className="grid gap-3 mb-8">
                {availableRewards.map((reward) => {
                  const Icon = reward.icon;
                  const isClaimed = claimedRewards.includes(reward.id);
                  const canClaim = points >= reward.points && !isClaimed;
                  
                  return (
                    <div key={reward.id} className={`bg-white/5 border rounded-lg p-4 flex flex-col sm:flex-row items-center justify-between gap-4 transition-all duration-300 ${canClaim ? 'hover:border-red-600' : 'border-white/10'}`}>
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${reward.color} flex items-center justify-center`}>
                          <Icon className="text-white text-xl" />
                        </div>
                        <div>
                          <p className="font-semibold">{reward.name}</p>
                          <p className="text-gray-400 text-xs">{reward.description}</p>
                          <p className="text-yellow-500 text-xs">{reward.points} points required</p>
                        </div>
                      </div>
                      {isClaimed ? (
                        <span className="text-green-500 text-sm flex items-center gap-1"><FaCheckCircle /> Claimed</span>
                      ) : (
                        <button
                          onClick={() => handleClaimReward(reward)}
                          disabled={!canClaim}
                          className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                            canClaim 
                              ? "bg-red-600 hover:bg-red-700 cursor-pointer" 
                              : "bg-gray-600 cursor-not-allowed opacity-50"
                          }`}
                        >
                          Claim {reward.points} pts
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
              
              {/* Achievements */}
              <h3 className="text-lg font-bold uppercase mb-3 flex items-center gap-2"><FaTrophy /> Achievements</h3>
              {achievements.length === 0 ? (
                <div className="text-center py-8 bg-white/5 rounded-xl">
                  <FaTrophy className="text-gray-500 text-5xl mx-auto mb-3" />
                  <p className="text-gray-400">No achievements yet.</p>
                  <p className="text-gray-500 text-sm">Complete activities to earn badges!</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                  {achievements.map((achievement, index) => {
                    let IconComponent = FaTrophy;
                    if (achievement.name === "Early Bird Badge") IconComponent = FaStar;
                    if (achievement.name === "Community Supporter") IconComponent = FaHeart;
                    if (achievement.name === "Fight Fanatic") IconComponent = FaTrophy;
                    if (achievement.name === "Loyal Member") IconComponent = FaMedal;
                    if (achievement.name === "Legend Status") IconComponent = FaCrown;
                    if (achievement.name === "Ultimate Champion") IconComponent = FaGem;
                    
                    return (
                      <div key={index} className="bg-white/5 border border-white/10 rounded-lg p-3 text-center hover:border-yellow-500 transition">
                        <IconComponent className="text-yellow-500 text-2xl mx-auto mb-2" />
                        <p className="text-xs font-semibold">{achievement.name}</p>
                        <p className="text-gray-500 text-[10px]">{new Date(achievement.date).toLocaleDateString()}</p>
                      </div>
                    );
                  })}
                </div>
              )}
              
              {/* How to Earn Points */}
              <div className="mt-4 p-4 bg-red-600/10 border border-red-600/20 rounded-lg">
                <p className="text-red-400 text-xs font-semibold uppercase mb-2">💡 How to Earn Points</p>
                <div className="grid grid-cols-2 gap-2 text-xs text-gray-300">
                  <span className="flex items-center gap-1"><FaUserCheck /> Join Community (+100)</span>
                  <span className="flex items-center gap-1"><FaWallet /> Buy Tickets (+50)</span>
                  <span className="flex items-center gap-1"><FaShare /> Share Events (+25)</span>
                  <span className="flex items-center gap-1"><FaCalendarCheck /> Daily Login (+10)</span>
                  <span className="flex items-center gap-1"><FaUserFriends /> Refer Friends (+50)</span>
                  <span className="flex items-center gap-1"><FaHeart /> Community Activity (+5-20)</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}