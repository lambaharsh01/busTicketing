// Context in React is like a way to share information between components without having to pass that information down through every level of your component tree (like a family tree).
// Using Context is Like a Central Librarian:
// Instead of carrying books around, you have a central librarian (context) that holds the information.
// Any section of the library can just ask the librarian for a book without having to pass it along from one section to another.

import { createContext, useState, ReactNode } from "react";
import { busContextInterface } from "../constants/interfaces";
// createContext: A function that creates a new context.
// A type representing any valid React element (like a component, string, or number). //When using React with TypeScript, it's important to define types for your components and props to ensure type safety and help with code readability.

export const BusContext = createContext<busContextInterface | undefined>(
  undefined
); //This line creates a new context called BusContext. //type parameter <BusContextType | undefined> indicates that the context will either contain an object of type BusContextType or be undefined.// INITIAL VALUE is set to undefined, which helps to check if the context is being used without a provider.

export const BusProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // {children: ReactNode}: This indicates that BusProvider will accept children as a prop, which can be any valid React node (like components, strings, etc.). These children will be rendered inside the provider.
  // useState<string | null>(null): The initial state is set to null, and it can later hold a string (the bus number) or remain null if no bus number is set
  const [busNumber, setBusNumber] = useState<string | null>(null);
  const [busColor, setBusColor] = useState<string | null>(null);
  const [busInitials, setBusInitials] = useState<string | null>(null);
  const [busRoute, setBusRoute] = useState<string | null>(null);
  const [startingStop, setStartingStop] = useState<string | null>(null);
  const [endingStop, setEndingStop] = useState<string | null>(null);
  const [ticketCost, setTicketCost] = useState<number | null>(null);
  const [ticketCount, setTicketCount] = useState<number | null>(null);
  const [discount, setDiscount] = useState<number | null>(null);
  const [discountedCost, setDiscountedCost] = useState<number | null>(null);
  const [time, setTime] = useState<string | null>(null);

  return (
    <BusContext.Provider
      value={{
        busNumber,
        setBusNumber,
        busColor,
        setBusColor,
        busInitials,
        setBusInitials,
        busRoute,
        setBusRoute,
        startingStop,
        setStartingStop,
        endingStop,
        setEndingStop,
        ticketCost,
        setTicketCost,
        ticketCount,
        setTicketCount,
        discount,
        setDiscount,
        discountedCost,
        setDiscountedCost,
        time,
        setTime,
      }}
    >
      {/* value={{ busNumber, setBusNumber }}: The value prop of the provider is set to an object that contains both busNumber and setBusNumber */}
      {children}
      {/* {children}: This renders any child components that are wrapped within BusProvider, allowing them to access the context. */}
    </BusContext.Provider>
  );
};
