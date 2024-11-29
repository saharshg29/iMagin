import { motion } from 'framer-motion'

// Define the page transition variants and transition configuration
const pageVariants = {
  initial: {
    opacity: 0,
    x: "-100vw",
  },
  in: {
    opacity: 1,
    x: 0,
  },
  out: {
    opacity: 0,
    x: "100vw",
  },
}

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5,
}

// Define the type for the props of the PageTransition component
interface PageTransitionProps {
  children: React.ReactNode; // children can be any valid React content
}

export function PageTransition({ children }: PageTransitionProps) {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      {children}
    </motion.div>
  )
}
