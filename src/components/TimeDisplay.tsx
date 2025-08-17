import React, { useState, useEffect } from 'react';
import { Clock, Calendar } from 'lucide-react';

export function TimeDisplay() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="flex items-center gap-4 text-sm text-muted-foreground">
      <div className="flex items-center gap-2">
        <Clock className="h-4 w-4" />
        <span className="font-mono">{formatTime(time)}</span>
      </div>
      <div className="flex items-center gap-2">
        <Calendar className="h-4 w-4" />
        <span>{formatDate(time)}</span>
      </div>
    </div>
  );
}