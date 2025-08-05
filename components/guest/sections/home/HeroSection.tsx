'use client'
import Image from 'next/image'
import React, { useEffect } from 'react'
import { motion, useAnimation, Variants } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const HeroSection = () => {
    const controls = useAnimation()
    const [ref, inView] = useInView({
        threshold: 0.1,
        triggerOnce: true
    })

    useEffect(() => {
        if (inView) {
            controls.start('visible')
        }
    }, [controls, inView])

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    }

    const itemVariants: Variants = {
        hidden: { y: 30, opacity: 0, filter: 'blur(4px)' },
        visible: {
            y: 0,
            opacity: 1,
            filter: 'blur(0px)',
            transition: {
                type: 'spring',
                stiffness: 120,
                damping: 12,
                mass: 0.5
            }
        }
    }

    const imageVariants: Variants = {
        hidden: { opacity: 0, x: 80, scale: 0.95 },
        visible: {
            opacity: 1,
            x: 0,
            scale: 1,
            transition: {
                type: 'spring',
                stiffness: 70,
                damping: 15,
                mass: 0.8,
                delay: 0.4
            }
        }
    }

    const buttonVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 10,
                delay: 0.6
            }
        },
        hover: { scale: 1.05, transition: { type: 'spring', stiffness: 400, damping: 12 } },
        tap: { scale: 0.98 }
    }

    return (
        <section className=" pt-8 bg-white dark:bg-gray-900 overflow-hidden ">
            <div className="px-6 mx-auto max-w-7xl lg:px-8">
                <motion.div
                    ref={ref}
                    initial="hidden"
                    animate={controls}
                    variants={containerVariants}
                    className="grid items-center lg:grid-cols-12 gap-6 text-center"
                >
                    <div className="lg:col-span-7">
                        <motion.h1
                            variants={itemVariants}
                            className="text-2xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl lg:text-3xl dark:text-white"
                        >
                            Servicyee <span className="text-[#0077B6]">The Ultimate Solution</span> for All Your Home Needs
                        </motion.h1>

                        <motion.p
                            variants={itemVariants}
                            className="mt-4 mb-6  font-light text-gray-900 lg:text-[16px] dark:text-gray-400 max-w-lg mx-auto"
                        >
                            Transform Your Home with Expert Services, Delivered at Unbeatable Prices!
                        </motion.p>

                        <motion.div
                            variants={itemVariants}
                            className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:space-x-4 justify-center"
                        >
                            <motion.button
                                variants={buttonVariants}
                                whileHover="hover"
                                whileTap="tap"
                                className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-center text-white rounded-[4px] bg-[#0077B6] hover:bg-[#005D8F] focus:ring-4 focus:ring-[#0077B6]/50 dark:focus:ring-[#0077B6]/30 transition-all duration-200 shadow-lg"
                            >
                                Get started
                                <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                                </svg>
                            </motion.button>

                            <motion.button
                                variants={buttonVariants}
                                whileHover="hover"
                                whileTap="tap"
                                className="inline-flex items-center justify-center px-8 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-[4px] hover:bg-gray-50 focus:ring-2 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800 transition-all duration-200 shadow-sm hover:shadow-md"
                            >
                                Deels
                            </motion.button>
                        </motion.div>
                    </div>

                    <motion.div
                        variants={imageVariants}
                        className="lg:col-span-5 lg:mt-0 lg:justify-end relative -mt-8" // Adjusted margin
                    >
                        <Image
                            src="/assets/root/root.png"
                            alt="Payment solution dashboard"
                            width={350}  // Increased width
                            height={350} // Increased height
                            className="drop-shadow-xl rounded-lg"
                            priority
                        />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}

export default HeroSection
