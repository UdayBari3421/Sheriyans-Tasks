import { useState, useEffect } from "react";

const GreetCard = () => {
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const updateGreeting = () => {
      const hour = new Date().getHours();
      if (hour >= 5 && hour < 12) {
        setGreeting("GOOD MORNING ☕");
      } else if (hour >= 12 && hour < 17) {
        setGreeting("GOOD AFTERNOON 👋");
      } else if (hour >= 17 && hour < 21) {
        setGreeting("GOOD EVENING ✨");
      } else {
        setGreeting("GOOD NIGHT 💤");
      }
    };
    updateGreeting();
    const interval = setInterval(updateGreeting, 60000);
    return () => clearInterval(interval);
  }, []);

  return <>{greeting}</>;
};

export default GreetCard;
