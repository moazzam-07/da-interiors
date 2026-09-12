'use client';

import { motion } from 'framer-motion';
import { useBooking } from '../BookingProvider';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';

const timeSlots = [
  { time: '09:00 AM', period: 'Morning' },
  { time: '11:00 AM', period: 'Morning' },
  { time: '01:00 PM', period: 'Afternoon' },
  { time: '03:00 PM', period: 'Afternoon' },
  { time: '05:00 PM', period: 'Evening' },
  { time: '07:00 PM', period: 'Evening' },
];

function getNext7Days() {
  const days = [];
  const today = new Date();
  let offset = 1;
  while (days.length < 7) {
    const d = new Date(today);
    d.setDate(today.getDate() + offset);
    if (d.getDay() !== 5) { // Skip Fridays (5)
      days.push({
        date: d.toISOString().split('T')[0],
        dayName: d.toLocaleDateString('en', { weekday: 'short' }),
        dayNum: d.getDate(),
        month: d.toLocaleDateString('en', { month: 'short' }),
      });
    }
    offset++;
  }
  return days;
}

export function StepSchedule() {
  const { state, dispatch, nextStep, prevStep } = useBooking();
  const days = getNext7Days();

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ type: 'spring', stiffness: 120, damping: 20 }}
      className="flex flex-col h-full"
    >
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-heading font-extrabold tracking-tight text-foreground">
          When works for you?
        </h2>
        <p className="text-muted-foreground mt-2 text-sm">
          Pick a slot. We operate Saturday–Thursday, 9:00 AM – 9:00 PM (Fridays closed).
        </p>
      </div>

      {/* Date Selection */}
      <div className="mb-8">
        <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3 flex items-center gap-2">
          <Calendar className="w-3.5 h-3.5" />
          Select Date
        </label>
        <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
          {days.map((day, i) => (
            <motion.button
              key={day.date}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              onClick={() => dispatch({ type: 'SET_DATE', payload: day.date })}
              className={`flex flex-col items-center py-3 px-1 rounded-2xl border transition-all duration-300 cursor-pointer active:scale-[0.95] ${
                state.date === day.date
                  ? 'border-primary bg-primary text-white shadow-lg shadow-primary/25'
                  : 'border-border/40 bg-card hover:border-primary/30 text-foreground'
              }`}
            >
              <span className={`text-[10px] font-bold uppercase ${state.date === day.date ? 'text-white/70' : 'text-muted-foreground'}`}>
                {day.dayName}
              </span>
              <span className="text-lg font-heading font-extrabold">{day.dayNum}</span>
              <span className={`text-[10px] ${state.date === day.date ? 'text-white/60' : 'text-muted-foreground'}`}>
                {day.month}
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Time Selection */}
      <div className="flex-1">
        <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3 flex items-center gap-2">
          <Clock className="w-3.5 h-3.5" />
          Select Time
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {timeSlots.map((slot, i) => (
            <motion.button
              key={slot.time}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.04 }}
              onClick={() => dispatch({ type: 'SET_TIME', payload: slot.time })}
              className={`py-3.5 px-3 rounded-xl border text-center transition-all duration-300 cursor-pointer active:scale-[0.96] ${
                state.time === slot.time
                  ? 'border-primary bg-primary/10 text-primary shadow-md shadow-primary/10 ring-1 ring-primary/30'
                  : 'border-border/40 bg-card hover:border-primary/30 text-foreground'
              }`}
            >
              <div className="text-sm font-bold">{slot.time}</div>
              <div className={`text-[10px] mt-0.5 ${state.time === slot.time ? 'text-primary/70' : 'text-muted-foreground'}`}>
                {slot.period}
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="mt-8 pt-6 border-t border-border/30 flex gap-3">
        <button
          onClick={prevStep}
          className="flex items-center gap-2 px-6 py-4 rounded-full border border-border/50 text-muted-foreground font-semibold text-sm hover:border-primary/30 hover:text-foreground transition-all active:scale-[0.98]"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        <button
          disabled={!state.date || !state.time}
          onClick={nextStep}
          className="flex-1 bg-gradient-to-r from-primary to-accent text-white py-4 rounded-full font-bold text-base shadow-xl shadow-primary/20 hover:shadow-primary/35 hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          Continue
        </button>
      </div>
    </motion.div>
  );
}
