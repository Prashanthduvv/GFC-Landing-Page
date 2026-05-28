import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaUserPlus, FaGift, FaTrophy, FaCheckCircle, FaTimes, FaBell, 
  FaFire, FaStar, FaHeart, FaGem, FaCrown, FaWallet, FaChartLine,
  FaCalendarCheck, FaUserCheck, FaRocket, FaMedal, FaAward ,FaArrowUp 
} from "react-icons/fa";

// Notification Types Configuration
const notificationTypes = {
  WELCOME: {
    icon: FaHeart,
    color: "from-pink-500 to-red-500",
    sound: "welcome",
    duration: 6000
  },
  NEW_MEMBER: {
    icon: FaUserPlus,
    color: "from-green-500 to-emerald-500",
    sound: "new-member",
    duration: 5000
  },
  REWARD: {
    icon: FaGift,
    color: "from-yellow-500 to-orange-500",
    sound: "reward",
    duration: 6000
  },
  ACHIEVEMENT: {
    icon: FaTrophy,
    color: "from-purple-500 to-pink-500",
    sound: "achievement",
    duration: 5000
  },
  MILESTONE: {
    icon: FaFire,
    color: "from-red-600 to-red-500",
    sound: "milestone",
    duration: 4000
  },
  PURCHASE: {
    icon: FaWallet,
    color: "from-green-500 to-teal-500",
    sound: "purchase",
    duration: 5000
  },
  EVENT: {
    icon: FaCalendarCheck,
    color: "from-blue-500 to-cyan-500",
    sound: "event",
    duration: 6000
  },
  CANCELLATION: {
    icon: FaTimes,
    color: "from-gray-600 to-gray-500",
    sound: "cancel",
    duration: 7000
  }
};

// Individual Notification Component
function RealTimeNotification({ notification, onClose }) {
  const TypeIcon = notificationTypes[notification.type]?.icon || FaBell;
  const gradientClass = notificationTypes[notification.type]?.color || "from-blue-500 to-cyan-500";
  
  // Play sound effect (optional)
  const playSound = () => {
    // You can add actual sound files here
    console.log(`[Sound] ${notification.type} notification`);
  };

  useEffect(() => {
    playSound();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: 100, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 100, scale: 0.9 }}
      className="fixed top-20 right-4 z-50 w-80 sm:w-96"
    >
      <div className={`bg-gradient-to-r ${gradientClass} rounded-lg shadow-2xl overflow-hidden border border-white/20`}>
        <div className="p-4 flex items-start gap-3">
          {/* Icon */}
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
            <TypeIcon className="text-white text-lg" />
          </div>
          
          {/* Content */}
          <div className="flex-1">
            <p className="text-white text-sm font-semibold">{notification.title}</p>
            <p className="text-white/90 text-xs mt-1">{notification.message}</p>
            {notification.extra && (
              <p className="text-white/70 text-[10px] mt-1">{notification.extra}</p>
            )}
            {notification.action && (
              <button 
                onClick={() => {
                  if (notification.onAction) notification.onAction();
                  onClose();
                }}
                className="mt-2 text-white/80 hover:text-white text-xs font-semibold underline"
              >
                {notification.action}
              </button>
            )}
          </div>
          
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="text-white/70 hover:text-white transition"
          >
            <FaTimes size={12} />
          </button>
        </div>
        
        {/* Progress Bar */}
        <div className="h-0.5 bg-white/30">
          <motion.div 
            className="h-full bg-white"
            initial={{ width: "100%" }}
            animate={{ width: "0%" }}
            transition={{ duration: notification.duration / 1000, ease: "linear" }}
          />
        </div>
      </div>
    </motion.div>
  );
}

// Main Component
export default function RealTimeNotifications({ userId }) {
  const [notifications, setNotifications] = useState([]);
  const [memberCount, setMemberCount] = useState(5234);
  const [totalPoints, setTotalPoints] = useState(0);
  const [activeUsers, setActiveUsers] = useState(234);

  // Load user stats from localStorage
  useEffect(() => {
    const savedPoints = localStorage.getItem("gfc_points") || "0";
    setTotalPoints(parseInt(savedPoints));
  }, []);

  // Add notification helper
  const addNotification = (notification) => {
    const id = Date.now();
    const newNotification = { ...notification, id, duration: notification.duration || 5000 };
    setNotifications(prev => [newNotification, ...prev].slice(0, 8));
    
    // Auto remove after duration
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, newNotification.duration);
  };

  // Show welcome message on first visit
  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem("gfc_welcome_seen");
    if (!hasSeenWelcome && userId) {
      setTimeout(() => {
        addNotification({
          type: "WELCOME",
          title: "🎉 Welcome to GFC Community!",
          message: `Thank you for joining ${memberCount.toLocaleString()}+ members in India's combat sports revolution.`,
          extra: "✨ You've received 100 bonus points!",
          action: "Explore Community →",
          onAction: () => window.location.href = "/join-community",
          duration: 8000
        });
        localStorage.setItem("gfc_welcome_seen", "true");
        
        // Add welcome points
        const currentPoints = parseInt(localStorage.getItem("gfc_points") || "0");
        const newPoints = currentPoints + 100;
        localStorage.setItem("gfc_points", newPoints.toString());
        setTotalPoints(newPoints);
        
        // Track new member
        trackMemberJoin();
      }, 1000);
    }
  }, [userId]);

  // Track new member join
  const trackMemberJoin = () => {
    const totalMembers = parseInt(localStorage.getItem("gfc_total_members") || "5234");
    const newCount = totalMembers + 1;
    localStorage.setItem("gfc_total_members", newCount.toString());
    setMemberCount(newCount);
    
    // Update display
    const memberElement = document.getElementById("live-member-count");
    if (memberElement) memberElement.textContent = newCount.toLocaleString();
  };

  // Simulate real-time member joins (every 30-60 seconds)
  useEffect(() => {
    const memberInterval = setInterval(() => {
      const names = ["Rahul S.", "Priya M.", "Arjun K.", "Meera D.", "Vikram R.", 
                     "Anjali P.", "Zayn A.", "Karan B.", "Neha S.", "Rohit G."];
      const randomName = names[Math.floor(Math.random() * names.length)];
      const newCount = memberCount + 1;
      setMemberCount(newCount);
      localStorage.setItem("gfc_total_members", newCount.toString());
      
      addNotification({
        type: "NEW_MEMBER",
        title: "🌟 New Member Joined!",
        message: `${randomName} just joined the GFC Community!`,
        extra: `🎉 Now ${newCount.toLocaleString()} members strong! Welcome ${randomName}!`,
        duration: 5000
      });
      
      // Update live counter
      const memberElement = document.getElementById("live-member-count");
      if (memberElement) {
        memberElement.classList.add("animate-pulse");
        setTimeout(() => memberElement.classList.remove("animate-pulse"), 500);
      }
    }, 45000); // Every 45 seconds
    
    return () => clearInterval(memberInterval);
  }, [memberCount]);

  // Generate random rewards for active users
  useEffect(() => {
    const rewardInterval = setInterval(() => {
      const rewards = [
        { name: "Early Bird Badge", points: 50, icon: FaStar, message: "You're an early supporter!" },
        { name: "Community Supporter", points: 100, icon: FaHeart, message: "Thanks for being active!" },
        { name: "Fight Fanatic", points: 150, icon: FaTrophy, message: "Your passion for fights is amazing!" },
        { name: "Loyal Member", points: 200, icon: FaMedal, message: "Loyalty pays off!" },
        { name: "Social Sharer", points: 75, icon: FaRocket, message: "Thanks for sharing GFC!" },
        { name: "Event Attendee", points: 125, icon: FaCalendarCheck, message: "Ready for the next event?" }
      ];
      
      // 25% chance to get a reward
      if (Math.random() > 0.75) {
        const randomReward = rewards[Math.floor(Math.random() * rewards.length)];
        const currentPoints = parseInt(localStorage.getItem("gfc_points") || "0");
        const newPoints = currentPoints + randomReward.points;
        localStorage.setItem("gfc_points", newPoints.toString());
        setTotalPoints(newPoints);
        
        addNotification({
          type: "REWARD",
          title: "🎁 Reward Unlocked!",
          message: `You've earned "${randomReward.name}"!`,
          extra: `+${randomReward.points} points • ${randomReward.message}`,
          action: "View My Rewards →",
          onAction: () => {
            const event = new CustomEvent("openRewards");
            window.dispatchEvent(event);
          },
          duration: 6000
        });
        
        // Save achievement
        const achievements = JSON.parse(localStorage.getItem("gfc_achievements") || "[]");
        if (!achievements.some(a => a.name === randomReward.name)) {
          achievements.push({
            name: randomReward.name,
            date: new Date().toISOString(),
            points: randomReward.points
          });
          localStorage.setItem("gfc_achievements", JSON.stringify(achievements));
        }
      }
    }, 60000); // Every 60 seconds
    
    return () => clearInterval(rewardInterval);
  }, []);

  // Community milestone notifications
  useEffect(() => {
    const milestones = [5500, 6000, 7500, 10000, 15000];
    
    const checkMilestone = () => {
      const currentCount = memberCount;
      if (milestones.includes(currentCount)) {
        addNotification({
          type: "MILESTONE",
          title: "🏆 Community Milestone Achieved!",
          message: `We've reached ${currentCount.toLocaleString()} members!`,
          extra: "Thank you for being part of this incredible journey!",
          action: "Celebrate →",
          duration: 8000
        });
      }
    };
    
    const milestoneInterval = setInterval(checkMilestone, 10000);
    return () => clearInterval(milestoneInterval);
  }, [memberCount]);

  // Handle cancellation flow
  const handleCancellation = () => {
    addNotification({
      type: "CANCELLATION",
      title: "💔 We Hate to See You Go!",
      message: "Your membership has been cancelled.",
      extra: "Please share your feedback to help us improve.",
      action: "Share Feedback →",
      onAction: () => {
        window.open("https://forms.gle/feedback", "_blank");
      },
      duration: 8000
    });
    
    // Track cancellation analytics
    const cancellations = JSON.parse(localStorage.getItem("gfc_cancellations") || "[]");
    cancellations.push({ date: new Date().toISOString(), userId });
    localStorage.setItem("gfc_cancellations", JSON.stringify(cancellations));
  };

  // Event reminder notifications
  useEffect(() => {
    const eventDate = new Date("2026-06-30T18:00:00");
    const now = new Date();
    const daysUntil = Math.ceil((eventDate - now) / (1000 * 60 * 60 * 24));
    
    if (daysUntil === 30 || daysUntil === 14 || daysUntil === 7 || daysUntil === 1) {
      addNotification({
        type: "EVENT",
        title: "📅 Event Reminder!",
        message: `GFC Global 1: Origin is in ${daysUntil} days!`,
        extra: "Don't miss the biggest combat sports event in India.",
        action: "Book Tickets →",
        onAction: () => {
          window.dispatchEvent(new CustomEvent("openTicketModal"));
        },
        duration: 7000
      });
    }
  }, []);

  // Track user activity for points
  useEffect(() => {
    const trackActivity = () => {
      const lastActivity = localStorage.getItem("last_activity_date");
      const today = new Date().toDateString();
      
      if (lastActivity !== today) {
        const currentPoints = parseInt(localStorage.getItem("gfc_points") || "0");
        localStorage.setItem("gfc_points", (currentPoints + 10).toString());
        localStorage.setItem("last_activity_date", today);
        setTotalPoints(currentPoints + 10);
        
        addNotification({
          type: "REWARD",
          title: "Daily Login Bonus!",
          message: "You've earned 10 points for checking in today!",
          extra: "Keep the streak going! 🔥",
          duration: 4000
        });
      }
    };
    
    trackActivity();
    const activityInterval = setInterval(trackActivity, 86400000); // Once per day
    return () => clearInterval(activityInterval);
  }, []);

  return (
    <>
      {/* Notifications Container */}
      <AnimatePresence>
        {notifications.map(notification => (
          <RealTimeNotification
            key={notification.id}
            notification={notification}
            onClose={() => setNotifications(prev => prev.filter(n => n.id !== notification.id))}
          />
        ))}
      </AnimatePresence>
      
      {/* Hidden data for tracking */}
      <div className="hidden" data-live-member-count={memberCount} />
    </>
  );
}