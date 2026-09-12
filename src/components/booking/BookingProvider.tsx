'use client';

import { createContext, useContext, useReducer, useCallback, useState, type ReactNode } from 'react';

// ─── Types ───
export interface BookingState {
  isOpen: boolean;
  step: 1 | 2 | 3 | 4;
  selectedServices: string[];
  date: string | null;
  time: string | null;
  name: string;
  phone: string;
  email: string;
  address: string;
  notes: string;
  bookingReference: string | null;
  emailWarning: string | null;
  submissionError: string | null;
}

type BookingAction =
  | { type: 'OPEN'; payload?: string }
  | { type: 'CLOSE' }
  | { type: 'SET_STEP'; payload: 1 | 2 | 3 | 4 }
  | { type: 'TOGGLE_SERVICE'; payload: string }
  | { type: 'SET_DATE'; payload: string }
  | { type: 'SET_TIME'; payload: string }
  | { type: 'SET_FIELD'; payload: { field: keyof BookingState; value: string } }
  | { type: 'SET_BOOKING_RESULT'; payload: { bookingReference: string; emailWarning: string | null } }
  | { type: 'SET_SUBMISSION_ERROR'; payload: string | null }
  | { type: 'RESET' };

interface BookingContextValue {
  state: BookingState;
  dispatch: React.Dispatch<BookingAction>;
  openBooking: (serviceSlug?: string) => void;
  closeBooking: () => void;
  nextStep: () => void;
  prevStep: () => void;
  isWhatsAppOpen: boolean;
  openWhatsApp: () => void;
  closeWhatsApp: () => void;
}

// ─── Initial State ───
const initialState: BookingState = {
  isOpen: false,
  step: 1,
  selectedServices: [],
  date: null,
  time: null,
  name: '',
  phone: '',
  email: '',
  address: '',
  notes: '',
  bookingReference: null,
  emailWarning: null,
  submissionError: null,
};

// ─── Reducer ───
function bookingReducer(state: BookingState, action: BookingAction): BookingState {
  switch (action.type) {
    case 'OPEN':
      return {
        ...initialState,
        isOpen: true,
        step: 1,
        selectedServices: action.payload ? [action.payload] : [],
      };
    case 'CLOSE':
      return { ...state, isOpen: false };
    case 'SET_STEP':
      return { ...state, step: action.payload };
    case 'TOGGLE_SERVICE': {
      const exists = state.selectedServices.includes(action.payload);
      return {
        ...state,
        selectedServices: exists
          ? state.selectedServices.filter(s => s !== action.payload)
          : [...state.selectedServices, action.payload],
      };
    }
    case 'SET_DATE':
      return { ...state, date: action.payload };
    case 'SET_TIME':
      return { ...state, time: action.payload };
    case 'SET_FIELD':
      return { ...state, [action.payload.field]: action.payload.value };
    case 'SET_BOOKING_RESULT':
      return {
        ...state,
        bookingReference: action.payload.bookingReference,
        emailWarning: action.payload.emailWarning,
        submissionError: null,
      };
    case 'SET_SUBMISSION_ERROR':
      return { ...state, submissionError: action.payload };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

// ─── Context ───
const BookingContext = createContext<BookingContextValue | undefined>(undefined);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(bookingReducer, initialState);
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);

  const openBooking = useCallback((serviceSlug?: string) => {
    dispatch({ type: 'OPEN', payload: serviceSlug });
  }, []);

  const closeBooking = useCallback(() => {
    dispatch({ type: 'CLOSE' });
  }, []);

  const nextStep = useCallback(() => {
    if (state.step < 4) {
      dispatch({ type: 'SET_STEP', payload: (state.step + 1) as 1 | 2 | 3 | 4 });
    }
  }, [state.step]);

  const prevStep = useCallback(() => {
    if (state.step > 1) {
      dispatch({ type: 'SET_STEP', payload: (state.step - 1) as 1 | 2 | 3 | 4 });
    }
  }, [state.step]);

  const openWhatsApp = useCallback(() => {
    setIsWhatsAppOpen(true);
  }, []);

  const closeWhatsApp = useCallback(() => {
    setIsWhatsAppOpen(false);
  }, []);

  return (
    <BookingContext.Provider
      value={{
        state,
        dispatch,
        openBooking,
        closeBooking,
        nextStep,
        prevStep,
        isWhatsAppOpen,
        openWhatsApp,
        closeWhatsApp,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) throw new Error('useBooking must be used within BookingProvider');
  return context;
}
