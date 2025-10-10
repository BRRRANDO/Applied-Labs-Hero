"use client"
import type React from "react"
import { useState, useEffect } from "react"
const dots = [
  { angle: 0, h: 30, s: 65, l: 70, image: "/images/customer-retention.jpg", valueProposition: "Customer Retention" }, // Vivid peach/tan
  { angle: 30, h: 340, s: 50, l: 72, image: "/images/high-csat.jpg", valueProposition: "a 95%+ CSAT" }, // Vivid dusty rose
  { angle: 60, h: 45, s: 70, l: 65, image: "/images/instant-responses.jpg", valueProposition: "Instant Responses" }, // Vivid golden tan
  { angle: 90, h: 160, s: 45, l: 65, image: "/images/24-7-support.jpg", valueProposition: "24/7 Support" }, // Vivid sage green
  { angle: 120, h: 25, s: 60, l: 68, image: "/images/reduced-costs.jpg", valueProposition: "Reduced Support Costs" }, // Vivid warm beige
  {
    angle: 150,
    h: 200,
    s: 40,
    l: 65,
    image: "/images/personalization.jpg",
    valueProposition: "Personalized Experiences",
  }, // Vivid blue-gray
  { angle: 180, h: 15, s: 70, l: 70, image: "/images/multilingual.jpg", valueProposition: "Multilingual Support" }, // Vivid coral/orange
  { angle: 210, h: 350, s: 45, l: 72, image: "/images/smart-routing.jpg", valueProposition: "Smart Ticket Routing" }, // Vivid soft pink
  { angle: 240, h: 0, s: 0, l: 65, image: "/images/upsell.jpg", valueProposition: "Upsell Opportunities" }, // Gray (unchanged)
  { angle: 270, h: 190, s: 50, l: 63, image: "/images/sentiment-analysis.jpg", valueProposition: "Sentiment Analysis" }, // Vivid light blue
  { angle: 300, h: 65, s: 55, l: 63, image: "/images/order-tracking.jpg", valueProposition: "Order Tracking" }, // Vivid olive/yellow-green
  { angle: 330, h: 20, s: 35, l: 63, image: "/images/proactive-support.jpg", valueProposition: "Proactive Support" }, // Vivid taupe
]
function getLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    const val = c / 255
    return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4)
  })
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs
}
function getContrastRatio(l1: number, l2: number): number {
  const lighter = Math.max(l1, l2)
  const darker = Math.min(l1, l2)
  return (lighter + 0.05) / (darker + 0.05)
}
function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  s = s / 100
  l = l / 100
  const c = (1 - Math.abs(2 * l - 1)) * s
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
  const m = l - c / 2
  let r = 0,
    g = 0,
    b = 0
  if (h >= 0 && h < 60) {
    r = c
    g = x
    b = 0
  } else if (h >= 60 && h < 120) {
    r = x
    g = c
    b = 0
  } else if (h >= 120 && h < 180) {
    r = 0
    g = c
    b = x
  } else if (h >= 180 && h < 240) {
    r = 0
    g = x
    b = c
  } else if (h >= 240 && h < 300) {
    r = x
    g = 0
    b = c
  } else if (h >= 300 && h < 360) {
    r = c
    g = 0
    b = x
  }
  return [Math.round((r + m) * 255), Math.round((g + m) * 255), Math.round((b + m) * 255)]
}
function getAccessibleColor(h: number, s: number, l: number): string {
  const whiteLuminance = 1
  let currentL = l
  while (currentL > 0) {
    const [r, g, b] = hslToRgb(h, s, currentL)
    const colorLuminance = getLuminance(r, g, b)
    const contrast = getContrastRatio(whiteLuminance, colorLuminance)
    if (contrast >= 4.5) return `hsl(${h}, ${s}%, ${currentL}%)`
    currentL -= 1
  }
  return "hsl(0, 0%, 0%)"
}
export function SpinningDots() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [viewportSize, setViewportSize] = useState({ width: 0, height: 0 })
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [displayText, setDisplayText] = useState("Complex Conversations")
  const [imageOpacity, setImageOpacity] = useState(0)
  const [showImage, setShowImage] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState<number | null>(null)
  const [isMainButtonHovered, setIsMainButtonHovered] = useState(false)
  const [isNavButtonHovered, setIsNavButtonHovered] = useState(false)
  const [parallaxOffset, setParallaxOffset] = useState({ x: 0, y: 0 })
  const [isCtaHovered, setIsCtaHovered] = useState(false)

  useEffect(() => {
    const updateViewportSize = () => setViewportSize({ width: window.innerWidth, height: window.innerHeight })
    updateViewportSize()
    window.addEventListener("resize", updateViewportSize)
    return () => window.removeEventListener("resize", updateViewportSize)
  }, [])
  useEffect(() => {
    if (hoveredIndex !== null) {
      setShowImage(true)
      setCurrentImageIndex(hoveredIndex)
      setTimeout(() => setImageOpacity(1), 10)
      setIsTransitioning(true)
      setTimeout(() => {
        setDisplayText(dots[hoveredIndex].valueProposition)
        setIsTransitioning(false)
      }, 150)
    } else {
      setImageOpacity(0)
      setTimeout(() => {
        setShowImage(false)
        setCurrentImageIndex(null)
      }, 500)
      setIsTransitioning(true)
      setTimeout(() => {
        setDisplayText("Complex Conversations")
        setIsTransitioning(false)
      }, 150)
    }
  }, [hoveredIndex])
  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY })

    // Calculate offset from center (inverted for parallax effect)
    const centerX = viewportSize.width / 2
    const centerY = viewportSize.height / 2
    const offsetX = (e.clientX - centerX) / centerX // Normalized -1 to 1
    const offsetY = (e.clientY - centerY) / centerY // Normalized -1 to 1

    // Apply subtle parallax movement (opposite direction, scaled down)
    const parallaxStrength = 15 // pixels of maximum movement
    setParallaxOffset({
      x: -offsetX * parallaxStrength,
      y: -offsetY * parallaxStrength,
    })
  }

  const getGradientBackground = () => {
    if (hoveredIndex === null) return "white"
    const dot = dots[hoveredIndex]
    return `hsl(${dot.h}, ${dot.s}%, ${dot.l}%)`
  }
  const textColor =
    hoveredIndex !== null
      ? getAccessibleColor(dots[hoveredIndex].h, dots[hoveredIndex].s, dots[hoveredIndex].l)
      : "#000000"
  const imageWidth = 200
  const imageHeight = 200
  let imageX = 0,
    imageY = 0
  if (currentImageIndex !== null) {
    const viewportCenterX = viewportSize.width / 2
    const isLeftSideOfViewport = mousePosition.x < viewportCenterX
    const spacing = 20
    if (isLeftSideOfViewport) {
      imageX = mousePosition.x - imageWidth - spacing
      imageY = mousePosition.y - imageHeight - spacing
    } else {
      imageX = mousePosition.x + spacing
      imageY = mousePosition.y - imageHeight - spacing
    }
    if (viewportSize.width > 0) {
      if (imageX + imageWidth > viewportSize.width) imageX = viewportSize.width - imageWidth - 10
      if (imageX < 10) imageX = 10
    }
    if (viewportSize.height > 0) {
      if (imageY < 10) imageY = 10
      if (imageY + imageHeight > viewportSize.height) imageY = viewportSize.height - imageHeight - 10
    }
  }
  return (
    <div
      className="w-screen h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: "white", transition: "background 600ms ease-in-out" }}
      onMouseMove={handleMouseMove}
    >
      {hoveredIndex !== null && (
        <div
          className="absolute inset-0 transition-opacity duration-[600ms] ease-in-out"
          style={{
            background: getGradientBackground(),
            opacity: 0.1,
          }}
        />
      )}
      <nav
        className="fixed top-0 left-0 right-0 z-[200]"
        style={{ marginTop: "24px", marginLeft: "32px", marginRight: "32px" }}
      >
        <div className="flex items-center justify-between text-sm">
          <div
            className="font-decimal text-[15px] font-medium leading-[130%] transition-colors duration-500 ease-out"
            style={{ color: isCtaHovered ? "#3168FF" : textColor }}
          >
            APPLIED LABS
          </div>
          <div
            className="flex items-center transition-opacity duration-500 ease-out"
            style={{ gap: "24px", opacity: hoveredIndex !== null ? 0 : isCtaHovered ? 0.2 : 1 }}
          >
            {["Product", "Industries", "Customers", "Company"].map((item) => (
              <span
                key={item}
                className="font-neue-montreal text-[15px] font-normal leading-[150%] transition-opacity duration-300"
                style={{ color: textColor, opacity: 0.7, transition: "color 500ms ease-out, opacity 300ms ease-out" }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.7")}
              >
                {item}
              </span>
            ))}
          </div>
          <div
            className="font-decimal text-[15px] font-medium leading-[130%] transition-opacity duration-500 ease-out cursor-pointer"
            style={{
              color: isNavButtonHovered ? "#3168FF" : textColor,
              transition: "color 400ms ease-in-out, opacity 500ms ease-out",
              opacity: hoveredIndex !== null ? 0 : isCtaHovered ? 0.2 : 1,
            }}
            onMouseEnter={() => setIsNavButtonHovered(true)}
            onMouseLeave={() => setIsNavButtonHovered(false)}
          >
            GET DEMO
          </div>
        </div>
      </nav>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-[100] pointer-events-none">
        <h1
          className="font-decimal text-[22px] font-medium leading-[130%] tracking-[-0.66px] uppercase transition-colors duration-500 ease-out"
          style={{ color: textColor }}
        >
          PERSONALIZED AI AGENTS
          <br />
          <span
            className="inline-block transition-opacity duration-300 ease-in-out"
            style={{ opacity: isTransitioning ? 0 : 1 }}
          >
            FOR {displayText.toUpperCase()}
          </span>
        </h1>
        <p
          className="font-neue-montreal font-normal text-[15px] leading-[150%] mt-4 leading-relaxed max-w-2xl mx-auto transition-colors duration-500 ease-out"
          style={{ color: textColor }}
        >
          Understand, support, and retain customers across chat, email and voice.
          <br />
          Maintain a 95%+ CSAT. Managed in one easy-to-use platform.
        </p>
        <button
          className="font-decimal text-[15px] font-medium leading-[130%] pointer-events-auto mt-6 transition-all duration-500 ease-out cursor-pointer"
          style={{
            padding: "10px 20px 11px 20px",
            borderRadius: "4px",
            background: isMainButtonHovered ? "#3168FF" : hoveredIndex !== null ? textColor : "#000000",
            color: "#FFFFFF",
            display: "inline-flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
            transition: "background 400ms ease-in-out",
          }}
          onMouseEnter={() => {
            setIsMainButtonHovered(true)
            setIsCtaHovered(true)
          }}
          onMouseLeave={() => {
            setIsMainButtonHovered(false)
            setIsCtaHovered(false)
          }}
        >
          GET DEMO
        </button>
      </div>

      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          transform: `translate(calc(-50% + ${parallaxOffset.x}px), calc(-50% + ${parallaxOffset.y}px))`,
          transition: "transform 0.3s ease-out",
        }}
      >
        {/* Outer ring 2x - 610px radius */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1250px] h-[1250px] animate-spin-normal"
          style={{
            transformOrigin: "50% 50%",
            opacity: 0.05,
          }}
        >
          {dots.map((dot, index) => (
            <div
              key={`outer-2x-${index}`}
              className="absolute w-5 h-5 rounded-full left-1/2 top-1/2"
              style={{
                backgroundColor: `hsl(${dot.h}, ${dot.s}%, ${dot.l}%)`,
                transform: `translate(-50%, -50%) rotate(${dot.angle}deg) translate(610px, 0) rotate(-${dot.angle}deg)`,
                transformOrigin: "center",
              }}
            />
          ))}
        </div>

        {/* Outer ring 1.5x - 457.5px radius */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[950px] h-[950px] animate-spin-normal"
          style={{
            transformOrigin: "50% 50%",
            opacity: 0.2,
          }}
        >
          {dots.map((dot, index) => (
            <div
              key={`outer-1.5x-${index}`}
              className="absolute w-5 h-5 rounded-full left-1/2 top-1/2"
              style={{
                backgroundColor: `hsl(${dot.h}, ${dot.s}%, ${dot.l}%)`,
                transform: `translate(-50%, -50%) rotate(${dot.angle}deg) translate(457.5px, 0) rotate(-${dot.angle}deg)`,
                transformOrigin: "center",
              }}
            />
          ))}
        </div>

        {/* Main interactive ring - 305px radius */}
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] ${hoveredIndex !== null || isCtaHovered ? "animate-spin-stopped" : "animate-spin-normal"}`}
          style={{
            transformOrigin: "50% 50%",
          }}
        >
          {dots.map((dot, index) => (
            <div
              key={index}
              className="absolute w-5 h-5 rounded-full left-1/2 top-1/2 transition-all duration-500 hover:brightness-90 cursor-pointer"
              style={{
                backgroundColor: isCtaHovered ? "#3168FF" : `hsl(${dot.h}, ${dot.s}%, ${dot.l}%)`,
                transform: `translate(-50%, -50%) rotate(${dot.angle}deg) translate(${isCtaHovered ? "280px" : "305px"}, 0) rotate(-${dot.angle}deg) ${hoveredIndex !== null && hoveredIndex !== index ? "scale(0.4)" : "scale(1)"}`,
                transformOrigin: "center",
                opacity: hoveredIndex !== null && hoveredIndex !== index ? 0.2 : 1,
                transition:
                  "opacity 500ms ease-in-out, transform 600ms cubic-bezier(0.34, 1.56, 0.64, 1), background-color 400ms ease-in-out",
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            />
          ))}
        </div>
      </div>

      {showImage && currentImageIndex !== null && (
        <div
          className="fixed pointer-events-none z-20"
          style={{
            left: `${imageX}px`,
            top: `${imageY}px`,
            opacity: imageOpacity,
            transition: "opacity 500ms ease-in-out",
          }}
        >
          <img
            src={dots[currentImageIndex].image || "/placeholder.svg"}
            alt={dots[currentImageIndex].valueProposition}
            className="w-[200px] h-[200px] shadow-2xl object-cover"
            style={{ borderRadius: "20px" }}
          />
        </div>
      )}
      <div
        className="fixed z-[100] transition-opacity duration-500 ease-out"
        style={{ bottom: "40px", left: "32px", opacity: hoveredIndex !== null ? 0 : isCtaHovered ? 0.2 : 1 }}
      >
        <p className="font-neue-montreal font-normal text-sm mb-[28px]" style={{ color: "#000000", opacity: 0.6 }}>
          Trusted by thousands of customers of leading brands
        </p>
        <div className="overflow-hidden" style={{ height: "22px", width: "320px" }}>
          <div className="relative w-full h-full">
            <div className="absolute inset-0 flex items-center animate-logo-scroll-faster" style={{ opacity: 0.8 }}>
              {[...Array(2)].map((_, setIndex) => (
                <div
                  key={setIndex}
                  className="flex items-center shrink-0 font-neue-montreal font-normal"
                  style={{ fontSize: "22px" }}
                >
                  {["Stripe", "Shopify", "Amazon", "Salesforce", "Zendesk", "Intercom", "HubSpot", "Slack"].map(
                    (logo) => (
                      <span key={logo} style={{ marginRight: "40px", color: "#000000" }}>
                        {logo}
                      </span>
                    ),
                  )}
                </div>
              ))}
            </div>
            <div
              className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent pointer-events-none z-10"
              style={{
                opacity: hoveredIndex !== null ? 0 : isCtaHovered ? 0.2 : 1,
                transition: "opacity 300ms ease-out",
              }}
            />
            <div
              className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent pointer-events-none z-10"
              style={{
                opacity: hoveredIndex !== null ? 0 : isCtaHovered ? 0.2 : 1,
                transition: "opacity 300ms ease-out",
              }}
            />
          </div>
        </div>
      </div>
      <div
        className="fixed z-[100] transition-opacity duration-500 ease-out"
        style={{ bottom: "40px", right: "32px", opacity: hoveredIndex !== null ? 0 : isCtaHovered ? 0.2 : 1 }}
      >
        <p
          className="font-neue-montreal font-normal text-sm mb-[28px] text-right"
          style={{ color: "#000000", opacity: 0.6 }}
        >
          Led by alumni of leading tech and academic organizations
        </p>
        <div className="overflow-hidden" style={{ height: "22px", width: "320px" }}>
          <div className="relative w-full h-full">
            <div className="absolute inset-0 flex items-center animate-logo-scroll-faster" style={{ opacity: 0.8 }}>
              {[...Array(2)].map((_, setIndex) => (
                <div
                  key={setIndex}
                  className="flex items-center shrink-0 font-neue-montreal font-normal"
                  style={{ fontSize: "22px" }}
                >
                  {["Google", "Meta", "Stanford", "MIT", "Apple", "Microsoft", "Berkeley", "Amazon"].map((logo) => (
                    <span key={logo} style={{ marginRight: "40px", color: "#000000" }}>
                      {logo}
                    </span>
                  ))}
                </div>
              ))}
            </div>
            <div
              className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent pointer-events-none z-10"
              style={{
                opacity: hoveredIndex !== null ? 0 : isCtaHovered ? 0.2 : 1,
                transition: "opacity 300ms ease-out",
              }}
            />
            <div
              className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent pointer-events-none z-10"
              style={{
                opacity: hoveredIndex !== null ? 0 : isCtaHovered ? 0.2 : 1,
                transition: "opacity 300ms ease-out",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
