"use client"

import * as React from "react"
import { cn } from "../../lib/utils"
import { useState } from "react"

interface ScrollAreaProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * El ancho de las barras de desplazamiento
   * @default 10
   */
  scrollbarSize?: number
  /**
   * Ocultar barras de desplazamiento cuando el contenido no las necesita
   * @default true
   */
  hideScrollbarsWhenNotNeeded?: boolean
  /**
   * El retraso en milisegundos antes de que las barras de desplazamiento se oculten
   * @default 1000
   */
  scrollbarHideDelay?: number
  /**
   * Si se debe mostrar la barra de desplazamiento vertical
   * @default true
   */
  showVerticalScrollbar?: boolean
  /**
   * Si se debe mostrar la barra de desplazamiento horizontal
   * @default true
   */
  showHorizontalScrollbar?: boolean
}

const ScrollArea = React.forwardRef<HTMLDivElement, ScrollAreaProps>(
  ({ 
    className, 
    children, 
    scrollbarSize = 10, 
    hideScrollbarsWhenNotNeeded = true,
    scrollbarHideDelay = 1000,
    showVerticalScrollbar = true,
    showHorizontalScrollbar = true,
    ...props
  }, ref) => {
    const containerRef = React.useRef<HTMLDivElement>(null)
    const contentRef = React.useRef<HTMLDivElement>(null)
    const verticalThumbRef = React.useRef<HTMLDivElement>(null)
    const horizontalThumbRef = React.useRef<HTMLDivElement>(null)
    const verticalTrackRef = React.useRef<HTMLDivElement>(null)
    const horizontalTrackRef = React.useRef<HTMLDivElement>(null)
    
    const [isVerticalScrollbarVisible, setIsVerticalScrollbarVisible] = useState(false)
    const [isHorizontalScrollbarVisible, setIsHorizontalScrollbarVisible] = useState(false)
    const [isDraggingVertical, setIsDraggingVertical] = useState(false)
    const [isDraggingHorizontal, setIsDraggingHorizontal] = useState(false)
    const [isHoveringScrollbar, setIsHoveringScrollbar] = useState(false)
    const [showScrollbars, setShowScrollbars] = useState(false)
    
    const scrollbarStyles = {
      track: {
        position: "absolute",
        borderRadius: scrollbarSize / 2,
        background: "transparent",
        transition: "opacity 0.2s",
      },
      thumb: {
        position: "absolute",
        borderRadius: scrollbarSize / 2,
        background: "rgba(0, 0, 0, 0.2)",
        cursor: "pointer",
        userSelect: "none",
        transition: "background 0.2s",
      },
      vertical: {
        track: {
          top: 0,
          right: 0,
          width: scrollbarSize,
          height: "100%",
        },
        thumb: {
          width: scrollbarSize,
        },
      },
      horizontal: {
        track: {
          bottom: 0,
          left: 0,
          height: scrollbarSize,
          width: "100%",
        },
        thumb: {
          height: scrollbarSize,
        },
      },
    } as const
    
    // Calcular el tamaño y posición de los thumbs
    const updateScrollbars = React.useCallback(() => {
      if (!contentRef.current || !containerRef.current) return
      
      const {
        scrollHeight,
        scrollWidth,
        clientHeight,
        clientWidth,
        scrollTop,
        scrollLeft,
      } = contentRef.current
      
      // Verificar si se necesitan barras de desplazamiento
      const needsVerticalScrollbar = scrollHeight > clientHeight
      const needsHorizontalScrollbar = scrollWidth > clientWidth
      
      // Actualizar visibilidad de barras de desplazamiento
      setIsVerticalScrollbarVisible(needsVerticalScrollbar && showVerticalScrollbar)
      setIsHorizontalScrollbarVisible(needsHorizontalScrollbar && showHorizontalScrollbar)
      
      // Barra vertical
      if (verticalThumbRef.current && verticalTrackRef.current && needsVerticalScrollbar) {
        // Calcular tamaño del thumb
        const trackHeight = verticalTrackRef.current.clientHeight
        const thumbPercent = clientHeight / scrollHeight
        const thumbHeight = Math.max(thumbPercent * trackHeight, 20) // mínimo 20px
        
        // Calcular posición del thumb
        const scrollPercent = scrollTop / (scrollHeight - clientHeight)
        const thumbOffset = scrollPercent * (trackHeight - thumbHeight)
        
        // Aplicar estilos
        verticalThumbRef.current.style.height = `${thumbHeight}px`
        verticalThumbRef.current.style.top = `${thumbOffset}px`
      }
      
      // Barra horizontal
      if (horizontalThumbRef.current && horizontalTrackRef.current && needsHorizontalScrollbar) {
        // Calcular tamaño del thumb
        const trackWidth = horizontalTrackRef.current.clientWidth
        const thumbPercent = clientWidth / scrollWidth
        const thumbWidth = Math.max(thumbPercent * trackWidth, 20) // mínimo 20px
        
        // Calcular posición del thumb
        const scrollPercent = scrollLeft / (scrollWidth - clientWidth)
        const thumbOffset = scrollPercent * (trackWidth - thumbWidth)
        
        // Aplicar estilos
        horizontalThumbRef.current.style.width = `${thumbWidth}px`
        horizontalThumbRef.current.style.left = `${thumbOffset}px`
      }
    }, [scrollbarSize, showVerticalScrollbar, showHorizontalScrollbar])
    
    // Iniciar arrastre de barra vertical
    const handleVerticalThumbMouseDown = (e: React.MouseEvent) => {
      e.preventDefault()
      e.stopPropagation()
      
      const startY = e.clientY
      const startTop = verticalThumbRef.current ? parseInt(verticalThumbRef.current.style.top || "0", 10) : 0
      setIsDraggingVertical(true)
      
      const handleMouseMove = (e: MouseEvent) => {
        if (!verticalThumbRef.current || !verticalTrackRef.current || !contentRef.current) return
        
        const deltaY = e.clientY - startY
        const trackHeight = verticalTrackRef.current.clientHeight
        const thumbHeight = verticalThumbRef.current.clientHeight
        
        // Calcular nueva posición del thumb
        let newTop = startTop + deltaY
        newTop = Math.max(0, Math.min(newTop, trackHeight - thumbHeight))
        
        // Actualizar scroll
        const scrollPercent = newTop / (trackHeight - thumbHeight)
        const scrollTotal = contentRef.current.scrollHeight - contentRef.current.clientHeight
        contentRef.current.scrollTop = scrollPercent * scrollTotal
        
        // Actualizar posición del thumb
        verticalThumbRef.current.style.top = `${newTop}px`
      }
      
      const handleMouseUp = () => {
        setIsDraggingVertical(false)
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleMouseUp)
      }
      
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    }
    
    // Iniciar arrastre de barra horizontal
    const handleHorizontalThumbMouseDown = (e: React.MouseEvent) => {
      e.preventDefault()
      e.stopPropagation()
      
      const startX = e.clientX
      const startLeft = horizontalThumbRef.current ? parseInt(horizontalThumbRef.current.style.left || "0", 10) : 0
      setIsDraggingHorizontal(true)
      
      const handleMouseMove = (e: MouseEvent) => {
        if (!horizontalThumbRef.current || !horizontalTrackRef.current || !contentRef.current) return
        
        const deltaX = e.clientX - startX
        const trackWidth = horizontalTrackRef.current.clientWidth
        const thumbWidth = horizontalThumbRef.current.clientWidth
        
        // Calcular nueva posición del thumb
        let newLeft = startLeft + deltaX
        newLeft = Math.max(0, Math.min(newLeft, trackWidth - thumbWidth))
        
        // Actualizar scroll
        const scrollPercent = newLeft / (trackWidth - thumbWidth)
        const scrollTotal = contentRef.current.scrollWidth - contentRef.current.clientWidth
        contentRef.current.scrollLeft = scrollPercent * scrollTotal
        
        // Actualizar posición del thumb
        horizontalThumbRef.current.style.left = `${newLeft}px`
      }
      
      const handleMouseUp = () => {
        setIsDraggingHorizontal(false)
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleMouseUp)
      }
      
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    }
    
    // Actualizar posición de barras al hacer scroll
    const handleScroll = () => {
      updateScrollbars()
      
      // Mostrar las barras de desplazamiento
      setShowScrollbars(true)
      
      // Y ocultarlas después del retraso si no está en hover
      if (hideScrollbarsWhenNotNeeded && !isHoveringScrollbar) {
        const timerId = setTimeout(() => {
          if (!isDraggingHorizontal && !isDraggingVertical && !isHoveringScrollbar) {
            setShowScrollbars(false)
          }
        }, scrollbarHideDelay)
        
        return () => clearTimeout(timerId)
      }
    }
    
    // Actualizar barras al cargar y al cambiar el tamaño
    React.useEffect(() => {
      updateScrollbars()
      
      const resizeObserver = new ResizeObserver(() => {
        updateScrollbars()
      })
      
      if (contentRef.current) {
        resizeObserver.observe(contentRef.current)
      }
      
      if (containerRef.current) {
        resizeObserver.observe(containerRef.current)
      }
      
      return () => {
        resizeObserver.disconnect()
      }
    }, [updateScrollbars])
    
    // Manejar el mostrar/ocultar de las barras al hacer hover
    const handleMouseEnter = () => {
      setShowScrollbars(true)
    }
    
    const handleMouseLeave = () => {
      if (!isDraggingHorizontal && !isDraggingVertical && !isHoveringScrollbar) {
        setShowScrollbars(false)
      }
    }
    
    // Combinación de refs para el elemento raíz
    const mergedRef = useMergedRef(containerRef, ref)
    
    return (
      <div
        ref={mergedRef}
        className={cn("relative overflow-hidden", className)}
        {...props}
      >
        <div
          ref={contentRef}
          className="h-full w-full scrollbar-hide"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            borderRadius: 'inherit',
            overflowY: showVerticalScrollbar ? 'auto' : 'hidden',
            overflowX: showHorizontalScrollbar ? 'auto' : 'hidden',
          }}
          onScroll={handleScroll}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {children}
        </div>
        
        {/* Barra de desplazamiento vertical */}
        {isVerticalScrollbarVisible && (
          <div
            ref={verticalTrackRef}
            style={{
              ...scrollbarStyles.track as any,
              ...scrollbarStyles.vertical.track as any,
              opacity: showScrollbars ? 1 : 0,
            }}
            onMouseEnter={() => setIsHoveringScrollbar(true)}
            onMouseLeave={() => setIsHoveringScrollbar(false)}
          >
            <div
              ref={verticalThumbRef}
              style={{
                ...scrollbarStyles.thumb as any,
                ...scrollbarStyles.vertical.thumb as any,
                background: isDraggingVertical ? "rgba(0, 0, 0, 0.3)" : "rgba(0, 0, 0, 0.2)",
              }}
              onMouseDown={handleVerticalThumbMouseDown}
            />
          </div>
        )}
        
        {/* Barra de desplazamiento horizontal */}
        {isHorizontalScrollbarVisible && (
          <div
            ref={horizontalTrackRef}
            style={{
              ...scrollbarStyles.track as any,
              ...scrollbarStyles.horizontal.track as any,
              opacity: showScrollbars ? 1 : 0,
            }}
            onMouseEnter={() => setIsHoveringScrollbar(true)}
            onMouseLeave={() => setIsHoveringScrollbar(false)}
          >
            <div
              ref={horizontalThumbRef}
              style={{
                ...scrollbarStyles.thumb as any,
                ...scrollbarStyles.horizontal.thumb as any,
                background: isDraggingHorizontal ? "rgba(0, 0, 0, 0.3)" : "rgba(0, 0, 0, 0.2)",
              }}
              onMouseDown={handleHorizontalThumbMouseDown}
            />
          </div>
        )}
        
        {/* Esquina si ambas barras son visibles */}
        {isVerticalScrollbarVisible && isHorizontalScrollbarVisible && (
          <div
            style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              width: scrollbarSize,
              height: scrollbarSize,
              background: "transparent",
              opacity: showScrollbars ? 1 : 0,
              transition: "opacity 0.2s",
            }}
          />
        )}
      </div>
    )
  }
)
ScrollArea.displayName = "ScrollArea"

// Función auxiliar para combinar refs
function useMergedRef<T>(...refs: React.Ref<T>[]) {
  return React.useCallback((element: T) => {
    refs.forEach(ref => {
      if (!ref) return
      
      if (typeof ref === 'function') {
        ref(element)
      } else {
        (ref as React.MutableRefObject<T>).current = element
      }
    })
  }, [refs])
}

export { ScrollArea }
