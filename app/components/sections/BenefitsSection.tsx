'use client'

import { motion } from 'framer-motion'
import { 
  AiOutlineDollarCircle, 
  AiOutlineLineChart, 
  AiOutlineReload,
  AiOutlineBarChart,
  AiOutlineTeam,
  AiOutlineClockCircle
} from 'react-icons/ai'

const benefits = [
  {
    icon: <AiOutlineDollarCircle size="3em" />,
    title: "Predictable Revenue",
    description: "Lock in monthly recurring income before the month even starts",
    stat: "$30K+ MRR",
    statLabel: "Average shop revenue"
  },
  {
    icon: <AiOutlineLineChart size="3em" />,
    title: "3x Customer Value",
    description: "Subscribers spend $2,400/year compared to $800 for regular customers",
    stat: "3x LTV",
    statLabel: "Lifetime value increase"
  },
  {
    icon: <AiOutlineReload size="3em" />,
    title: "Daily Habits",
    description: "Transform casual visitors into daily customers with unlimited coffee",
    stat: "12x",
    statLabel: "More frequent visits"
  },
  {
    icon: <AiOutlineBarChart size="3em" />,
    title: "Smart Analytics",
    description: "Track customer preferences and optimize inventory with real data",
    stat: "67%",
    statLabel: "Less waste"
  },
  {
    icon: <AiOutlineTeam size="3em" />,
    title: "Customer Loyalty",
    description: "Build a community of loyal subscribers who love your brand",
    stat: "18 months",
    statLabel: "Avg. subscription length"
  },
  {
    icon: <AiOutlineClockCircle size="3em" />,
    title: "Reduce Churn",
    description: "Keep customers coming back with the convenience of subscriptions",
    stat: "85%",
    statLabel: "Retention rate"
  }
]

export function BenefitsSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100
      }
    }
  }

  return (
    <section className="benefits-section">
      <div className="benefits-container">
        <motion.div 
          className="benefits-header"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>Why Coffee Shops Love Our Platform</h2>
          <p>Join 500+ cafes already transforming their business with subscription revenue</p>
        </motion.div>

        <motion.div 
          className="benefits-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {benefits.map((benefit, index) => (
            <motion.div 
              key={index} 
              className="benefit-card"
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05,
                transition: { type: "spring", stiffness: 300 }
              }}
            >
              <div className="benefit-icon">
                {benefit.icon}
              </div>
              <h3>{benefit.title}</h3>
              <p>{benefit.description}</p>
              <div className="benefit-stat">
                <span className="stat-number">{benefit.stat}</span>
                <span className="stat-label">{benefit.statLabel}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}